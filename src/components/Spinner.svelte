<div class="spinner">
	{#each Array(9) as _, i}
		<div class="bounce" />
	{/each}
</div>

<style>
	@keyframes flash {
		0% {
			opacity: 1;
			box-shadow: 0 0 10px 0px white;
		}
		30% {
			opacity: 0.4;
			box-shadow: 0 0 4px 0px white;
		}
		100% {
			opacity: 0;
		}
	}

	.spinner {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 6px;
		justify-content: center;
		align-items: center;
		width: fit-content;
		height: fit-content;
	}

	.bounce {
		aspect-ratio: 1/1;
		width: 8px;
		background-color: white;
		opacity: 0.5;
	}

	.bounce:not(:nth-child(5)) {
		animation: linear 0.8s infinite flash;
	}

	.bounce:nth-child(1) {
		animation-delay: 0.1s;
	}

	.bounce:nth-child(2) {
		animation-delay: 0.2s;
	}

	.bounce:nth-child(3) {
		animation-delay: 0.3s;
	}

	.bounce:nth-child(6) {
		animation-delay: 0.4s;
	}

	.bounce:nth-child(9) {
		animation-delay: 0.5s;
	}

	.bounce:nth-child(8) {
		animation-delay: 0.6s;
	}

	.bounce:nth-child(7) {
		animation-delay: 0.7s;
	}

	.bounce:nth-child(4) {
		animation-delay: 0.8s;
	}
</style>
