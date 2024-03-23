<script lang="ts">
	import { onMount, tick } from "svelte";
	import Card from "$components/Card.svelte";
	import type { ICard } from "$lib/util/types";

	export let cards: ICard[];

	let selectedCard = 0;
	let instantSelectedCard = 0;

	let animating = false;

	async function go(dir: number) {
		if (dir > 0) {
			cardScroll({
				deltaY: 100,
				shiftKey: true,
				preventDefault: () => {},
			} as any);
		} else {
			cardScroll({
				deltaY: -100,
				shiftKey: true,
				preventDefault: () => {},
			} as any);
		}
	}

	onMount(() => {
		const key = (e: KeyboardEvent) => {
			// right arrow, run cardScroll with positive
			if (e.key === "ArrowRight") {
				e.preventDefault();
				go(1);
			}
			if (e.key === "ArrowLeft") {
				e.preventDefault();
				go(-1);
			}
		};

		window.addEventListener("keydown", key);

		return () => {
			window.removeEventListener("keydown", key);
		};
	});

	async function cardScroll(e: WheelEvent) {
		if (!e.shiftKey || window.innerWidth < 560) return;
		e.preventDefault();
		const animations: Animation[] = [];
		const duration = 500;
		const easing = "cubic-bezier(.29,1.03,.5,1)";
		if (animating) return;
		animating = true;
		if (e.deltaY > 0) {
			instantSelectedCard = (selectedCard + 1) % cards.length;
		} else {
			instantSelectedCard = (selectedCard - 1 + cards.length) % cards.length;
		}
		const cardLeft = document.querySelector(".card-3d.left") as HTMLElement;
		const cardRight = document.querySelector(".card-3d.right") as HTMLElement;
		const cardCenter = document.querySelector(
			".card-3d:not(.left):not(.right):not(.transition-left):not(.transition-right)",
		) as HTMLElement;
		const cardTransitionLeft = document.querySelector(
			".card-3d.transition-left",
		) as HTMLElement;
		const cardTransitionRight = document.querySelector(
			".card-3d.transition-right",
		) as HTMLElement;
		cardTransitionLeft.style.display = "block";
		cardTransitionRight.style.display = "block";
		setTimeout(async () => {
			selectedCard = instantSelectedCard;
			await tick();
			cardTransitionLeft.style.display = "none";
			cardTransitionRight.style.display = "none";
			animations.forEach((anim) => anim.cancel());
			setTimeout(() => {
				animating = false;
			}, 10);
		}, duration);
		const cardLeftBounds = cardLeft.getBoundingClientRect();
		const cardRightBounds = cardRight.getBoundingClientRect();
		const cardCenterBounds = cardCenter.getBoundingClientRect();
		if (e.deltaY > 0) {
			animations.push(
				cardRight.animate(
					[
						{
							transform: `translateX(${cardCenterBounds.left - cardRightBounds.left + 62}px)`,
						},
					],
					{
						duration,
						fill: "forwards",
						easing,
					},
				),
				cardCenter.animate(
					[
						{
							transform: `translateX(${cardLeftBounds.left - cardCenterBounds.left - 83}px) perspective(1000px) translateZ(-150px) rotateY(-50deg)`,
						},
					],
					{
						duration,
						fill: "forwards",
						easing,
					},
				),
				cardLeft.animate(
					[
						{
							opacity: 0,
							transform:
								"perspective(1000px) translateZ(-150px) rotateY(-80deg) translateX(-400px)",
						},
					],
					{
						duration,
						fill: "forwards",
						easing,
					},
				),
				cardTransitionLeft.animate(
					[
						{
							transform:
								"translateX(1150px) perspective(1000px) translateZ(-400px) rotateY(80deg)",
							opacity: 0,
						},
						{
							transform:
								"translateX(1013px) perspective(1000px) translateZ(-150px) rotateY(50deg)",
							opacity: 1,
						},
					],
					{
						duration,
						fill: "forwards",
						easing,
					},
				),
			);
		} else {
			animations.push(
				cardLeft.animate(
					[
						{
							transform: `translateX(${cardCenterBounds.left - cardLeftBounds.left + 83}px)`,
						},
					],
					{
						duration,
						fill: "forwards",
						easing,
					},
				),
				cardCenter.animate(
					[
						{
							transform: `translateX(${cardRightBounds.left - cardCenterBounds.left - 62}px) perspective(1000px) translateZ(-150px) rotateY(50deg)`,
						},
					],
					{
						duration,
						fill: "forwards",
						easing,
					},
				),
				cardRight.animate(
					[
						{
							opacity: 0,
							transform:
								"perspective(1000px) translateZ(-150px) rotateY(80deg) translateX(400px)",
						},
					],
					{
						duration,
						fill: "forwards",
						easing,
					},
				),
				cardTransitionRight.animate(
					[
						{
							transform:
								"translateX(-1150px) perspective(1000px) translateZ(-400px) rotateY(-80deg)",
							opacity: 0,
						},
						{
							transform:
								"translateX(-1013px) perspective(1000px) translateZ(-150px) rotateY(-50deg)",
							opacity: 1,
						},
					],
					{
						duration,
						fill: "forwards",
						easing,
					},
				),
			);
		}
	}
</script>

<!-- look, i don't hate the disabled, but this
     site's concept is pretty inaccessible as it
	 is (and i just so happen to be partially blind
	 in an eye, so), also we do have keyboard events
	 we just register them through onMount() so fuck
	 you a11y -->

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="cards" on:wheel={cardScroll}>
	<div class="card-3d transition-left">
		<Card {...cards[(instantSelectedCard + 1) % cards.length]} />
	</div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="card-3d left" on:click={() => go(-1)}>
		<Card {...cards[selectedCard - 1 < 0 ? cards.length - 1 : selectedCard - 1]} />
	</div>
	<div class="card-3d">
		<Card {...cards[selectedCard]} />
	</div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="card-3d right" on:click={() => go(1)}>
		<Card {...cards[(selectedCard + 1) % cards.length]} />
	</div>
	<div class="card-3d transition-right">
		<Card {...cards[(instantSelectedCard + 2) % cards.length]} />
	</div>
</div>

<style>
	.cards {
		display: flex;
		max-width: 100%;
	}

	.card-3d {
		z-index: 3;
	}

	.card-3d.left {
		transform: perspective(1000px) translateZ(-150px) rotateY(-50deg);
		z-index: 2;
	}

	.card-3d.right {
		transform: perspective(1000px) translateZ(-150px) rotateY(50deg);
		z-index: 2;
	}

	.card-3d {
		position: relative;
	}

	.card-3d.transition-left,
	.card-3d.transition-right {
		opacity: 0;
		z-index: 1;
		display: none;
	}

	@media (max-width: 560px) {
		.card-3d {
			transform: none !important;
		}

		.cards {
			flex-direction: column;
			gap: 24px;
		}
	}
</style>
