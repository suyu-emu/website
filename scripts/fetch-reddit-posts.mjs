#!/usr/bin/env node
/**
 * fetch-reddit-posts.mjs
 *
 * Fetches Reddit posts and writes them as JSON files into
 * src/content/blog/{slug}.json.  Run before `pnpm build` so SvelteKit
 * can prerender the blog routes at build time.
 *
 * Strategy:
 *   Fetch raw HTML directly from Reddit (www.reddit.com first, then old.reddit.com)
 *   and parse it to extract post data —
 *      no API key or Reddit credentials required.
 *
 * Usage:  node scripts/fetch-reddit-posts.mjs
 */

import { writeFileSync, mkdirSync, readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, "../src/content/blog");

mkdirSync(OUTPUT_DIR, { recursive: true });

/** All Reddit posts to mirror, in chronological order. */
const POSTS = [
	{
		slug: "no-you-didnt-get-banned-from-the-discord-server",
		subreddit: "suyu",
		id: "1c0vlvj",
	},
	{
		slug: "the-death-of-suyu",
		subreddit: "suyu",
		id: "1c1hs3l",
	},
	{
		slug: "bus-has-moved-suyus-server-from-discord-to-matrix",
		subreddit: "suyu",
		id: "1c1sfen",
	},
	{
		slug: "founder-speaking-future",
		subreddit: "suyu",
		id: "1c1tnh5",
	},
	{
		slug: "some-suyu-newsupdates",
		subreddit: "suyu",
		id: "1crp3h3",
	},
	{
		slug: "some-more-suyu-news",
		subreddit: "suyu",
		id: "1drxnw7",
	},
	{
		slug: "about-uzuy-new-switch-emulator",
		subreddit: "suyu",
		id: "1dz4czr",
	},
	{
		slug: "official-suyu-website-and-download",
		subreddit: "suyu",
		id: "1dyaokm",
	},
	{
		slug: "fix-echoes-of-wisdom-not-running-correctly",
		subreddit: "suyu",
		id: "1frtdjy",
	},
	{
		slug: "suyuzudachi-my-account-and-our-group-dm-is-down",
		subreddit: "suyu",
		id: "1eilofq",
	},
	{
		slug: "an-update",
		subreddit: "suyu",
		id: "1eixziy",
	},
	{
		slug: "suyu-has-officially-stated-their-project-is-eol",
		subreddit: "suyu",
		id: "1j7e9u6",
	},
	{
		slug: "re-suyu-exposed",
		subreddit: "EmulationOnAndroid",
		id: "1jy39lo",
	},
	{
		slug: "fixed-the-old-website",
		subreddit: "suyu",
		id: "1k6xa9x",
	},
	{
		slug: "project-work-continuing-on-github",
		subreddit: "suyu",
		id: "1kblsih",
	},
	{
		slug: "suyu-is-now-on-issuehunt-bountysource-esque",
		subreddit: "suyu",
		id: "1kqd3gq",
	},
	{
		slug: "public-suyu-dev-recruitment-post",
		subreddit: "EmuDev",
		id: "1m4vcnc",
	},
	{
		slug: "suyu-update-final",
		subreddit: "EmuDev",
		id: "1svi23y",
	},
];

// ── Enhanced browser-like headers to avoid HTTP 403 ──────────────────────────
const BROWSER_HEADERS = {
	"User-Agent":
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
	Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
	"Cache-Control": "no-cache",
	"Accept-Encoding": "gzip, deflate, br",
	"Sec-Ch-Ua": '"Chromium";v="131", "Not_A Brand";v="24"',
	"Sec-Ch-Ua-Mobile": "?0",
	"Sec-Ch-Ua-Platform": '"Windows"',
	"Sec-Fetch-Dest": "document",
	"Sec-Fetch-Mode": "navigate",
	"Sec-Fetch-Site": "none",
	Pragma: "no-cache",
};

async function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── HTML helpers (no external deps) ─────────────────────────────────────────

/** Decode the most common HTML entities. */
function decodeHtmlEntities(str) {
	return str
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&#x27;/g, "'")
		.replace(/&#x2F;/g, "/")
		.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

/**
 * Extract image URLs from Reddit post data (JSON API format).
 * Handles preview images, galleries, and direct image URLs.
 */
function extractImages(postData) {
	const images = [];

	// 1. Preview image (most common)
	if (postData?.preview?.images?.[0]?.source?.url) {
		images.push(decodeHtmlEntities(postData.preview.images[0].source.url));
	}

	// 2. Gallery images
	if (postData?.gallery_data?.items && postData?.media_metadata) {
		for (const item of postData.gallery_data.items) {
			const mediaId = item.media_id;
			const media = postData.media_metadata[mediaId];
			if (media?.s?.u) {
				images.push(decodeHtmlEntities(media.s.u));
			}
		}
	}

	// 3. Direct image URL (i.redd.it, imgur, etc.)
	if (postData?.url && /\.(jpg|jpeg|png|gif|webp)$/i.test(postData.url)) {
		if (!images.includes(postData.url)) {
			images.push(postData.url);
		}
	}

	return images;
}

/** Strip all HTML tags and collapse whitespace to plain text. */
function stripHtml(html) {
	return html
		.replace(/<[^>]+>/g, " ")
		.replace(/\s+/g, " ")
		.trim();
}

/**
 * Extract the inner HTML of the first <div class="md"> element,
 * handling nested <div>s correctly without a real HTML parser.
 */
function extractMdContent(html) {
	const marker = 'class="md"';
	const pos = html.indexOf(marker);
	if (pos === -1) return "";

	// Find the start of the opening tag that carries this class.
	const divStart = html.lastIndexOf("<", pos);
	// Skip to the end of the opening tag.
	const openEnd = html.indexOf(">", divStart) + 1;

	// Walk forward, counting <div…> opens and </div> closes.
	let depth = 1;
	let i = openEnd;
	while (i < html.length && depth > 0) {
		const nextOpen = html.indexOf("<div", i);
		const nextClose = html.indexOf("</div>", i);

		if (nextClose === -1) break;

		if (nextOpen !== -1 && nextOpen < nextClose) {
			depth++;
			i = nextOpen + 4;
		} else {
			depth--;
			if (depth === 0) {
				return stripHtml(html.slice(openEnd, nextClose));
			}
			i = nextClose + 6;
		}
	}

	return "";
}

async function scrapePostHtml(post, retries = 3) {
	const url = `https://old.reddit.com/r/${post.subreddit}/comments/${post.id}/`;
	console.log(`  ↩ Scraping ${url} …`);

	let lastError;
	for (let attempt = 0; attempt < retries; attempt++) {
		try {
			const res = await fetch(url, { headers: BROWSER_HEADERS });
			if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);

			const html = await res.text();

			// The main post is a <div class="thing …"> with useful data-* attributes.
			// Match the first such element (the post itself, not a comment).
			const thingMatch = html.match(/class="[^"]*\bthing\b[^"]*"([^>]*)>/);
			const attrs = thingMatch ? thingMatch[1] : "";

			const author = (attrs.match(/\bdata-author="([^"]+)"/) || [])[1] || "";
			const scoreRaw = (attrs.match(/\bdata-score="(\d+)"/) || [])[1];
			const score = scoreRaw ? parseInt(scoreRaw, 10) : 0;
			const permalink =
				(attrs.match(/\bdata-permalink="([^"]+)"/) || [])[1] ||
				`/r/${post.subreddit}/comments/${post.id}/`;
			const tsRaw = (attrs.match(/\bdata-timestamp="(\d+)"/) || [])[1];

			// Title: first <a class="title …">…</a>
			const titleMatch = html.match(/<a[^>]+class="[^"]*\btitle\b[^"]*"[^>]*>([^<]+)<\/a>/);
			if (!titleMatch) {
				throw new Error(`Could not extract title from HTML for ${post.id} — page structure may have changed`);
			}
			const title = decodeHtmlEntities(titleMatch[1].trim());

			if (!tsRaw) {
				throw new Error(`Could not extract timestamp from HTML for ${post.id} — page structure may have changed`);
			}
			const date = new Date(parseInt(tsRaw, 10)).toISOString();

			// Selftext: content of the first <div class="md"> block
			const content = extractMdContent(html);

			// Add signature
			const finalContent = content ? content + "\n\n- suyu team" : "- suyu team";

			return {
				slug: post.slug,
				id: post.id,
				title,
				date,
				subreddit: post.subreddit,
				author,
				url: `https://www.reddit.com${permalink}`,
				score,
				content: finalContent,
				images: [], // HTML scraping doesn't easily extract images; fallback to empty
			};
		} catch (err) {
			lastError = err;
			if (attempt < retries - 1) {
				const backoff = Math.pow(2, attempt) * 1000;
				console.log(`  ⚠ Scrape attempt ${attempt + 1} failed, retrying in ${backoff}ms...`);
				await sleep(backoff);
			}
		}
	}

	throw lastError;
}

/**
 * Try scraping from www.reddit.com directly (without .json).
 * This approach fetches the raw HTML page and extracts data.
 */
async function scrapeNewRedditHtml(post, retries = 3) {
	const url = `https://www.reddit.com/r/${post.subreddit}/comments/${post.id}/`;
	console.log(`Fetching ${url} (raw HTML) …`);

	let lastError;
	for (let attempt = 0; attempt < retries; attempt++) {
		try {
			const res = await fetch(url, { 
				headers: {
					...BROWSER_HEADERS,
					"Upgrade-Insecure-Requests": "1",
					"Dnt": "1",
				}
			});
			if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);

			const html = await res.text();

			// Try to extract JSON from Reddit's <script> tags that contain post data
			// Modern Reddit embeds JSON data in <script id="data">...</script> tags
			const scriptMatch = html.match(/<script[^>]*id="data"[^>]*>([^<]+)<\/script>/);
			if (scriptMatch) {
				try {
					const jsonData = JSON.parse(scriptMatch[1]);
					// Navigate through Reddit's data structure
					const postData = jsonData?.posts?.models?.[post.id];
						const images = extractImages(postData);
						const content = postData.selftext || "";
						const finalContent = content ? content + "\n\n- suyu team" : "- suyu team";

					if (postData) {
						return {
							slug: post.slug,
							id: post.id,
							title: decodeHtmlEntities(postData.title || ""),
							date: new Date(postData.created).toISOString(),
							subreddit: postData.subreddit?.name || post.subreddit,
							author: postData.author || "",
							url: `https://www.reddit.com/r/${post.subreddit}/comments/${post.id}/`,
							content: finalContent,
							images,
						};
					}
				} catch (parseErr) {
					// If JSON parsing fails, continue to next attempt or fallback
					console.log(`  ⚠ Failed to parse embedded JSON data`);
				}
			}

			// If we couldn't extract from script tags, throw error to try next approach
			throw new Error(`Could not extract post data from www.reddit.com HTML for ${post.id}`);
			
		} catch (err) {
			lastError = err;
			if (attempt < retries - 1) {
				const backoff = Math.pow(2, attempt) * 1000;
				console.log(`  ⚠ Attempt ${attempt + 1} failed, retrying in ${backoff}ms...`);
				await sleep(backoff);
			}
		}
	}

	throw lastError;
}

// ── Reddit JSON API ────────────────────────────────────────────────────────────

/**
 * Try Reddit's public JSON API endpoint first.
 * e.g. https://www.reddit.com/r/suyu/comments/1c1tnh5.json
 * This is simpler than HTML scraping and often bypasses bot-detection.
 */
async function fetchPostJson(post, retries = 3) {
	const url = `https://www.reddit.com/r/${post.subreddit}/comments/${post.id}.json?raw_json=1`;
	console.log(`Fetching ${url} …`);

	let lastError;
	for (let attempt = 0; attempt < retries; attempt++) {
		try {
			const res = await fetch(url, {
				headers: {
					// Reddit requires a descriptive User-Agent for API access.
					"User-Agent": "suyu-website-bot/1.0 (https://suyu.dev; build-time blog mirror)",
					Accept: "application/json",
				},
			});
			if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);

			const json = await res.json();
			// Reddit returns a two-element array: [post-listing, comments-listing]
			const postData = json?.[0]?.data?.children?.[0]?.data;
			if (!postData) throw new Error(`Unexpected JSON structure for ${post.id}`);

			const images = extractImages(postData);
			const content = postData.selftext || "";
			const finalContent = content ? content + "\n\n- suyu team" : "- suyu team";

			return {
				slug: post.slug,
				id: post.id,
				title: decodeHtmlEntities(postData.title || ""),
				date: new Date((postData.created_utc || postData.created) * 1000).toISOString(),
				subreddit: postData.subreddit || post.subreddit,
				author: postData.author || "",
				url: `https://www.reddit.com${postData.permalink || `/r/${post.subreddit}/comments/${post.id}/`}`,
				score: postData.score || 0,
				content: finalContent,
				images,
			};
		} catch (err) {
			lastError = err;
			if (attempt < retries - 1) {
				const backoff = Math.pow(2, attempt) * 1000;
				console.log(`  ⚠ JSON API attempt ${attempt + 1} failed, retrying in ${backoff}ms...`);
				await sleep(backoff);
			}
		}
	}

	throw lastError;
}

// ── Arctic Shift archive API ───────────────────────────────────────────────────

/**
 * Fetch post from Arctic Shift (https://arctic-shift.photon-reddit.com),
 * a community-maintained Reddit archive with a public API.
 * This endpoint is not blocked by GitHub Actions and provides accurate
 * post data including selftext (body content) and real creation timestamps.
 */
async function fetchFromArcticShift(post, retries = 3) {
	const url = `https://arctic-shift.photon-reddit.com/api/posts/ids?ids=${post.id}`;
	console.log(`  ↩ Fetching from Arctic Shift: ${url} …`);

	let lastError;
	for (let attempt = 0; attempt < retries; attempt++) {
		try {
			const res = await fetch(url, {
				headers: {
					"User-Agent": "suyu-website-bot/1.0 (https://suyu.dev; build-time blog mirror)",
					Accept: "application/json",
				},
			});
			if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);

			const json = await res.json();
			// Arctic Shift returns { data: [ postObject, ... ] }
			// Multiple snapshots may exist for the same post (original + re-crawls after edits).
			// Sort by retrieval time descending so we always use the most recent snapshot.
			const data = json?.data;
			if (!data || data.length === 0)
				throw new Error(`No data returned by Arctic Shift for post ${post.id}`);

			if (data.length > 1) {
				console.log(
					`  ℹ Arctic Shift returned ${data.length} snapshots for ${post.id}; picking the latest`,
				);
				data.forEach((snap, i) => {
					const crawledAt = snap.retrieved_on || snap.retrieved_utc;
					console.log(
						`    snapshot ${i + 1}: retrieved_on=${crawledAt} selftext_len=${(snap.selftext || "").length}`,
					);
				});
			}

			// Pick the snapshot with the highest retrieval timestamp (most recently crawled).
			// data[0] is used as the initial value so reduce never operates on an empty array.
			const postData = data.reduce((latest, snap) => {
				const latestTime = latest.retrieved_on || latest.retrieved_utc || 0;
				const snapTime = snap.retrieved_on || snap.retrieved_utc || 0;
				return snapTime > latestTime ? snap : latest;
			}, data[0]);

			const images = extractImages(postData);
			const content = postData.selftext || "";
			const finalContent = content ? content + "\n\n- suyu team" : "- suyu team";

			// Reddit / Arctic Shift stores `edited` as either `false` or a Unix timestamp in
			// seconds (same unit as `created_utc`), so multiply by 1000 for Date.
			if (postData.edited && postData.edited !== false) {
				console.log(
					`  ℹ Post ${post.id} was edited; using latest snapshot (edited at ${new Date(Number(postData.edited) * 1000).toISOString()})`,
				);
			}

			return {
				slug: post.slug,
				id: post.id,
				title: decodeHtmlEntities(postData.title || ""),
				date: new Date((postData.created_utc || 0) * 1000).toISOString(),
				subreddit: postData.subreddit || post.subreddit,
				author: postData.author || "",
				url: `https://www.reddit.com${postData.permalink || `/r/${post.subreddit}/comments/${post.id}/`}`,
				content: finalContent,
				images,
			};
		} catch (err) {
			lastError = err;
			if (attempt < retries - 1) {
				const backoff = Math.pow(2, attempt) * 1000;
				console.log(`  ⚠ Arctic Shift attempt ${attempt + 1} failed, retrying in ${backoff}ms...`);
				await sleep(backoff);
			}
		}
	}

	throw lastError;
}

// ── Public entry point ─────────────────────────────────────────────────────────

/**
 * Fetch post data. Strategy (in order):
 *   1. Reddit JSON API  (simplest, often works without browser headers)
 *   2. www.reddit.com HTML scrape
 *   3. old.reddit.com HTML scrape
 *   4. Arctic Shift archive API (community Reddit archive; not blocked by CI)
 *   5. Existing on-disk JSON (static fallback so a single outage never
 *      breaks the build when the files were previously committed to the repo)
 */
async function fetchPost(post) {
	// 1. Reddit JSON API
	try {
		return await fetchPostJson(post);
	} catch (err) {
		console.log(`  ↩ JSON API failed (${err.message}), trying www.reddit.com HTML …`);
	}

	// 2. www.reddit.com HTML scrape
	try {
		return await scrapeNewRedditHtml(post);
	} catch (err) {
		console.log(`  ↩ www.reddit.com failed (${err.message}), trying old.reddit.com …`);
	}

	// 3. old.reddit.com HTML scrape
	try {
		return await scrapePostHtml(post);
	} catch (err) {
		console.log(`  ↩ old.reddit.com failed (${err.message}), trying Arctic Shift archive …`);
	}

	// 4. Arctic Shift archive
	try {
		return await fetchFromArcticShift(post);
	} catch (err) {
		console.log(`  ↩ Arctic Shift failed (${err.message}), checking for existing file …`);
	}

	// 5. Static fallback: use existing on-disk JSON if present
	const existingPath = join(OUTPUT_DIR, `${post.slug}.json`);
	if (existsSync(existingPath)) {
		console.log(`  ↩ Using existing on-disk data for ${post.slug}`);
		const existing = JSON.parse(readFileSync(existingPath, "utf8"));
		return existing;
	}

	throw new Error(`All fetch strategies failed for ${post.slug} and no existing file found`);
}

async function main() {
	let ok = 0;
	let failed = 0;

	for (const post of POSTS) {
		try {
			const data = await fetchPost(post);
			const outPath = join(OUTPUT_DIR, `${post.slug}.json`);
			writeFileSync(outPath, JSON.stringify(data, null, 2) + "\n", "utf8");
			console.log(`  ✓ Saved ${post.slug}.json  (${data.date.slice(0, 10)})`);
			ok++;
		} catch (err) {
			console.error(`  ✗ Failed ${post.slug}: ${err.message}`);
			failed++;
		}

		// Be polite – add delay between requests to avoid rate limiting (2 seconds)
		await sleep(2000);
	}

	console.log(`\nDone. ${ok} succeeded, ${failed} failed.`);

	if (ok === 0) {
		// If every single fetch failed the build cannot have any blog posts.
		process.exit(1);
	}
}

main().catch((err) => {
	console.error("Unexpected error:", err);
	process.exit(1);
});
