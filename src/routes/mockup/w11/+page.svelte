<script lang="ts">
	import "$lib/css/fluent.css";
	import Logo from "$components/Logo.svelte";
	import close from "$assets/mockups/close.svg";
	import maximize from "$assets/mockups/maximize.svg";
	import minimize from "$assets/mockups/minimize.svg";
	import Sidebar from "./components/Sidebar.svelte";
	import { onMount, type SvelteComponent } from "svelte";
	import LibraryPage from "./pages/Library.svelte";
	import Library from "./components/icons/Library.svelte";
	import Settings from "./components/icons/Settings.svelte";
	import Community from "./components/icons/Community.svelte";
	import Globe from "./components/icons/Globe.svelte";
	import QA from "./components/icons/QA.svelte";

	let Page: typeof SvelteComponent<{}>;
	let tbMain: HTMLDivElement;
	let tbFiller: HTMLDivElement;
	let windowEl: HTMLDivElement;
	let downPos: { x: number; y: number };

	function changePage(e: CustomEvent<{ page: typeof SvelteComponent<{}> }>) {
		Page = e.detail.page;
	}

	onMount(() => {
		const left = Math.round((window.innerWidth - windowEl.offsetWidth) / 2);
		const top = Math.round((window.innerHeight - windowEl.offsetHeight) / 2);
		windowEl.style.left = `${left % 2 === 0 ? left : left + 1}px`;
		windowEl.style.top = `${top % 2 === 0 ? top : top + 1}px`;

		function onMove(e: MouseEvent) {
			windowEl.style.left = `${windowEl.offsetLeft + e.clientX - downPos.x}px`;
			windowEl.style.top = `${windowEl.offsetTop + e.clientY - downPos.y}px`;
			downPos = { x: e.clientX, y: e.clientY };
		}

		function onMouseDown(e: MouseEvent) {
			downPos = { x: e.clientX, y: e.clientY };
			document.addEventListener("mousemove", onMove);
			document.addEventListener("mouseup", onMouseUp);
		}

		function onMouseUp(e: MouseEvent) {
			document.removeEventListener("mousemove", onMove);
			document.removeEventListener("mouseup", onMouseUp);
		}

		tbFiller.addEventListener("mousedown", onMouseDown);
		tbMain.addEventListener("mousedown", onMouseDown);

		return () => {
			document.removeEventListener("mousemove", onMove);
			document.removeEventListener("mouseup", onMouseUp);
			tbFiller.removeEventListener("mousedown", onMouseDown);
			tbMain.removeEventListener("mousedown", onMouseDown);
		};
	});
</script>

<div class="root">
	<div class="window mica-backdrop" bind:this={windowEl}>
		<div class="window-contents">
			<div class="titlebar-sidebar">
				<div bind:this={tbMain} class="titlebar on-mica-bg">
					<div class="titlebar-contents">
						<div class="icon">
							<Logo size={16} />
						</div>
						<div class="title">suyu | dev-1574a6818</div>
					</div>
				</div>
				<div class="sidebar on-mica-bg">
					<Sidebar
						itemsTop={[
							{
								icon: Library,
								text: "Library",
							},
							{
								icon: Settings,
								text: "Settings",
							},
							{
								icon: Community,
								text: "Multiplayer",
							},
						]}
						itemsBottom={[
							{
								text: "Offical Website",
								icon: Globe,
								onclick: () => window.open("https://suyu.dev", "_blank"),
							},
							{
								text: "Discord",
								icon: QA,
								onclick: () => window.open("https://discord.gg/suyu", "_blank"),
							},
						]}
						on:changepage={changePage}
					/>
				</div>
			</div>
			<div class="filler-with-content">
				<div bind:this={tbFiller} class="titlebar-filler on-mica-bg">
					<div class="titlebar-buttons">
						<div class="tb-button">
							<img src={minimize} alt="Minimize" />
						</div>
						<div class="tb-button">
							<img src={maximize} alt="Maximize" />
						</div>
						<div class="tb-button close">
							<img src={close} alt="Close" />
						</div>
					</div>
				</div>
				<div class="window-body">
					<svelte:component this={Page || LibraryPage} />
				</div>
			</div>
		</div>
		<div class="disclaimer">
			<h1>Disclaimer</h1>
			<p>
				This is a <b>concept</b> for suyu's launcher, made by nullptr. It is not<br />a true
				desktop application, it is non-functional and running in<br />a browser.
			</p>
		</div>
	</div>
</div>

<style>
	@keyframes window-appear {
		from {
			opacity: 0;
			transform: scale(0.85);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.window-body {
		flex-grow: 1;
	}

	.filler-with-content {
		flex-grow: 1;
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
	}

	.titlebar-sidebar {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 250px;
	}

	.titlebar-filler {
		height: 40px;
		border-bottom: var(--fluent-stroke);
		flex-shrink: 0;
	}

	.window-contents {
		width: 100%;
		height: 100%;
		display: flex;
	}

	.sidebar {
		height: 100%;
		flex-grow: 1;
		border-right: var(--fluent-stroke);
	}

	.titlebar-contents {
		display: flex;
		height: 40px;
		padding: 10px 8px;
	}

	.title {
		margin-top: -3px;
		margin-left: 8px;
		font-size: 14px;
	}

	.root {
		width: 100vw;
		height: 100vh;
		background-image: url($assets/mockups/Screenshot.png);
		background-position: bottom center;
	}

	.window {
		width: 1012px;
		height: 600px;
		position: absolute;
	}

	.disclaimer {
		text-align: right;
		position: absolute;
		bottom: 16px;
		right: 24px;
	}

	.titlebar-buttons {
		position: absolute;
		right: 0;
		top: 0;
		display: flex;
	}

	.tb-button {
		width: 46px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
