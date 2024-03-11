<script lang="ts">
	import type { IRoom } from "$types/rooms";

	export let room: IRoom;
</script>

<div class="room">
	<h3>{room.name}</h3>
	<p>{room.description}</p>
</div>

<style>
	.room {
		border: solid thin #353e52;
		padding: 8px 12px;
	}
</style>
