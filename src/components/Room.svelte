<script lang="ts">
	import type { IRoom } from "$types/rooms";

	export let icon: string | undefined;
	export let room: IRoom;
</script>

<div class="relative flex h-fit items-center gap-6 rounded-[2.25rem] bg-[#110d10] p-6">
	{#if icon}
		<img src={icon} alt="Icon for '{room.preferredGameName}'" class="h-[100px] rounded-2xl" />
	{/if}
	<div>
		<h2 class="mb-2 text-[20px] leading-[1.41] md:text-[28px] md:leading-[1.1]">
			{room.name}
			<span class="ml-1 text-base font-normal text-gray-500"
				>({room.preferredGameName || "No preferred game"})</span
			>
		</h2>
		<p>{room.description}</p>
		<div class="mt-2 text-sm text-gray-600">
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
			{/if} | {room.hasPassword ? "Private" : "Public"} | {room.address}:{room.port}
		</div>
	</div>
</div>
