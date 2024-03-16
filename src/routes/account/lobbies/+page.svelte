<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<div class="relative h-[calc(100vh-200px)] flex-col gap-6 overflow-hidden">
	<div
		class="relative flex w-full flex-col gap-6 overflow-hidden rounded-[2.25rem] bg-black p-8 md:p-12"
	>
		{#each data.rooms as room}
			<p>{room.name}</p>
		{/each}
	</div>
</div>
