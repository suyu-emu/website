<script lang="ts">
	import type { PageData } from "./$types";
	import SvelteMarkdown from "svelte-markdown";

	export let data: PageData;
</script>

<p class="author">{data.props.author} presents...</p>
<div class="md">
	<SvelteMarkdown source={data.props.contents} />
</div>

<style>
	.author {
		font-size: 1.1rem;
		color: rgba(255, 255, 255, 0.5);
		margin-bottom: -2rem;
	}

	.md {
		margin-top: 8px;
	}

	.md :global(pre > code) {
		background: black;
		display: block;
		padding: 24px 32px;
		border-radius: 2.25rem;
	}

	.md :global(h1),
	.md :global(h2),
	.md :global(h3),
	.md :global(h4),
	.md :global(h5),
	.md :global(h6) {
		margin-bottom: 1rem;
		margin-top: 2rem;
		color: white;
	}

	.md :global(h1) {
		font-size: 3rem;
		line-height: 1.41;
	}

	.md :global(h2) {
		font-size: 2.5rem;
		line-height: 1.5;
	}

	.md :global(h3) {
		font-size: 2rem;
		line-height: 1.5;
	}

	.md :global(h4) {
		font-size: 1.5rem;
		line-height: 1.5;
	}

	.md :global(h5) {
		font-size: 1.25rem;
		line-height: 1.5;
	}

	.md :global(h6) {
		font-size: 1rem;
		line-height: 1.5;
	}

	.md :global(li) {
		margin-bottom: 0.5rem;
		margin-top: 1rem;
		list-style: circle;
		margin-left: 2rem;
		padding-left: 1rem;
	}

	.md :global(*) {
		font-size: 1.25rem;
		color: rgba(255, 255, 255, 0.7);
	}
</style>
