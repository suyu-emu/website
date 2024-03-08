<script lang="ts">
	import ProgressBar from "$components/ProgressBar.svelte";
	import { onMount } from "svelte";
	import type { PageData } from "./$types";
	import Logo from "$components/Logo.svelte";
	import { page } from "$app/stores";

	let shadersDone = 0;
	const shadersTotal = 8146;

	export let data: PageData;
	$: game =
		data.props.games.find(
			(g) => g.title.trim().toLowerCase() === $page.params.game.trim().toLowerCase(),
		) || data.props.games[0];
	onMount(() => {
		const interval = setInterval(() => {
			shadersDone += Math.floor(Math.random() * 150);
			if (shadersDone >= shadersTotal) {
				clearInterval(interval);
				shadersDone = shadersTotal;
			}
		}, 100);
	});
</script>

<div class="body">
	<div class="align-bottom">
		<img
			alt="Box art for {game.title}"
			src={`https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/f_auto/q_auto/${game.productImage}`}
		/>
		<div class="main-text">
			<p class="launching">Launching <span class="bold">{game.title}</span></p>
			<p>Shaders compiled: {shadersDone} / {shadersTotal}</p>
			<div class="progress-bar">
				<ProgressBar progress={shadersDone} total={shadersTotal} />
			</div>
		</div>
		<div class="logo-spinner-container">
			<div class="logo">
				<Logo size={128} />
			</div>
		</div>
	</div>
</div>

<style>
	@keyframes spin {
		/* 0% {
			transform: none;
			animation-timing-function: cubic-bezier(1, 0, 1, 1);
		}
		25% {
			animation-timing-function: ease-out;
			transform: scale(0.75) rotateZ(30deg);
		}
		30% {
			transform: scale(0.75) rotateZ(10deg);
			animation-timing-function: cubic-bezier(0.77, 0, 0.75, 0.37);
		}
		40% {
			transform: scale(1.1) rotateZ(375deg);
			animation-timing-function: cubic-bezier(0, 0.92, 0.21, 0.97);
		}
		42% {
			transform: scale(1) rotateZ(780deg);
		}
		70%,
		100% {
			transform: scale(1) rotateZ(720deg);
		} */
		0% {
			transform: none;
		}

		100% {
			transform: rotateZ(360deg);
		}
	}

	.logo-spinner-container {
		margin-left: 120px;
	}

	.logo {
		animation: spin 2s reverse infinite cubic-bezier(0.8, 0, 0.2, 1);
		transform-origin: 50.1% 47.45%;
	}

	.body {
		display: flex;
		width: 100vw;
		height: 100vh;
		padding: 150px;
	}

	.progress-bar {
		width: 100%;
		margin-top: 16px;
	}

	.align-bottom {
		display: flex;
		justify-content: center;
		align-items: flex-end;
		height: 100%;
		width: 100%;
	}
	.align-bottom img {
		aspect-ratio: 1/1;
		width: 300px;
		object-fit: cover;
		object-position: center center;
		border: solid thin rgb(145, 173, 192);
		border-radius: 24px;
		box-shadow: 0 0 32px 0px rgba(145, 173, 192, 0.463);
	}

	.main-text {
		width: calc(100% - 615px);
		margin-left: 64px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		flex-grow: 1;
	}

	.launching,
	.launching > * {
		font-size: 32px;
		white-space: nowrap;
		overflow: hidden;
	}

	.launching {
		--mask-image: linear-gradient(
			90deg,
			black,
			black calc(100% - 150px),
			transparent calc(100% - 25px)
		);
		-webkit-mask-image: var(--mask-image);
		mask-image: var(--mask-image);
	}

	.bold {
		font-weight: bold;
		width: 100%;
	}
</style>
