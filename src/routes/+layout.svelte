<script lang="ts">
	import "../app.pcss";
	import { onMount, onDestroy } from "svelte";
	import Logo from "../components/LogoWithTextHorizontal.svelte";
	import { CodeBranchOutline, DiscordSolid, BarsSolid, CloseSolid } from "flowbite-svelte-icons";
	import { browser } from "$app/environment";
	import { writable } from "svelte/store";
	import { setContext } from "svelte";

	// TODO: refactor
	interface NavItem {
		name: string;
		href: string;
	}

	interface Animation {
		duration: number;
		delay: number;
		property: string | string[];
		timingFunction: string;
	}

	function generateTransition(animations: Animation[]) {
		return animations
			.map((animation) =>
				Array.isArray(animation.property)
					? animation.property
							.map(
								(property) =>
									`${property} ${animation.duration}ms ${animation.timingFunction} ${animation.delay * 50}ms`,
							)
							.join(", ")
					: `${animation.property} ${animation.duration}ms ${animation.timingFunction} ${animation.delay * 50}ms`,
			)
			.join(", ");
	}

	const token = writable("");
	const transition =
		"linear(0,0.006,0.025 2.8%,0.101 6.1%,0.539 18.9%,0.721 25.3%,0.849 31.5%,0.937 38.1%,0.968 41.8%,0.991 45.7%,1.006 50.1%,1.015 55%,1.017 63.9%,1.001)";

	let dropdownOpen = false;
	let dropdownCloseFinished = true;
	let dropdownOpenFinished = false;
	// let dropdownOpen = true;
	// let dropdownCloseFinished = false;
	// let dropdownOpenFinished = true;
	let scrolled = false;
	let cookies: {
		[key: string]: string;
	} = {};

	const navItems: NavItem[] = [
		{
			name: "Blog",
			href: "/coming-soon",
		},
		{
			name: "Docs",
			href: "/coming-soon",
		},
		{
			name: "FAQ",
			href: "/coming-soon",
		},
		{
			name: "Discord",
			href: "https://discord.gg/suyu",
		},
		{
			name: "GitLab",
			href: "https://gitlab.com/suyu-emu/",
		},
	];

	$: {
		if (browser) {
			const html = document.querySelector("html")!;
			if (!dropdownOpen) {
				dropdownCloseFinished = false;
				setTimeout(() => {
					html.style.overflowY = "auto";
					dropdownCloseFinished = true;
				}, 360);
			} else {
				html.style.overflowY = "hidden";
				dropdownOpenFinished = false;
				setTimeout(() => {
					dropdownOpenFinished = true;
				}, 360);
			}
		}
	}

	function getTransition(i: number) {
		return `${((i + 1) / 4) * 75}ms`;
	}

	if (browser) {
		cookies = Object.fromEntries(
			document.cookie.split("; ").map((c) => {
				const [key, value] = c.split("=");
				return [key, value];
			}),
		);
		if (cookies.token) {
			$token = cookies.token;
		}
	}

	function openDropdown() {
		dropdownOpen = !dropdownOpen;
	}

	setContext("token", token);
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

<main
	class={`min-h-full w-full ${dropdownOpen || !dropdownCloseFinished ? "overflow-hidden" : ""}`}
>
	<header
		style="transition: 180ms ease border;"
		class={`${
			scrolled
				? "fixed top-0 z-[9999] w-full border-b-2 border-b-[#ffffff11] bg-[#131215d0]"
				: "fixed top-0 z-[9999] w-full border-b-0 border-b-[transparent]"
		} pl-[calc(100vw-100%)]`}
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
				class="flex w-full flex-row items-center justify-center gap-2 text-sm font-medium text-[#A6A5A7] max-[625px]:hidden"
			>
				<a href="/coming-soon" class="px-5 py-3 transition hover:text-white">Blog</a>
				<a href="/coming-soon" class="px-5 py-3 transition hover:text-white">Docs</a>
				<a href="/coming-soon" class="px-5 py-3 transition hover:text-white">FAQ</a>
			</div>
			<div class="flex w-full flex-row items-center justify-end text-[#A6A5A7]">
				<div class="flex flex-row gap-4 max-[625px]:hidden">
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
					<a href={$token ? "/account" : "/signup"} class="button-sm"
						>{$token ? "Account" : "Sign up"}</a
					>
				</div>
				<div class="relative mr-4 hidden flex-row gap-4 max-[625px]:flex">
					<button
						aria-label={dropdownOpen ? "Close navigation" : "Open navigation"}
						aria-expanded={dropdownOpen}
						on:click={openDropdown}
					>
						<div
							style="transition: 180ms; transition-property: opacity transform;"
							class={`absolute right-0 ${dropdownOpen ? "rotate-45 opacity-0" : "opacity-1"}`}
						>
							<BarsSolid />
						</div>
						<div
							style="transition: 180ms; transition-property: opacity transform;"
							class={dropdownOpen
								? "opacity-1 rotate-0"
								: "rotate-[-45deg] opacity-0"}
						>
							<CloseSolid />
						</div>
					</button>
				</div>
			</div>
		</nav>
	</header>
	<div
		style="transition: 180ms ease;"
		aria-hidden={!dropdownOpenFinished && !dropdownOpen}
		class={`fixed left-0 z-10 h-screen w-full bg-black p-9 pt-[120px] ${dropdownOpen ? "pointer-events-auto visible opacity-100" : "pointer-events-none opacity-0"}`}
	>
		<div class={`flex flex-col gap-8`}>
			<!-- <a href="##"><h1 class="w-full text-5xl">Blog</h1></a>
			<a href="##"><h1 class="w-full text-5xl">Docs</h1></a>
			<a href="##"><h1 class="w-full text-5xl">FAQ</h1></a> -->
			{#each navItems as item, i}
				<a
					style={`transition: ${
						dropdownOpen
							? generateTransition([
									// {
									// 	duration: 600,
									// 	delay: (i + 1) / 4,
									// 	property: "transform",
									// 	timingFunction: transition,
									// },
									// {
									// 	duration: 500,
									// 	delay: i * 1.25,
									// 	property: "filter",
									// 	timingFunction: transition,
									// },
									// {
									// 	duration: 400,
									// 	delay: (i + 1) / 4,
									// 	property: "opacity",
									// 	timingFunction: transition,
									// },
									{
										duration: 450,
										delay: i * 0.6,
										property: ["transform", "opacity", "filter"],
										timingFunction: transition,
									},
								])
							: generateTransition([
									{
										duration: 450,
										delay: 0,
										property: ["transform", "opacity", "filter"],
										timingFunction: transition,
									},
								])
					}`}
					class={dropdownOpen
						? "translate-y-0 opacity-100 filter-none"
						: "-translate-y-24 opacity-0 blur-md"}
					href={item.href}
				>
					<h1 class="w-full text-5xl">{item.name}</h1>
				</a>
			{/each}
		</div>
	</div>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<div
		style="transition: 360ms {transition};"
		aria-hidden={dropdownOpenFinished && dropdownOpen}
		tabindex={dropdownOpen ? 0 : -1}
		class={`relative z-50 mx-auto flex w-full max-w-[1300px] flex-col px-8 pb-12 pt-[120px] ${dropdownOpen ? "pointer-events-none translate-y-[25vh] opacity-0" : ""} ${dropdownOpenFinished && dropdownOpen ? "invisible" : ""}`}
	>
		<slot />
	</div>
</main>
