#!/usr/bin/env node
/**
 * fetch-reddit-posts.mjs
 *
 * Fetches Reddit posts via the public JSON API and writes them as JSON files
 * into src/content/blog/{slug}.json.  Run before `pnpm build` so SvelteKit
 * can prerender the blog routes at build time.
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

async function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchPost(post, retries = 3) {
	const url = `https://www.reddit.com/r/${post.subreddit}/comments/${post.id}.json`;
	console.log(`Fetching ${url} …`);

	let lastError;
	for (let attempt = 0; attempt < retries; attempt++) {
		try {
			const res = await fetch(url, {
				headers: {
					"User-Agent":
						"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
					Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,application/json,*/*;q=0.8",
					"Accept-Language": "en-US,en;q=0.9",
					"Accept-Encoding": "gzip, deflate, br",
					"Cache-Control": "no-cache",
					Pragma: "no-cache",
					"Sec-Fetch-Dest": "document",
					"Sec-Fetch-Mode": "navigate",
					"Sec-Fetch-Site": "none",
					"Upgrade-Insecure-Requests": "1",
				},
			});

			if (!res.ok) {
				throw new Error(`HTTP ${res.status} for ${url}`);
			}

			return await processResponse(res, post);
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

async function processResponse(res, post) {
	const json = await res.json();
	const data = json[0]?.data?.children?.[0]?.data;

	if (!data) {
		throw new Error(`Unexpected response shape for ${post.id}`);
	}

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
