<script lang="ts">
	import { createEventDispatcher, type SvelteComponent } from "svelte";

	interface SidebarItem {
		icon: typeof SvelteComponent<{}>;
		text: string;
		onclick?: () => void;
	}

	let itemIndex = 0;

	export let itemsTop: SidebarItem[];

	export let itemsBottom: SidebarItem[];

	const dispatcher = createEventDispatcher<{
		changepage: { page: typeof SvelteComponent<{}> };
	}>();

	async function itemClick(item: SidebarItem) {
		if (item.onclick) return item.onclick();

		try {
			const page = await import(`../pages/${item.text}.svelte`);
			dispatcher("changepage", { page: page.default });
			itemIndex = Array.prototype.concat(itemsTop, itemsBottom).indexOf(item);
		} catch {
			console.error(`Page not found: ${item.text}`);
		}
	}
</script>

<div class="sidebar">
	<div class="sidebar-content top">
		{#each itemsTop as item}
			<button
				on:click={() => {
					itemClick(item);
				}}
				class="sidebar-item fluent-press"
			>
				<svelte:component this={item.icon} size={16} />
				<p>{item.text}</p>
			</button>
		{/each}
	</div>
	<div class="sidebar-content bottom">
		{#each itemsBottom as item}
			<button
				on:click={() => {
					itemClick(item);
				}}
				class="sidebar-item fluent-press"
			>
				<svelte:component this={item.icon} size={16} />
				<p>{item.text}</p>
			</button>
		{/each}
	</div>
</div>

<style>
	.sidebar {
		display: flex;
		flex-direction: column;
		padding-bottom: 5px;
		height: 100%;
	}

	.sidebar-content {
		display: flex;
		flex-direction: column;
		padding: 0 4px;
		gap: 4px;
	}

	.sidebar-content.top {
		flex-grow: 1;
	}

	.sidebar-content.bottom {
		flex-shrink: 0;
	}

	.sidebar-item {
		appearance: none;
		display: flex;
		align-items: center;
		height: 36px;
		padding: 0 12px;
		gap: 10px;
		border-radius: 6px;
		cursor: pointer;
		border: none;
		background-color: transparent;
	}

	.sidebar-item:hover {
		background-color: rgba(200, 197, 197, 0.1);
		filter: none;
	}

	.sidebar-item:active {
		background-color: rgba(154, 154, 154, 0.15);
		filter: none;
	}

	.sidebar-item > p {
		font-size: 14px !important;
		margin-top: -2px;
	}
</style>
