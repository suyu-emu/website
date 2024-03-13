<script lang="ts">
	import { page } from "$app/stores";
	import { onDestroy, onMount } from "svelte";
	import type { PageData } from "./$types";
	import { transition } from "$lib/util/animation";
	import SvelteMarkdown from "svelte-markdown";

	let cardsContainer: HTMLDivElement;

	export function transitionIn() {
		// const cardWidth = 285;
		// const cardGap = 24;
		const bounds = cardsContainer.getBoundingClientRect();
		const cards = cardsContainer.querySelectorAll("div");
		// how many cards fit on a row
		// const cardsPerRow = Math.floor(bounds.width / (cardWidth + cardGap));
		cards.forEach((card, i) => {
			// const x = Math.floor(i / cardsPerRow);
			const x = i;
			card.style.zIndex = ((i + 1) * 5).toString();
			card.animate(
				[
					{
						transform: "translateY(-200px)",
						opacity: "0",
						filter: "blur(20px)",
					},
					{
						transform: "translateY(0px)",
						opacity: "1",
						filter: "blur(0px)",
					},
				],
				{
					duration: 700,
					easing: transition,
					delay: x * 40,
					fill: "forwards",
				},
			);
		});
	}

	onMount(() => {
		transitionIn();
	});

	function doTransition(e: MouseEvent) {
		const card = (e.target as HTMLDivElement).closest(".card");
		if (!card) return;
		// get bounds of card
		const bounds = card.getBoundingClientRect();
		// how much does the card need to scale to become 100vw, 100vh
		const scaleX = window.innerWidth / bounds.width;
		const scaleY = window.innerHeight / bounds.height;
		// how much does the card need to move to become centered
		const translateX = window.innerWidth / 2 - bounds.x - bounds.width / 2;
		const translateY = window.innerHeight / 2 - bounds.y - bounds.height / 2;
		// animate the card to become fullscreen
		card.animate(
			[
				{
					transform: "translate(0px, 0px) scale(1)",
					opacity: "1",
				},
				{
					transform: `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`,
					opacity: "0",
					backgroundColor: "transparent",
				},
			],
			{
				duration: 850,
				easing: "cubic-bezier(0.19, 1, 0.22, 1)",
				fill: "forwards",
			},
		);
	}

	export let data: PageData;
</script>

<h1 class="mb-8 text-[40px] leading-[1.41] md:text-[60px] md:leading-[1.1]">Blog Posts</h1>
<div class="grid max-w-full grid-cols-1 gap-8 lg:grid-cols-2" bind:this={cardsContainer}>
	{#each data.posts as post}
		<a href={`/blog/${post.slug}`}>
			<div
				class="card relative h-[250px] w-full translate-y-[-200px] overflow-hidden rounded-[2.25rem] border-2 border-solid border-zinc-700 bg-black p-8 opacity-0 blur-[20px] lg:h-[400px]"
			>
				<div
					style="--mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0,0,0,0) 100%); mask-image: var(--mask-image); -webkit-mask-image: var(--mask-image);"
					class="h-full"
				>
					<h1 class="mb-4 text-[24px] leading-[1.41] md:text-[36px] md:leading-[1.1]">
						{post.title}
					</h1>
					<p class="excerpt">
						<SvelteMarkdown source={post.contents} />
					</p>
				</div>
			</div>
		</a>
	{/each}
</div>

<style>
	.excerpt :global(*) {
		font-family: "DM Sans", sans-serif;
		font-size: 1rem;
	}

	.excerpt :global(h1),
	.excerpt :global(h2),
	.excerpt :global(h3),
	.excerpt :global(h4),
	.excerpt :global(h5),
	.excerpt :global(h6) {
		font-family: "DM Sans", sans-serif;
		font-weight: 500;
	}
</style>
