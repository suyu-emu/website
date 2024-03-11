<script lang="ts">
	import type { IRoom } from "$types/rooms";

	export let room: IRoom;
</script>

<div class="room">
	<h3>{room.name} <span class="game">({room.preferredGameName || "No preferred game"})</span></h3>
	<p>{room.description}</p>
	<div class="player-count">
		{room.players.length} / {room.maxPlayers} | {#if room.players.length > 4}
			{#each room.players.slice(0, 4) as player}
				{player.nickname}{#if player !== room.players[3]},{" "}
				{/if}
			{/each}
			and {room.players.length - 4}
			{room.players.length - 4 === 1 ? "other" : "others"}
		{:else}
			{#each room.players as player}
				{player.nickname}{#if player !== room.players[room.players.length - 1]},{" "}
				{/if}
			{/each}
		{/if} | {room.hasPassword ? "Private" : "Public"}
	</div>
	<div class="top-right">
		{room.address}:{room.port}
	</div>
</div>

<style>
	.room {
		border: solid thin #353e52;
		padding: 8px 12px;
		background-color: var(--color-primary);
		border-radius: 16px;
		box-shadow: 0 0 48px 0 rgba(39, 56, 75, 0.5);
		position: relative;
	}

	.player-count {
		margin-top: 4px;
	}

	.game {
		margin-left: 4px;
	}

	.top-right {
		position: absolute;
		top: 8px;
		right: 12px;
	}

	.top-right,
	.player-count,
	.game {
		opacity: 0.5;
		font-size: 16px;
	}
</style>
