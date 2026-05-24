#!/usr/bin/env node
/**
 * fetch-project-board.mjs
 *
 * Fetches the suyu project board from GitHub Projects or a Wayback Machine
 * snapshot of git.suyu.dev, then writes the data to src/content/project-board.json.
 * Run before `pnpm build` so SvelteKit can prerender the homepage.
 *
 * Strategy (in order):
 *   1. GitHub Projects API → org board at https://github.com/orgs/suyu-emu/projects/1
 *   2. Wayback Machine CDX API → find snapshot timestamps for the
 *      git.suyu.dev Gitea REST API endpoint, then fetch the JSON.
 *   3. Wayback Machine CDX API → fall back to the Gitea issues list
 *      so we can reconstruct column data from issue labels/milestones.
 *   4. On-disk fallback: use existing src/content/project-board.json.
 *
 * Usage: node scripts/fetch-project-board.mjs
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, "../src/content");
const OUTPUT_FILE = join(OUTPUT_DIR, "project-board.json");

mkdirSync(OUTPUT_DIR, { recursive: true });

const GITHUB_PROJECT_URL = "https://github.com/orgs/suyu-emu/projects/1";
const GITHUB_API_BASE = "https://api.github.com";
const GITHUB_PROJECT_ID = 1;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";

const GITEA_BASE = "https://git.suyu.dev";
const REPO = "suyu/suyu";
const PROJECT_ID = 11;

// Valid Wayback Machine snapshot timestamp to use when CDX lookup fails.
// This was a known-good snapshot of the project board.
const FALLBACK_WAYBACK_TIMESTAMP = "20240601000000";

async function sleep(ms) {
	return new Promise((r) => setTimeout(r, ms));
}

/**
 * Use the Wayback CDX API to find the most recent captured snapshot
 * URL for a given original URL.  Returns the full Wayback URL string,
 * or null if nothing was found.
 */
async function findWaybackSnapshot(originalUrl, retries = 3) {
	// CDX API returns JSON: [[fields...], [row1...], ...]
	const cdxUrl =
		`https://web.archive.org/cdx/search/cdx` +
		`?url=${encodeURIComponent(originalUrl)}` +
		`&output=json&limit=1&fl=timestamp,statuscode,original` +
		`&filter=statuscode:200&from=20240101&to=20260101` +
		`&collapse=timestamp`;

	for (let attempt = 0; attempt < retries; attempt++) {
		try {
			const res = await fetch(cdxUrl, {
				headers: { "User-Agent": "suyu-website-bot/1.0 (build-time project board fetch)" },
			});
			if (!res.ok) throw new Error(`CDX HTTP ${res.status}`);

			const json = await res.json();
			// json[0] is the header row, json[1] is the first result
			if (!json || json.length < 2) return null;

			const [timestamp, , original] = json[1];
			return `https://web.archive.org/web/${timestamp}/${original}`;
		} catch (err) {
			if (attempt < retries - 1) {
				await sleep(1000 * (attempt + 1));
			} else {
				console.warn(`  ⚠ CDX lookup failed for ${originalUrl}: ${err.message}`);
				return null;
			}
		}
	}
	return null;
}

/**
 * Fetch JSON from a URL (Wayback Machine or direct), with retries.
 */
async function fetchJson(url, retries = 3, headers = {}) {
	for (let attempt = 0; attempt < retries; attempt++) {
		try {
			const res = await fetch(url, {
				headers: {
					"User-Agent": "suyu-website-bot/1.0 (build-time project board fetch)",
					Accept: "application/json",
					...headers,
				},
			});
			if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
			return await res.json();
		} catch (err) {
			if (attempt < retries - 1) {
				await sleep(1000 * (attempt + 1));
			} else {
				throw err;
			}
		}
	}
}

async function fetchGitHubProjectBoard() {
	if (!GITHUB_TOKEN) {
		throw new Error("GITHUB_TOKEN not available");
	}

	console.log(`  Trying GitHub project board API for ${GITHUB_PROJECT_URL}…`);
	const headers = {
		Accept: "application/vnd.github+json, application/vnd.github.inertia-preview+json",
		Authorization: `token ${GITHUB_TOKEN}`,
	};

	const columns = await fetchJson(
		`${GITHUB_API_BASE}/projects/${GITHUB_PROJECT_ID}/columns`,
		3,
		headers,
	);
	if (!Array.isArray(columns) || columns.length === 0) {
		throw new Error("GitHub project board returned no columns");
	}

	const tasks = [];
	let nextTaskId = 1;

	for (const column of columns) {
		const status = column.name?.toLowerCase().includes("done") || column.name?.toLowerCase().includes("complete")
			? "Completed"
			: column.name?.toLowerCase().includes("progress")
			? "In Progress"
			: "Planned";

		const cards = await fetchJson(column.cards_url, 3, headers);
		if (!Array.isArray(cards)) continue;

		for (const card of cards) {
			let title = "";
			let description = "";
			let updated = card.updated_at || card.created_at || new Date().toISOString();
			let labels = [];

			if (card.note) {
				title = card.note.trim().split("\n")[0].slice(0, 120) || `Project card ${card.id}`;
				description = card.note.trim().slice(0, 240);
			}

			if (card.content_url) {
				try {
					const content = await fetchJson(card.content_url, 3, headers);
					title = content.title || title || `Project card ${card.id}`;
					description = (content.body || "").split("\n")[0].slice(0, 120);
					updated = content.updated_at || updated;
					labels = content.labels || [];
				} catch (err) {
					console.warn(`  ⚠ GitHub card content fetch failed: ${err.message}`);
				}
			}

			tasks.push({
				id: nextTaskId++,
				title,
				status,
				progress: status === "Completed" ? 100 : status === "In Progress" ? 50 : 0,
				description,
				category: issueToCategory({ title, labels }),
				updated,
			});
		}
	}

	if (tasks.length === 0) {
		throw new Error("GitHub project board returned no tasks");
	}

	return {
		tasks,
		projectUrl: GITHUB_PROJECT_URL,
		source: "github-projects",
	};
}

/**
 * Map a Gitea issue state + label names to our internal status string.
 */
function issueToStatus(issue) {
	const labels = (issue.labels || []).map((l) => l.name?.toLowerCase() ?? "");
	if (issue.state === "closed") return "Completed";
	if (labels.some((l) => l.includes("in progress") || l.includes("wip"))) return "In Progress";
	if (labels.some((l) => l.includes("blocked") || l.includes("hold"))) return "On Hold";
	if (labels.some((l) => l.includes("cancel"))) return "Cancelled";
	return "Planned";
}

/**
 * Derive a rough category from issue title / labels.
 */
function issueToCategory(issue) {
	const text = [issue.title, ...(issue.labels || []).map((l) => l.name ?? "")]
		.join(" ")
		.toLowerCase();

	if (/audio|sound/.test(text)) return "Audio";
	if (/input|controller|joycon/.test(text)) return "Input";
	if (/android/.test(text)) return "Platform";
	if (/vulkan|opengl|shader|render|gpu|graphic/.test(text)) return "Graphics";
	if (/memory|ram|leak/.test(text)) return "Core";
	if (/perf|speed|fps|optim/.test(text)) return "Performance";
	if (/tool|debug|ci/.test(text)) return "Tools";
	return "Core";
}

/**
 * Strategy 1: fetch the Gitea project JSON API from Wayback Machine.
 * Gitea stores project boards with columns; each column has issues/cards.
 * Endpoint: /api/v1/repos/{owner}/{repo}/projects/{id}
 */
async function fetchViaGiteaProjectApi() {
	const originalUrl = `${GITEA_BASE}/api/v1/repos/${REPO}/projects/${PROJECT_ID}`;
	console.log(`  Trying Gitea project API via Wayback…`);

	// Try to find a snapshot
	let waybackUrl = await findWaybackSnapshot(originalUrl);
	if (!waybackUrl) {
		// Fall back to a known timestamp
		waybackUrl = `https://web.archive.org/web/${FALLBACK_WAYBACK_TIMESTAMP}/${originalUrl}`;
		console.log(`  ↩ CDX found no snapshot, trying fixed timestamp URL`);
	}
	console.log(`  Fetching: ${waybackUrl}`);

	const data = await fetchJson(waybackUrl);
	if (!data || !data.id) throw new Error("Unexpected Gitea project API response shape");

	// Gitea project API returns: { id, title, description, columns: [...] }
	const columns = data.columns || [];
	const tasks = [];
	let taskId = 1;

	for (const col of columns) {
		const colTitle = col.title || "";
		const status = colTitle.toLowerCase().includes("done") || colTitle.toLowerCase().includes("complete")
			? "Completed"
			: colTitle.toLowerCase().includes("progress")
			? "In Progress"
			: "Planned";

		for (const card of col.issues || col.cards || []) {
			tasks.push({
				id: taskId++,
				title: card.title || card.name || `Task #${taskId}`,
				status,
				progress:
					status === "Completed" ? 100 : status === "In Progress" ? 50 : 0,
				description: card.body?.split("\n")[0]?.slice(0, 120) || "",
				category: issueToCategory(card),
				updated: card.updated_at || card.created_at || new Date().toISOString(),
			});
		}
	}

	if (tasks.length === 0) throw new Error("Gitea project API returned no tasks");
	return { tasks, source: "gitea-project-api", waybackUrl };
}

/**
 * Strategy 2: fetch the Gitea issue list from Wayback Machine and
 * approximate the project board from issue state + labels.
 */
async function fetchViaGiteaIssueList() {
	const originalUrl = `${GITEA_BASE}/api/v1/repos/${REPO}/issues?type=issues&state=open&limit=50&page=1`;
	console.log(`  Trying Gitea issue list via Wayback…`);

	let waybackUrl = await findWaybackSnapshot(originalUrl);
	if (!waybackUrl) {
		waybackUrl = `https://web.archive.org/web/${FALLBACK_WAYBACK_TIMESTAMP}/${originalUrl}`;
		console.log(`  ↩ CDX found no snapshot, trying fixed timestamp URL`);
	}
	console.log(`  Fetching: ${waybackUrl}`);

	const issues = await fetchJson(waybackUrl);
	if (!Array.isArray(issues)) throw new Error("Unexpected issues list API response");

	const tasks = issues.slice(0, 20).map((issue, i) => ({
		id: issue.number || i + 1,
		title: issue.title || `Issue #${issue.number}`,
		status: issueToStatus(issue),
		progress: issue.state === "closed" ? 100 : 50,
		description: issue.body?.split("\n")[0]?.slice(0, 120) || "",
		category: issueToCategory(issue),
		updated: issue.updated_at || new Date().toISOString(),
	}));

	if (tasks.length === 0) throw new Error("No issues found");
	return { tasks, source: "gitea-issue-list", waybackUrl };
}

/**
 * Strategy 3: fetch project board HTML page from Wayback and extract
 * card titles by parsing the rendered HTML.
 */
async function fetchViaHtmlPage() {
	const originalUrl = `${GITEA_BASE}/${REPO}/projects/${PROJECT_ID}`;
	console.log(`  Trying project board HTML page via Wayback…`);

	let waybackUrl = await findWaybackSnapshot(originalUrl);
	if (!waybackUrl) {
		waybackUrl = `https://web.archive.org/web/${FALLBACK_WAYBACK_TIMESTAMP}/${originalUrl}`;
		console.log(`  ↩ CDX found no snapshot, trying fixed timestamp URL`);
	}
	console.log(`  Fetching: ${waybackUrl}`);

	const res = await fetch(waybackUrl, {
		headers: { "User-Agent": "suyu-website-bot/1.0" },
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}`);

	const html = await res.text();

	// Gitea renders project cards with class "issue-card" or similar.
	// Extract card titles from <div class="issue-title"> elements.
	const tasks = [];
	let taskId = 1;
	const colRegex = /<div[^>]+class="[^"]*board-column[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi;
	const titleRegex = /<[^>]+class="[^"]*issue-title[^"]*"[^>]*>\s*<a[^>]*>([^<]+)<\/a>/gi;
	const colTitleRegex = /<[^>]+class="[^"]*board-column-header[^"]*"[^>]*>[^<]*<[^>]*>([^<]+)<\/[^>]*>/i;

	let colMatch;
	while ((colMatch = colRegex.exec(html)) !== null) {
		const colHtml = colMatch[1];
		const colTitleMatch = colTitleRegex.exec(colHtml);
		const colTitle = colTitleMatch ? colTitleMatch[1].trim() : "";

		const status =
			colTitle.toLowerCase().includes("done") || colTitle.toLowerCase().includes("complete")
				? "Completed"
				: colTitle.toLowerCase().includes("progress")
				? "In Progress"
				: "Planned";

		let cardMatch;
		while ((cardMatch = titleRegex.exec(colHtml)) !== null) {
			const title = cardMatch[1].trim();
			if (title) {
				tasks.push({
					id: taskId++,
					title,
					status,
					progress: status === "Completed" ? 100 : status === "In Progress" ? 50 : 0,
					description: "",
					category: issueToCategory({ title }),
					updated: new Date().toISOString(),
				});
			}
		}
	}

	if (tasks.length === 0) throw new Error("No tasks found in HTML");
	return { tasks, source: "html-page", waybackUrl };
}

async function main() {
	console.log("Fetching project board from GitHub and archive…");

	let result = null;

	// Strategy 0: GitHub organization project board
	try {
		result = await fetchGitHubProjectBoard();
		console.log(`  ✓ Got ${result.tasks.length} tasks from GitHub project board (${GITHUB_PROJECT_URL})`);
	} catch (err) {
		console.log(`  ↩ GitHub project board fetch failed (${err.message}), falling back to archive…`);
	}

	// Strategy 1: Gitea project JSON API
	try {
		result = await fetchViaGiteaProjectApi();
		console.log(`  ✓ Got ${result.tasks.length} tasks via Gitea project API (${result.waybackUrl})`);
	} catch (err) {
		console.log(`  ↩ Gitea project API failed (${err.message}), trying issue list…`);
	}

	// Strategy 2: Gitea issue list
	if (!result) {
		try {
			result = await fetchViaGiteaIssueList();
			console.log(`  ✓ Got ${result.tasks.length} tasks via issue list (${result.waybackUrl})`);
		} catch (err) {
			console.log(`  ↩ Issue list failed (${err.message}), trying HTML page…`);
		}
	}

	// Strategy 3: HTML page scrape
	if (!result) {
		try {
			result = await fetchViaHtmlPage();
			console.log(`  ✓ Got ${result.tasks.length} tasks via HTML page (${result.waybackUrl})`);
		} catch (err) {
			console.log(`  ↩ HTML page failed (${err.message}), checking for existing file…`);
		}
	}

	// Strategy 4: on-disk fallback
	if (!result) {
		if (existsSync(OUTPUT_FILE)) {
			console.log(`  ↩ Using existing on-disk project-board.json`);
			return; // nothing to write
		}
		console.error("  ✗ All strategies failed and no existing file found.");
		process.exit(1);
	}

	const output = {
		tasks: result.tasks,
		lastUpdated: new Date().toISOString(),
		source: result.source,
		waybackUrl: result.waybackUrl || null,
	};

	writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2) + "\n", "utf8");
	console.log(`✓ Saved project-board.json (${result.tasks.length} tasks, source: ${result.source})`);
}

main().catch((err) => {
	console.error("Unexpected error:", err);
	process.exit(1);
});
