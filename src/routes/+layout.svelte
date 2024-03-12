<script lang="ts">
	import "../app.pcss";
	import { onMount, onDestroy } from "svelte";
	import Logo from "../components/LogoWithTextHorizontal.svelte";
	import { CodeBranchOutline, DiscordSolid, DownloadOutline } from "flowbite-svelte-icons";
	import { browser } from "$app/environment";
	import ModalManager from "$components/ModalRoot.svelte";

	let scrolled = false;
	let cookies: {
		[key: string]: string;
	} = {};
	if (browser) {
		cookies = Object.fromEntries(
			document.cookie.split("; ").map((c) => {
				const [key, value] = c.split("=");
				return [key, value];
			}),
		);
	}
	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 0;
		};

		handleScroll(); // we can't guarantee that the page starts at the top

		cookies = Object.fromEntries(
			document.cookie.split("; ").map((c) => {
				const [key, value] = c.split("=");
				return [key, value];
			}),
		);

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	});
</script>

<main class="min-h-full w-full">
	<header
		style="transition: 180ms ease;"
		class={scrolled
			? "fixed top-0 z-40 w-full border-b-2 border-b-[#ffffff11] bg-[#131215d0]"
			: "fixed top-0 z-40 w-full border-b-0 border-b-[transparent]"}
	>
		<nav
			style="transition: 180ms ease;"
			class={scrolled
				? "mx-auto flex h-[72px] w-full max-w-[1300px] flex-row items-center justify-between px-8 backdrop-blur-xl"
				: "mx-auto flex h-[120px] w-full max-w-[1300px] flex-row items-center justify-between px-8"}
		>
			<div class="flex w-full flex-row items-center justify-start gap-8">
				<a href="/">
					<Logo size={28} />
				</a>
			</div>
			<div
				class="flex w-full flex-row items-center justify-center gap-2 text-sm font-medium text-[#A6A5A7]"
			>
				<a href="/" class="px-5 py-3 transition hover:text-white">Blog</a>
				<a href="/" class="px-5 py-3 transition hover:text-white">Docs</a>
				<a href="/" class="px-5 py-3 transition hover:text-white">FAQ</a>
			</div>
			<div class="flex w-full flex-row items-center justify-end gap-4 text-[#A6A5A7]">
				<a
					class="p-2 transition hover:text-white"
					href="https://gitlab.com/suyu-emu/suyu"
					rel="noreferrer noopener"
					target="_blank"
				>
					<CodeBranchOutline />
				</a>
				<a
					class="p-2 transition hover:text-white"
					href="https://discord.gg/suyu"
					rel="noreferrer noopener"
					target="_blank"
				>
					<DiscordSolid />
				</a>
				<a href={cookies.token ? "/account" : "/signup"} class="button-sm"
					>{cookies.token ? "Account" : "Sign up"}</a
				>
			</div>
		</nav>
	</header>
	<div class="mx-auto flex w-full max-w-[1300px] flex-col px-8 pb-12 pt-[120px]">
		<slot />
	</div>
</main>

<ModalManager />
