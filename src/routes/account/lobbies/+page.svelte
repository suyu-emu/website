<script lang="ts">
	import Room from "$components/Room.svelte";
	import { reducedMotion } from "$lib/accessibility";
	import { transition } from "$lib/util/animation";
	import { onMount } from "svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	$: console.log(data);

	function transitionIn() {
		const rooms = document.querySelectorAll<HTMLDivElement>(".room");
		rooms.forEach((room, i) => {
			const x = parseInt(room.dataset.index!);
			room.getAnimations().forEach((animation) => animation.cancel());
			room.style.zIndex = ((i + 1) * 5).toString();
			room.animate(
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
				$reducedMotion
					? {
							duration: 0,
							fill: "forwards",
						}
					: {
							duration: 700,
							easing: transition,
							delay: x * 80,
							fill: "forwards",
						},
			).onfinish = () => {
				room.style.opacity = "1";
			};
		});
	}

	onMount(() => {
		transitionIn();
	});
</script>

<div class="relative h-[calc(100vh-200px)]">
	<div class="room-grid relative flex w-full gap-4 pb-6">
		{#each data.rooms as room, i}
			<div class="room opacity-0" data-index={i}>
				<Room {room} />
			</div>
		{/each}
	</div>
</div>

<style>
	.room-grid {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		grid-auto-rows: auto;
		align-items: stretch;
	}

	@media (min-width: 750px) {
		.room-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
