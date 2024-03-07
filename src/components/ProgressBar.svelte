<script lang="ts">
	export let progress = 1;
	export let total = 1;
</script>

<div class="progress-bar">
	<div class="overflow-handler">
		<div
			class="progress"
			style="width: {((progress === 0 ? 1 : progress) / (total === 0 ? 1 : total)) * 100}%"
		></div>
	</div>
	<div class="glow-container">
		<div
			class="glow"
			style="width: {((progress === 0 ? 1 : progress) / (total === 0 ? 1 : total)) * 100}%"
		></div>
	</div>
</div>

<style>
	.progress-bar {
		position: relative;
		width: 100%;
		height: 8px;
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 4px;
	}

	.overflow-handler {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		border-radius: 4px;
	}

	.progress {
		height: 100%;
		/* background-color: rgb(77, 156, 199); */
		transition: 0.5s ease-in-out width;
		clip-path: inset(0);
	}

	.progress::before {
		width: 100%;
		content: "";
		position: absolute;
		inset: 0;
		background: linear-gradient(to right, #ff3a3a, rgb(210, 103, 201), #3a99ff);
	}

	.glow-container {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		filter: blur(18px);
	}

	.glow {
		height: 100%;
		transition: 0.5s ease-in-out width;
		clip-path: inset(-36px -24px);
	}

	.glow::before {
		width: 100%;
		content: "";
		position: absolute;
		inset: 0;
		background: linear-gradient(to right, #ff3a3a, rgb(210, 103, 201), #3a99ff);
	}
</style>
