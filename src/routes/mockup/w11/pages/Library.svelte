<script>
	import Card from "../components/Card.svelte";
</script>

<div class="cards">
	<Card />
</div>

<style>
	.cards {
		padding: 20px;
		display: grid;
		grid-template-columns: repeat(auto-fill, 128px);
		grid-gap: 20px;
	}
</style>
