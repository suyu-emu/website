<script lang="ts">
	import { createEventDispatcher, onMount, type SvelteComponent } from "svelte";

	interface SidebarItem {
		icon: typeof SvelteComponent<{}>;
		text: string;
		onclick?: () => void;
	}

	let itemIndex = 0;
	let pill: HTMLDivElement;
	let sidebar: HTMLDivElement;

	export let itemsTop: SidebarItem[];
	export let itemsBottom: SidebarItem[];

	const dispatch = createEventDispatcher<{
		changepage: { page: typeof SvelteComponent<{}> };
	}>();

	function getIndex(item: SidebarItem) {
		return Array.prototype.concat(itemsTop, itemsBottom).indexOf(item);
	}

	async function itemClick(item: SidebarItem, e: MouseEvent) {
		if (item.onclick) return item.onclick();
		const button = (e.target as HTMLElement).closest("button");
		console.log(button);
		if (!button) return;
		const rect = button.getBoundingClientRect();
		const sidebarRect = sidebar.getBoundingClientRect();
		try {
			const page = await import(`../pages/${item.text}.svelte`);
			let prevItem = itemIndex;
			itemIndex = getIndex(item);
			if (prevItem === itemIndex) return;
			const isDown = itemIndex > prevItem;
			if (isDown) {
				await pill.animate(
					[
						{
							height: "28px",
						},
					],
					{ duration: 150, easing: "ease-in" },
				).finished;
				pill.style.top = `${rect.top - sidebarRect.top}px`;
				dispatch("changepage", { page: page.default });
				await pill.animate(
					[
						{
							height: "28px",
							transform: "translateY(-4px)",
						},
						{
							height: "16px",
						},
					],
					{ duration: 150, easing: "ease-out", fill: "forwards" },
				).finished;
			} else {
				await pill.animate(
					[
						{
							height: "28px",
							transform: "translateY(-2px)",
						},
					],
					{ duration: 150, easing: "ease-in" },
				).finished;
				pill.style.top = `${rect.top - sidebarRect.top}px`;
				dispatch("changepage", { page: page.default });
				await pill.animate(
					[
						{
							height: "28px",
						},
						{
							height: "16px",
						},
					],
					{ duration: 150, easing: "ease-out", fill: "forwards" },
				).finished;
			}
		} catch {
			console.error(`Page not found: ${item.text}`);
		}
	}

	onMount(() => {
		// i'm sorry orche
		const firstItem = document.querySelector(".sidebar-item");
		if (!firstItem) return;
		const firstItemRect = firstItem.getBoundingClientRect();
		const sidebarRect = sidebar.getBoundingClientRect();
		pill.style.display = "block";
		pill.style.top = `${firstItemRect.top - sidebarRect.top}px`;
		pill.style.left = `${firstItemRect.left - sidebarRect.left + 1}px`;
	});
</script>

<div class="sidebar" bind:this={sidebar}>
	<div class="pill" bind:this={pill} />
	<div class="sidebar-content top">
		{#each itemsTop as item}
			<button
				on:click={(e) => {
					itemClick(item, e);
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
				on:click={(e) => {
					itemClick(item, e);
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
	.pill {
		width: 3px;
		height: 16px;
		background-color: #4e92dc;
		border-radius: 8px;
		display: none;
		position: absolute;
		transform: translateY(10px);
	}

	.sidebar {
		display: flex;
		flex-direction: column;
		padding-bottom: 5px;
		height: 100%;
		position: relative;
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
		height: 36px !important;
		padding: 0 12px;
		gap: 10px;
		border-radius: 6px !important;
		cursor: pointer;
		border: none !important;
		background-color: transparent !important;
	}

	.sidebar-item:hover {
		background-color: rgba(200, 197, 197, 0.1) !important;
		filter: none;
	}

	.sidebar-item:active {
		background-color: rgba(154, 154, 154, 0.15) !important;
		filter: none;
	}

	.sidebar-item > p {
		font-size: 14px !important;
		margin-top: -2px;
	}
</style>
