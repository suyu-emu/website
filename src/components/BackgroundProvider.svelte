<script lang="ts">
	import { onMount } from "svelte";
	import OutlinedLogo from "./OutlinedLogo.svelte";

	export let size = 80;
	export let gap = 12;
	export let speed = 4;
	const offsetCount = 2;
	$: offsetX = (size + gap) * offsetCount;
	$: speedSecs = (1 / speed) * 4;

	let countX = 0;
	let countY = 0;

	function onResize() {
		countX = Math.ceil(window.innerWidth / (gap + size));
		countY = Math.ceil(window.innerHeight / (gap + size));
		console.log(countX, countY);
	}

	onMount(() => {
		onResize();
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	});

	function getColor(x: number, y: number) {
		const red = "#FF3A3A";
		const blue = "#3A99FF";
		const evenX = x % 2 === 0;
		const evenY = y % 2 === 0;
		return evenX === evenY ? red : blue;
	}
</script>

<div class="gradient" />

<div class="background-container">
	<div
		class="background"
		style="--size: {size}px; --gap: {gap}px; --offsetX: {offsetX}px; --speed: {speedSecs || 0}s"
	>
		<div class="scroll" style="--gap: {gap}px">
			{#each Array(countX + offsetCount) as _, x}
				<div class="group">
					{#each Array(countY + offsetCount) as _, y}
						<OutlinedLogo {size} color={getColor(x, y)} />
					{/each}
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	@keyframes scroll {
		from {
			transform: rotateZ(-4deg)
				translate3d(calc(0px - var(--offsetX)), calc(0px - var(--offsetX)), 0);
		}
		to {
			transform: rotateZ(-4deg)
				translate3d(
					calc(((var(--size) + var(--gap)) * 2) - var(--offsetX)),
					calc(0px - var(--offsetX)),
					0
				);
		}
	}

	.background-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}

	.background {
		width: calc(100% + var(--offsetX));
		height: 100%;
		opacity: 0.5;
		animation: scroll infinite linear;
		animation-duration: var(--speed);
	}

	.gradient {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: linear-gradient(
			180deg,
			transparent,
			color-mix(in srgb, var(--page-bg), transparent 20%) 25%,
			var(--page-bg)
		);
		background-size: 100% 100%;
		z-index: 5;
	}

	.scroll {
		display: flex;
		gap: var(--gap);
	}

	.group {
		display: flex;
		flex-direction: column;
		gap: var(--gap);
		width: fit-content;
	}
</style>
