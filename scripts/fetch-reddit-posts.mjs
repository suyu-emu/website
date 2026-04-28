#!/usr/bin/env node
/**
 * fetch-reddit-posts.mjs
 *
 * Fetches Reddit posts and writes them as JSON files into
 * src/content/blog/{slug}.json.  Run before `pnpm build` so SvelteKit
 * can prerender the blog routes at build time.
 *
 * Strategy:
 *   1. Try the public Reddit JSON API (www.reddit.com/.json).
 *   2. If the API returns a 4xx error (e.g. HTTP 403 in CI), fall back to
 *      scraping the post page on old.reddit.com and parsing the HTML —
 *      no API key or Reddit credentials required.
 *
 * Usage:  node scripts/fetch-reddit-posts.mjs
 */

import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, "../src/content/blog");

mkdirSync(OUTPUT_DIR, { recursive: true });

/** All Reddit posts to mirror, in chronological order. */
const POSTS = [
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

// ── Shared browser-like headers used for every request ──────────────────────
const BROWSER_HEADERS = {
	"User-Agent":
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
	Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
	"Accept-Language": "en-US,en;q=0.9",
	"Cache-Control": "no-cache",
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

// ── Strategy 1 – Reddit JSON API ─────────────────────────────────────────────

async function fetchPostJson(post, retries = 3) {
	const url = `https://www.reddit.com/r/${post.subreddit}/comments/${post.id}.json`;
	console.log(`Fetching ${url} …`);

	let lastError;
	for (let attempt = 0; attempt < retries; attempt++) {
		try {
			const res = await fetch(url, { headers: BROWSER_HEADERS });

			if (!res.ok) {
				const err = new Error(`HTTP ${res.status} for ${url}`);
				// 4xx errors mean the API is blocking us – don't bother retrying.
				if (res.status >= 400 && res.status < 500) throw err;
				lastError = err;
				if (attempt < retries - 1) {
					const backoff = Math.pow(2, attempt) * 1000;
					console.log(`  ⚠ Attempt ${attempt + 1} failed (${res.status}), retrying in ${backoff}ms...`);
					await sleep(backoff);
				}
				continue;
			}

			const json = await res.json();
			const data = json[0]?.data?.children?.[0]?.data;
			if (!data) throw new Error(`Unexpected JSON shape for ${post.id}`);

			return {
				slug: post.slug,
				id: data.id,
				title: data.title,
				date: new Date(data.created_utc * 1000).toISOString(),
				subreddit: data.subreddit,
				author: data.author,
				url: `https://www.reddit.com${data.permalink}`,
				score: data.score,
				content: data.selftext || "",
			};
		} catch (err) {
			// Re-throw 4xx immediately – no point retrying a blocked request.
			if (/HTTP 4\d\d/.test(err.message)) throw err;
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

// ── Strategy 2 – old.reddit.com HTML scraper ─────────────────────────────────

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

			return {
				slug: post.slug,
				id: post.id,
				title,
				date,
				subreddit: post.subreddit,
				author,
				url: `https://www.reddit.com${permalink}`,
				score,
				content,
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

// ── Public entry point ────────────────────────────────────────────────────────

/**
 * Try the JSON API first; if it is blocked (4xx) fall back to HTML scraping.
 */
async function fetchPost(post) {
	try {
		return await fetchPostJson(post);
	} catch (err) {
		if (/HTTP 4\d\d/.test(err.message)) {
			console.log(`  ↩ JSON API blocked (${err.message.match(/HTTP \d+/)?.[0]}), trying HTML scraper …`);
			return await scrapePostHtml(post);
		}
		throw err;
	}
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

		// Be polite to the Reddit API – 1 second between requests.
		await sleep(1000);
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
