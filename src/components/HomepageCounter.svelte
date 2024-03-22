<script lang="ts">
	export let count: number = 0;
	export let subText: string = '';
</script>

{#if count > 0}
	<div class="flex flex-col gap-0">
	<h2 class="flex items-center gap-1 text-[40px] leading-[1.1]">
		<!-- <AnimatedCounter
			values={Array.from({ length: contributors + 1 }, (_, i) => i.toString())}
			startImmediately={false}
			direction="up"
			loop={false}
			ease="cubic-bezier(0.25, 0.1, 0.25, 1)"
			initialValue={(contributors - 1).toString()}
			/>+ -->
			{count}+
		</h2>
		<div class="text-[#A6A5A7]">{subText}</div>
	</div>
{/if}
