<script>
	import Logo from "$components/Logo.svelte";
	import { onMount } from "svelte";
	import strings from "$lib/data/strings.json";
	import Card from "$components/Card.svelte";

	let logoSizes = {
		small: 256,
		large: 378,
	};

	let logoSize = logoSizes.small;

	onMount(() => {
		function onResize() {
			if (window.innerWidth < 625) {
				logoSize = logoSizes.small;
			} else {
				logoSize = logoSizes.large;
			}
		}

		onResize();
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	});
</script>

<div class="page">
	<div class="container">
		<Logo size={logoSize} />
		<div class="hero-text">
			<h1 class="hero-header">{strings.landingHeader}</h1>
			<p>
				{strings.landingOne}
			</p>
		</div>
	</div>
	<div class="below">
		<Card />
	</div>
</div>

<style>
	.container {
		width: calc(100vw - 17px);
		height: calc(100vh - 160px);
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 96px;
		box-sizing: border-box;
		padding-right: 128px;
	}

	.hero-header {
		font-size: 110px;
		margin-top: -48px;
		margin-bottom: 12px;
	}

	.hero-text {
		max-width: 400px;
	}

	@media (max-width: 625px) {
		.container {
			flex-direction: column;
			gap: 96px;
			padding-right: 0;
			text-align: center;
			padding-left: 16px;
		}
	}

	.below {
		margin-top: 80px;
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		flex-direction: column;
	}
</style>
