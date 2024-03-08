<script lang="ts">
	import More from "./icons/More.svelte";
	import smo from "$assets/mockups/smo.png";
</script>

<div class="card-container">
	<div class="card-content">
		<div class="card-image">
			<img src={smo} alt="smo" />
		</div>
		<div class="card-body">
			<div class="title">Super Mario Odyssey</div>
			<div class="card-stats">1.1 KB • 382 hours</div>
		</div>
	</div>
	<button class="card-more">
		<More size={16} />
		<span>More</span>
	</button>
</div>

<style>
	.title {
		font-size: 14px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-weight: 500;
	}

	.card-body {
		width: 100%;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 13px;
		gap: 2px;
	}

	.card-stats {
		opacity: 0.5;
		font-size: 11px;
	}

	.card-image {
		width: 100%;
		height: 108px;
		overflow: hidden;
		flex-shrink: 0;
		overflow: hidden;
		border-radius: 4px;
		border: var(--fluent-stroke);
	}

	.card-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: blur(0.5px);
	}

	.card-content {
		flex-grow: 1;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.card-container {
		width: 128px;
		height: 204px;
		border-radius: 10px;
		border: var(--fluent-stroke);
		position: relative;
		padding: 8px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.card-more {
		width: 100%;
		height: 26px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 4px;
	}
</style>
