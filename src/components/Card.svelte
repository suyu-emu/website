<script lang="ts">
	export let compatibility: "goated" | "based" | "cringe";
	export let image: string;
	export let title: string;
	export let releaseYear: number;

	function capitalizeFirstLetter(string: typeof compatibility) {
		if (string === "goated") {
			return "Good";
		} else if (string === "based") {
			return "Okay";
		} else if (string === "cringe") {
			return "Bad";
		}
	}
</script>

<div class="card">
	<div class="card-image">
		<img src={image || ""} alt="Mario Odyssey" />
	</div>
	<div class="info">
		<h3 class="header">{title}</h3>
		<div class="content">Released: {releaseYear}</div>
		<div>
			Compatibility: <span class={compatibility}>{capitalizeFirstLetter(compatibility)}</span>
		</div>
	</div>
</div>

<style>
	.card {
		aspect-ratio: 1.5/2;
		width: fit-content;
		height: 450px;
		background-color: rgb(47, 57, 76);
		border-radius: 8px;
		padding: 12px;
		display: flex;
		flex-direction: column;
		gap: 12px;
		box-shadow: 0 0 24px rgb(32, 33, 45);
		border: solid thin rgb(101, 109, 132);
	}

	.card-image {
		border-radius: 4px;
		overflow: hidden;
		width: 100%;
		height: 100%;
		border: solid thin rgb(101, 109, 132);
	}

	.card-image > img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}

	.header {
		font-size: 28px;
	}

	.goated {
		color: #78dca0;
		text-shadow: 0px 0px 8px #78dca0;
	}

	.based {
		color: #eab876;
		text-shadow: 0px 0px 8px #eab876;
	}

	.cringe {
		color: #ff3a3a;
		text-shadow: 0px 0px 8px #ff3a3a;
	}
</style>
