<script lang="ts">
	import { base } from "$app/paths";
	import type { PageData } from "./$types";

	export let data: PageData;

	const post = data.post;

	function formatDate(iso: string): string {
		return new Date(iso).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	}

	/**
	 * Converts Reddit-flavoured markdown into safe HTML.
	 * Handles the most common Reddit patterns: headings, bold/italic,
	 * inline code, code fences, links, blockquotes, unordered/ordered lists,
	 * horizontal rules, and paragraphs.
	 */
	function renderMarkdown(raw: string): string {
		if (!raw) return "";

		// Escape HTML entities first so we don't double-escape later.
		let text = raw
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;");

		// Fenced code blocks (``` ... ```)
		text = text.replace(/```[\w]*\n?([\s\S]*?)```/g, (_m, code) => {
			return `<pre class="rounded-lg bg-[#1a1a1a] p-4 overflow-x-auto text-sm text-[#e2e8f0] my-4"><code>${code.trim()}</code></pre>`;
		});

		// Inline code
		text = text.replace(/`([^`\n]+)`/g, '<code class="rounded bg-[#1a1a1a] px-1 py-0.5 text-sm text-[#60c7e9]">$1</code>');

		// Headings
		text = text.replace(/^#### (.+)$/gm, '<h4 class="text-lg font-bold text-white mt-6 mb-2">$1</h4>');
		text = text.replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-white mt-8 mb-3">$1</h3>');
		text = text.replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-white mt-10 mb-3">$1</h2>');
		text = text.replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-white mt-10 mb-4">$1</h1>');

		// Bold and italic (order matters: bold before italic)
		text = text.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
		text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
		text = text.replace(/__(.+?)__/g, '<strong>$1</strong>');
		text = text.replace(/\*([^*\n]+)\*/g, '<em>$1</em>');
		text = text.replace(/_([^_\n]+)_/g, '<em>$1</em>');

		// Strikethrough
		text = text.replace(/~~(.+?)~~/g, '<del>$1</del>');

		// Superscript (Reddit uses ^word or ^(phrase))
		text = text.replace(/\^\(([^)]+)\)/g, '<sup>$1</sup>');
		text = text.replace(/\^(\S+)/g, '<sup>$1</sup>');

		// Links: [text](url)
		text = text.replace(
			/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
			'<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#60c7e9] underline hover:text-[#f94d4d] transition">$1</a>',
		);

		// Bare URLs (not already inside an <a>)
		text = text.replace(
			/(?<![">])(https?:\/\/[^\s<"]+)/g,
			'<a href="$1" target="_blank" rel="noopener noreferrer" class="text-[#60c7e9] underline hover:text-[#f94d4d] transition">$1</a>',
		);

		// Horizontal rules
		text = text.replace(/^(-{3,}|\*{3,}|_{3,})$/gm, '<hr class="border-[#ffffff22] my-6">');

		// Process block-level elements line by line.
		const lines = text.split("\n");
		const output: string[] = [];
		let inBlockquote = false;
		let inUl = false;
		let inOl = false;
		let paraLines: string[] = [];

		function flushPara() {
			if (paraLines.length > 0) {
				const joined = paraLines.join("<br>");
				output.push(`<p class="leading-relaxed text-[#c9c8ca] my-3">${joined}</p>`);
				paraLines = [];
			}
		}

		function flushList() {
			if (inUl) {
				output.push("</ul>");
				inUl = false;
			}
			if (inOl) {
				output.push("</ol>");
				inOl = false;
			}
		}

		function flushBlockquote() {
			if (inBlockquote) {
				output.push("</blockquote>");
				inBlockquote = false;
			}
		}

		for (const line of lines) {
			// Blank line — flush current paragraph/list/blockquote
			if (line.trim() === "") {
				flushPara();
				flushList();
				flushBlockquote();
				continue;
			}

			// Already a block-level HTML tag (headings, hr, pre)
			if (/^<(h[1-6]|hr|pre|ul|ol|li|blockquote)/.test(line)) {
				flushPara();
				flushList();
				flushBlockquote();
				output.push(line);
				continue;
			}

			// Blockquote
			const bqMatch = line.match(/^&gt;\s?(.*)/);
			if (bqMatch) {
				flushPara();
				flushList();
				if (!inBlockquote) {
					output.push('<blockquote class="border-l-4 border-[#ffffff33] pl-4 my-3 text-[#A6A5A7] italic">');
					inBlockquote = true;
				}
				output.push(`<p class="my-1">${bqMatch[1]}</p>`);
				continue;
			}

			// Unordered list
			const ulMatch = line.match(/^[*\-+]\s+(.*)/);
			if (ulMatch) {
				flushPara();
				flushBlockquote();
				if (!inUl) {
					output.push('<ul class="list-disc list-inside my-3 space-y-1 text-[#c9c8ca]">');
					inUl = true;
				}
				output.push(`<li>${ulMatch[1]}</li>`);
				continue;
			}

			// Ordered list
			const olMatch = line.match(/^\d+\.\s+(.*)/);
			if (olMatch) {
				flushPara();
				flushBlockquote();
				if (!inOl) {
					output.push('<ol class="list-decimal list-inside my-3 space-y-1 text-[#c9c8ca]">');
					inOl = true;
				}
				output.push(`<li>${olMatch[1]}</li>`);
				continue;
			}

			// Normal text line — accumulate into paragraph
			flushList();
			flushBlockquote();
			paraLines.push(line);
		}

		// Flush anything remaining
		flushPara();
		flushList();
		flushBlockquote();

		return output.join("\n");
	}

	const renderedContent = renderMarkdown(post.content);
</script>

<svelte:head>
	<title>{post.title} - suyu Blog</title>
	<meta name="description" content="suyu project update: {post.title}" />
</svelte:head>

<!-- Breadcrumb -->
<div class="mb-6 flex items-center gap-2 text-sm text-[#A6A5A7]">
	<a href="{base}/blog" class="transition hover:text-white">Blog</a>
	<span>/</span>
	<span class="text-white">{post.title}</span>
</div>

<!-- Post container -->
<article
	class="relative flex w-full flex-col gap-6 overflow-hidden rounded-[2.25rem] bg-[#110d10] p-8 md:p-12"
>
	<!-- Decorative spinning logo (matches other pages) -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="512"
		height="525"
		viewBox="0 0 512 525"
		fill="none"
		style="animation-duration: 300s; transform-origin: 50% 50%; animation-iteration-count: infinite; animation-timing-function: linear; animation-name: spin; animation-delay: 0s; animation-direction: normal; animation-fill-mode: none; animation-play-state: running;"
		class="pointer-events-none absolute -bottom-[18rem] right-0 z-0 animate-spin opacity-20"
	>
		<path
			d="M511.5 262.12C511.5 353.613 465.547 434.182 396.019 480.947C408.179 457.937 415.083 431.597 415.083 403.617C415.083 313.723 343.816 240.744 255.992 240.744C191.257 240.744 138.692 186.941 138.692 120.622C138.692 54.3027 191.257 0.5 255.992 0.5C397.026 0.5 511.5 117.695 511.5 262.12ZM255.992 53.5225C243.745 53.5225 233.816 63.7047 233.816 76.2224C233.816 88.7388 243.745 98.9223 255.992 98.9223C268.257 98.9223 278.173 88.7387 278.173 76.2224C278.173 63.7048 268.257 53.5225 255.992 53.5225ZM299.355 97.9223C287.104 97.9223 277.173 108.104 277.173 120.622C277.173 133.139 287.104 143.322 299.355 143.322C311.62 143.322 321.536 133.139 321.536 120.622C321.536 108.104 311.62 97.9223 299.355 97.9223ZM212.635 97.9223C200.382 97.9223 190.455 108.104 190.455 120.622C190.455 133.139 200.382 143.322 212.635 143.322C224.889 143.322 234.816 133.139 234.816 120.622C234.816 108.104 224.888 97.9223 212.635 97.9223ZM255.992 142.322C243.745 142.322 233.816 152.505 233.816 165.021C233.816 177.539 243.745 187.722 255.992 187.722C268.257 187.722 278.173 177.539 278.173 165.021C278.173 152.505 268.257 142.322 255.992 142.322Z"
			stroke="white"
		/>
		<path
			d="M0.5 262.119C0.5 170.626 46.444 90.0553 115.976 43.2909C103.82 66.3019 96.9172 92.6424 96.9172 120.622C96.9172 210.516 168.174 283.495 255.992 283.495C320.735 283.495 373.305 337.298 373.305 403.617C373.305 469.934 320.735 523.739 255.992 523.739C114.974 523.739 0.5 406.544 0.5 262.119ZM255.992 336.517C243.744 336.517 233.816 346.7 233.816 359.217C233.816 371.735 243.745 381.917 255.992 381.917C268.256 381.917 278.173 371.735 278.173 359.217C278.173 346.701 268.256 336.517 255.992 336.517ZM299.355 380.917C287.104 380.917 277.173 391.099 277.173 403.617C277.173 416.135 287.104 426.317 299.355 426.317C311.619 426.317 321.536 416.135 321.536 403.617C321.536 391.099 311.619 380.917 299.355 380.917ZM255.992 425.317C243.745 425.317 233.816 435.499 233.816 448.016C233.816 460.533 243.744 470.717 255.992 470.717C268.256 470.717 278.173 460.533 278.173 448.016C278.173 435.499 268.256 425.317 255.992 425.317ZM212.634 380.917C200.382 380.917 190.454 391.099 190.454 403.617C190.454 416.135 200.382 426.317 212.634 426.317C224.888 426.317 234.815 416.135 234.815 403.617C234.815 391.099 224.888 380.917 212.634 380.917Z"
			stroke="white"
		/>
	</svg>

	<!-- Post meta -->
	<div class="relative z-10 flex flex-wrap items-center gap-3">
		<span
			class="inline-block rounded-full bg-[#ff450020] px-3 py-1 text-xs font-semibold text-[#f94d4d]"
		>
			r/{post.subreddit}
		</span>
		{#if post.score}
			<span class="text-xs text-[#A6A5A7]">{post.score} points</span>
		{/if}
	</div>

	<!-- Title -->
	<h1 class="relative z-10 text-[24px] leading-[1.3] md:text-[48px] md:leading-[1.1]">
		{post.title}
	</h1>

	<!-- Author / date -->
	<div class="relative z-10 flex flex-wrap items-center gap-4 text-sm text-[#A6A5A7]">
		{#if post.author}
			<span>
				Posted by
				<a
					href="https://www.reddit.com/user/{post.author}"
					target="_blank"
					rel="noopener noreferrer"
					class="text-white transition hover:text-[#60c7e9]"
				>
					u/{post.author}
				</a>
			</span>
			<span>·</span>
		{/if}
		<time datetime={post.date}>{formatDate(post.date)}</time>
	</div>

	<!-- Body -->
	<div class="relative z-10 mt-2">
		{#if renderedContent}
			<!-- Images (if any) -->
			{#if post.images && post.images.length > 0}
				<div class="mb-6 grid gap-4 {post.images.length === 1 ? '' : 'grid-cols-1 md:grid-cols-2'}">
					{#each post.images as imageUrl}
						<img 
							src={imageUrl}
							alt="Post image"
							class="w-full rounded-lg border border-[#ffffff11]"
							loading="lazy"
						/>
					{/each}
				</div>
			{/if}

			<div class="blog-content text-base text-[#c9c8ca]">
				{@html renderedContent}
			</div>
		{:else}
			<p class="text-[#A6A5A7]">
				This post has no text content. Visit the original post on Reddit for more information.
			</p>
		{/if}
	</div>

	<!-- Link back to original Reddit post -->
	<div class="relative z-10 mt-6 border-t border-[#ffffff11] pt-6">
		<a
			href={post.url}
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex items-center gap-2 rounded-full border border-[#ffffff22] px-5 py-2.5 text-sm font-medium text-[#A6A5A7] transition hover:border-[#60c7e9] hover:text-[#60c7e9]"
		>
			<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
				<path
					d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"
				/>
			</svg>
			View original on Reddit
		</a>
	</div>
</article>

<!-- Navigation between posts -->
<div class="mt-6 flex justify-start">
	<a
		href="{base}/blog"
		class="inline-flex items-center gap-2 text-sm text-[#A6A5A7] transition hover:text-white"
	>
		<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
		</svg>
		Back to Blog
	</a>
</div>
