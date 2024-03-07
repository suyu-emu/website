<script lang="ts">
	import BackgroundProvider from "$components/BackgroundProvider.svelte";
	import "$lib/css/index.css";
</script>

<div class="header" />
<BackgroundProvider size={80} gap={12} speed={1} />
<div class="below">
	<div class="page-contents">
		<slot />
	</div>
	<div class="bullshit-flex-container">
		<div class="bullshit-flex-placeholder" />
		<div class="bg-below-gradient" />
	</div>
</div>

<style>
	.below {
		z-index: 5;
		position: relative;
		display: flex;
		flex-direction: column;
	}
	.header {
		position: sticky;
		/* on overscroll, stick to the top */
		overscroll-behavior: contain;
		top: 0;
		left: 0;
		width: 100%;
		height: 80px;
		background-color: color-mix(in srgb, var(--color-primary), transparent 50%);
		border-bottom: var(--border-primary);
		z-index: 1000;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}

	.bullshit-flex-container {
		display: flex;
		height: 100%;
		width: 100%;
		position: absolute;
		flex-direction: column;
		z-index: -1;
	}

	.bullshit-flex-placeholder {
		/* 100vh height */
		height: calc(100vh - 162px);
		width: 100%;
	}

	.bg-below-gradient {
		width: 100%;
		flex-grow: 1;
		flex-shrink: 0;
		background-color: var(--page-bg);
		background-size: 100% 100%;
		z-index: -1;
	}
</style>
