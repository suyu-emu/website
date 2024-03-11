<script lang="ts">
	import "../app.pcss";
	import { onMount, onDestroy } from "svelte";
	import Logo from "../components/LogoWithTextHorizontal.svelte";
	import { CodeBranchOutline, DiscordSolid, DownloadOutline } from "flowbite-svelte-icons";

	let scrolled = false;

	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 0;
		};

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
			? "fixed top-0 z-[9999] w-full border-b-2 border-b-[#ffffff11] bg-[#131215d0]"
			: "fixed top-0 z-[9999] w-full border-b-0 border-b-[transparent]"}
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
			<div class="flex w-full flex-row items-center justify-end gap-8 text-[#A6A5A7]">
				<CodeBranchOutline />
				<DiscordSolid />
				<a href="/account" class="button-sm">Sign in</a>
			</div>
		</nav>
	</header>
	<div class="mx-auto flex w-full max-w-[1300px] flex-col px-8 pb-12 pt-[120px]">
		<slot />
	</div>
</main>
