<script lang="ts">
        import "../app.pcss";
        import { onMount } from "svelte";
        import Logo from "../components/LogoWithTextHorizontal.svelte";
        import { CodeBranchOutline } from "flowbite-svelte-icons";
        import { Bars3, XMark } from "svelte-heros-v2";
        import { SiReddit } from "@icons-pack/svelte-simple-icons";
        import { ArchiveBoxArrowDown } from "svelte-heros-v2";
        import { browser } from "$app/environment";
        import type { TransitionConfig } from "svelte/transition";
        import { transition } from "$lib/util/animation";
        import { reducedMotion } from "$lib/accessibility";
        import BackgroundProvider from "$components/BackgroundProvider.svelte";
        import { base } from "$app/paths";

        // TODO: refactor

        const navigator = browser ? window.navigator : { userAgent: "" };

        function transitionIn(node: HTMLElement, { duration = 360 }: TransitionConfig) {
                if ($reducedMotion)
                        return {
                                duration: 0,
                        };
                node = node.querySelector(".content") || node;
                const intensity = node.dataset.intensityIn || "160";
                const UA = navigator.userAgent;
                const ff = UA.indexOf("Firefox") > -1;
                if (!dropdownCloseFinished) {
                        node.animate(
                                [
                                        {
                                                top: `${intensity}px`,
                                                opacity: "0",
                                                filter: ff ? "none" : `blur(${parseInt(intensity) / 16}px)`,
                                        },
                                        {
                                                top: "0",
                                                opacity: "1",
                                                filter: ff ? "none" : "blur(0px)",
                                        },
                                ],
                                {
                                        easing: transition,
                                        duration,
                                },
                        );

                        return {
                                duration: 0,
                        };
                }
                // FUCK YOUR DEFAULT SYSTEM, SVELTEKIT!!!
                node.animate(
                        [
                                {
                                        top: `${-intensity}px`,
                                        opacity: "0",
                                        filter: ff ? "none" : `blur(${parseInt(intensity) / 16}px)`,
                                },
                                {
                                        top: "0",
                                        opacity: "1",
                                        filter: ff ? "none" : "blur(0px)",
                                },
                        ],
                        {
                                easing: transition,
                                duration,
                        },
                );
                return {
                        duration,
                };
        }

        function transitionOut(node: HTMLElement, { duration = 360 }: TransitionConfig) {
                if ($reducedMotion)
                        return {
                                duration: 0,
                        };
                node = node.querySelector(".content") || node;
                const intensity = node.dataset.intensityOut || "240";
                if (!dropdownCloseFinished)
                        return {
                                duration: 0,
                        };
                const UA = navigator.userAgent;
                const ff = UA.indexOf("Firefox") > -1;
                node.animate(
                        [
                                {
                                        top: "0",
                                        opacity: "1",
                                        filter: ff ? "none" : "blur(0px)",
                                },
                                {
                                        top: `${intensity}px`,
                                        opacity: "0",
                                        filter: ff ? "none" : `blur(${parseInt(intensity) / 16}px)`,
                                },
                        ],
                        {
                                easing: transition,
                                duration: duration,
                        },
                );
                return {
                        duration,
                };
        }

        let dropdownOpen = false;
        let dropdownCloseFinished = true;
        let dropdownOpenFinished = false;
        let scrolled = false;

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

        function toggleDropdown() {
                dropdownOpen = !dropdownOpen;
        }

        onMount(() => {
                const handleScroll = () => {
                        scrolled = window.scrollY > 0;
                };

                handleScroll(); // we can't guarantee that the page starts at the top

                window.addEventListener("scroll", handleScroll);

                return () => {
                        window.removeEventListener("scroll", handleScroll);
                };
        });
</script>

{#if navigator.userAgent.indexOf("Firefox") === -1}
        <div
                class="opacity-5"
                style="position: fixed; width: 100vw; height: 100vh; --mask-image: linear-gradient(to bottom, transparent 50px, black 150px, transparent); mask-image: var(--mask-image); -webkit-mask-image: var(--mask-image);"
        >
                <BackgroundProvider size={90} gap={16} speed={0.25} />
        </div>
{/if}

<div class="bg">
        <div
                style="background: radial-gradient(50% 50%, rgba(255,0,0,0.05), transparent); z-index: -1; width: 800px ;height: 800px; position: fixed; top: -50%; left: calc(25% - 400px);"
        />

        <div
                style="background: radial-gradient(50% 50%, rgba(0,128,255,0.05), transparent); z-index: -1; width: 800px ;height: 800px; position: fixed; top: -50%; right: calc(25% - 400px);"
        />
</div>

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
                                <a
                                        href="{base}/"
                                        title="Suyu Home"
                                        on:click={() => {
                                                if (dropdownOpen && window.innerWidth < 800) toggleDropdown();
                                        }}
                                >
                                        <Logo size={28} />
                                </a>
                        </div>
                        <div
                                class="flex w-full flex-row items-center justify-center gap-2 text-sm font-medium text-[#A6A5A7] max-[800px]:hidden"
                        >
                                <a
                                        href="{base}/about"
                                        class="px-5 py-3 transition hover:text-white"
                                        title="About suyu">About</a
                                >
                                <a
                                        href="{base}/blog"
                                        class="px-5 py-3 transition hover:text-white"
                                        title="Blog">Blog</a
                                >
                                <a
                                        href="{base}/docs"
                                        class="px-5 py-3 transition hover:text-white"
                                        title="Documentation">Docs</a
                                >
                                <a
                                        href="{base}/faq"
                                        class="px-5 py-3 transition hover:text-white"
                                        title="Frequently Asked Questions">FAQ</a
                                >
                                <a
                                        href="https://docs.google.com/spreadsheets/u/0/d/1LrLak1DP4UP3bNZKOCAzwNEp5JMkVozYuMnUBDF8gQM/htmlview#"
                                        class="px-5 py-3 transition hover:text-white"
                                        title="Compatibility"
                                        target="_blank">Compatibility</a
                                >
                                <a
                                        href="{base}/legal"
                                        class="px-5 py-3 transition hover:text-white"
                                        title="Legal information">Legal</a
                                >
                        </div>
                        <div class="flex w-full flex-row items-center justify-end text-[#A6A5A7]">
                                <div class="flex flex-row gap-4 max-[800px]:hidden">
                                        <a
                                                class="p-2 transition hover:text-white"
                                                href="https://github.com/suyu-emu"
                                                rel="noreferrer noopener"
                                                target="_blank"
                                                title="Suyu Organization"
                                        >
                                                <CodeBranchOutline />
                                        </a>
                                        <a
                                                class="p-2 transition hover:text-white"
                                                href="https://www.reddit.com/r/suyu/"
                                                rel="noreferrer noopener"
                                                target="_blank"
                                                title="Suyu Reddit"
                                        >
                                                <SiReddit />
                                        </a>
                                        <a
                                                class="p-2 transition hover:text-white"
                                                href="https://web.archive.org/web/20240304000000*/https://suyu.dev/static/brand/suyuBrandKit.zip"
                                                rel="noreferrer noopener"
                                                target="_blank"
                                                title="Download Press Kit (Archived)"
                                        >
                                                <ArchiveBoxArrowDown />
                                        </a>
                                </div>
                                <div class="relative mr-4 hidden flex-row gap-4 max-[800px]:flex">
                                        <button
                                                aria-label={dropdownOpen ? "Close navigation" : "Open navigation"}
                                                aria-expanded={dropdownOpen}
                                                on:click={toggleDropdown}
                                                class="-mr-4 p-4"
                                        >
                                                <div
                                                        style="transition: 180ms; transition-property: opacity transform;"
                                                        class={`absolute ${dropdownOpen ? "rotate-45 opacity-0" : "opacity-1"}`}
                                                >
                                                        <Bars3 variation="solid" />
                                                </div>
                                                <div
                                                        style="transition: 180ms; transition-property: opacity transform;"
                                                        class={dropdownOpen
                                                                ? "opacity-1 rotate-0"
                                                                : "rotate-[-45deg] opacity-0"}
                                                >
                                                        <XMark variation="solid" />
                                                </div>
                                        </button>
                                </div>
                        </div>
                </nav>
        </header>

        <!-- Mobile Navigation Menu -->
        {#if dropdownOpen}
                <div
                        class="fixed inset-0 z-[9998] bg-[#131215d0] backdrop-blur-xl min-[800px]:hidden"
                        style="top: {scrolled ? '72px' : '120px'};"
                        in:transitionIn={{ duration: 360 }}
                        out:transitionOut={{ duration: 360 }}
                >
                        <nav class="flex flex-col p-8 gap-2">
                                <!-- Main Navigation Links -->
                                <a
                                        href="{base}/about"
                                        class="px-4 py-4 text-lg font-medium text-[#A6A5A7] transition hover:text-white border-b border-[#ffffff11]"
                                        title="About suyu"
                                        on:click={toggleDropdown}
                                >
                                        About
                                </a>
                                <a
                                        href="{base}/blog"
                                        class="px-4 py-4 text-lg font-medium text-[#A6A5A7] transition hover:text-white border-b border-[#ffffff11]"
                                        title="Blog"
                                        on:click={toggleDropdown}
                                >
                                        Blog
                                </a>
                                <a
                                        href="{base}/docs"
                                        class="px-4 py-4 text-lg font-medium text-[#A6A5A7] transition hover:text-white border-b border-[#ffffff11]"
                                        title="Documentation"
                                        on:click={toggleDropdown}
                                >
                                        Docs
                                </a>
                                <a
                                        href="{base}/faq"
                                        class="px-4 py-4 text-lg font-medium text-[#A6A5A7] transition hover:text-white border-b border-[#ffffff11]"
                                        title="Frequently Asked Questions"
                                        on:click={toggleDropdown}
                                >
                                        FAQ
                                </a>
                                <a
                                        href="https://docs.google.com/spreadsheets/u/0/d/1LrLak1DP4UP3bNZKOCAzwNEp5JMkVozYuMnUBDF8gQM/htmlview#"
                                        class="px-4 py-4 text-lg font-medium text-[#A6A5A7] transition hover:text-white border-b border-[#ffffff11]"
                                        title="Compatibility"
                                        target="_blank"
                                        on:click={toggleDropdown}
                                >
                                        Compatibility
                                </a>
                                <a
                                        href="{base}/legal"
                                        class="px-4 py-4 text-lg font-medium text-[#A6A5A7] transition hover:text-white border-b border-[#ffffff11]"
                                        title="Legal information"
                                        on:click={toggleDropdown}
                                >
                                        Legal
                                </a>

                                <!-- Social Links Section -->
                                <div class="mt-8 px-4">
                                        <h3 class="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Connect</h3>
                                        <div class="flex flex-col gap-2">
                                                <a
                                                        class="flex items-center gap-3 py-3 text-[#A6A5A7] transition hover:text-white"
                                                        href="https://github.com/suyu-emu"
                                                        rel="noreferrer noopener"
                                                        target="_blank"
                                                        title="Suyu Organization"
                                                        on:click={toggleDropdown}
                                                >
                                                        <CodeBranchOutline size="20" />
                                                        <span>GitHub</span>
                                                </a>
                                                <a
                                                        class="flex items-center gap-3 py-3 text-[#A6A5A7] transition hover:text-white"
                                                        href="https://www.reddit.com/r/suyu/"
                                                        rel="noreferrer noopener"
                                                        target="_blank"
                                                        title="Suyu Reddit"
                                                        on:click={toggleDropdown}
                                                >
                                                        <SiReddit size="20" />
                                                        <span>Reddit</span>
                                                </a>
                                                <a
                                                        class="flex items-center gap-3 py-3 text-[#A6A5A7] transition hover:text-white"
                                                        href="https://web.archive.org/web/20240304000000*/https://suyu.dev/static/brand/suyuBrandKit.zip"
                                                        rel="noreferrer noopener"
                                                        target="_blank"
                                                        title="Download Press Kit (Archived)"
                                                        on:click={toggleDropdown}
                                                >
                                                        <ArchiveBoxArrowDown size="20" />
                                                        <span>Press Kit</span>
                                                </a>
                                        </div>
                                </div>
                        </nav>
                </div>
        {/if}

        <div
                in:transitionIn={{ duration: 500 }}
                out:transitionOut={{ duration: 500 }}
                aria-hidden={dropdownOpenFinished && dropdownOpen}
                tabindex={dropdownOpen ? 0 : -1}
                role="menu"
                class={`absolute left-[50%] z-50 mx-auto flex w-screen max-w-[1300px] translate-x-[-50%] flex-col px-8 pb-12 pt-[120px] ${dropdownOpen ? "pointer-events-none translate-y-[25vh] opacity-0" : ""} ${dropdownOpenFinished && dropdownOpen ? "invisible" : ""}`}
        >
                <slot />
        </div>
</main>
