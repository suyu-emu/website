<script lang="ts">
        import { base } from "$app/paths";
</script>

<svelte:head>
        <title>Documentation - suyu</title>
        <meta name="description" content="suyu documentation and guides" />
</svelte:head>

<div
        class="relative flex w-full flex-col gap-6 overflow-hidden rounded-[2.25rem] bg-[#110d10] p-8 md:p-12"
>
        <svg
                xmlns="http://www.w3.org/2000/svg"
                width="512"
                height="525"
                viewBox="0 0 512 525"
                fill="none"
                style="animation-duration: 300s; transform-origin: 50% 50%; animation-iteration-count: infinite; animation-timing-function: linear; animation-name: spin; animation-delay: 0s; animation-direction: normal; animation-fill-mode: none; animation-play-state: running;"
                class="pointer-events-none absolute -bottom-[18rem] right-0 z-0 animate-spin opacity-20"
        >
                <path
                        d="M511.5 262.12C511.5 353.613 465.547 434.182 396.019 480.947C408.179 457.937 415.083 431.597 415.083 403.617C415.083 313.723 343.816 240.744 255.992 240.744C191.257 240.744 138.692 186.941 138.692 120.622C138.692 54.3027 191.257 0.5 255.992 0.5C397.026 0.5 511.5 117.695 511.5 262.12ZM255.992 53.5225C243.745 53.5225 233.816 63.7047 233.816 76.2224C233.816 88.7388 243.745 98.9223 255.992 98.9223C268.257 98.9223 278.173 88.7387 278.173 76.2224C278.173 63.7048 268.257 53.5225 255.992 53.5225ZM299.355 97.9223C287.104 97.9223 277.173 108.104 277.173 120.622C277.173 133.139 287.104 143.322 299.355 143.322C311.62 143.322 321.536 133.139 321.536 120.622C321.536 108.104 311.62 97.9223 299.355 97.9223ZM212.635 97.9223C200.382 97.9223 190.455 108.104 190.455 120.622C190.455 133.139 200.382 143.322 212.635 143.322C224.889 143.322 234.816 133.139 234.816 120.622C234.816 108.104 224.888 97.9223 212.635 97.9223ZM255.992 142.322C243.745 142.322 233.816 152.505 233.816 165.021C233.816 177.539 243.745 187.722 255.992 187.722C268.257 187.722 278.173 177.539 278.173 165.021C278.173 152.505 268.257 142.322 255.992 142.322Z"
                        stroke="white"
                />
                <path
                        d="M0.5 262.119C0.5 170.626 46.444 90.0553 115.976 43.2909C103.82 66.3019 96.9172 92.6424 96.9172 120.622C96.9172 210.516 168.174 283.495 255.992 283.495C320.735 283.495 373.305 337.298 373.305 403.617C373.305 469.934 320.735 523.739 255.992 523.739C114.974 523.739 0.5 406.544 0.5 262.119ZM255.992 336.517C243.744 336.517 233.816 346.7 233.816 359.217C233.816 371.735 243.745 381.917 255.992 381.917C268.256 381.917 278.173 371.735 278.173 359.217C278.173 346.701 268.256 336.517 255.992 336.517ZM299.355 380.917C287.104 380.917 277.173 391.099 277.173 403.617C277.173 416.135 287.104 426.317 299.355 426.317C311.619 426.317 321.536 416.135 321.536 403.617C321.536 391.099 311.619 380.917 299.355 380.917ZM255.992 425.317C243.745 425.317 233.816 435.499 233.816 448.016C233.816 460.533 243.744 470.717 255.992 470.717C268.256 470.717 278.173 460.533 278.173 448.016C278.173 435.499 268.256 425.317 255.992 425.317ZM212.634 380.917C200.382 380.917 190.454 391.099 190.454 403.617C190.454 416.135 200.382 426.317 212.634 426.317C224.888 426.317 234.815 416.135 234.815 403.617C234.815 391.099 224.888 380.917 212.634 380.917Z"
                        stroke="white"
                />
        </svg>

        <h1 class="text-[24px] leading-[1.41] md:text-[60px] md:leading-[1.1]">Documentation</h1>
        <p class="max-w-[36rem] text-lg leading-relaxed text-[#A6A5A7]">
                Comprehensive guides and documentation for suyu emulator
        </p>
</div>

<div class="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <a
                href="{base}/docs/getting-started"
                class="relative rounded-[2.25rem] bg-[#110d10] p-8 transition hover:bg-[#1a1a1a] border border-[#ffffff11]"
        >
                <div class="mb-4">
                        <svg class="h-12 w-12 text-[#60c7e9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                </div>
                <h2 class="text-xl font-bold text-white mb-2">Getting Started</h2>
                <p class="text-[#A6A5A7]">Installation guides, system requirements, and first-time setup instructions</p>
        </a>

        <a
                href="{base}/docs/user-guide"
                class="relative rounded-[2.25rem] bg-[#110d10] p-8 transition hover:bg-[#1a1a1a] border border-[#ffffff11]"
        >
                <div class="mb-4">
                        <svg class="h-12 w-12 text-[#f78c40]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                </div>
                <h2 class="text-xl font-bold text-white mb-2">User Guide</h2>
                <p class="text-[#A6A5A7]">How to use suyu, configure settings, and optimize performance</p>
        </a>

        <a
                href="{base}/docs/troubleshooting"
                class="relative rounded-[2.25rem] bg-[#110d10] p-8 transition hover:bg-[#1a1a1a] border border-[#ffffff11]"
        >
                <div class="mb-4">
                        <svg class="h-12 w-12 text-[#f94d4d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                </div>
                <h2 class="text-xl font-bold text-white mb-2">Troubleshooting</h2>
                <p class="text-[#A6A5A7]">Common issues, error solutions, and performance optimization tips</p>
        </a>

        <a
                href="{base}/docs/developer"
                class="relative rounded-[2.25rem] bg-[#110d10] p-8 transition hover:bg-[#1a1a1a] border border-[#ffffff11]"
        >
                <div class="mb-4">
                        <svg class="h-12 w-12 text-[#9333ea]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                </div>
                <h2 class="text-xl font-bold text-white mb-2">Developer Guide</h2>
                <p class="text-[#A6A5A7]">Building from source, contributing guidelines, and API documentation</p>
        </a>

        <a
                href="{base}/docs/game-compatibility"
                class="relative rounded-[2.25rem] bg-[#110d10] p-8 transition hover:bg-[#1a1a1a] border border-[#ffffff11]"
        >
                <div class="mb-4">
                        <svg class="h-12 w-12 text-[#10b981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                </div>
                <h2 class="text-xl font-bold text-white mb-2">Game Compatibility</h2>
                <p class="text-[#A6A5A7]">Game-specific guides, compatibility reports, and optimization settings</p>
        </a>

        <a
                href="{base}/docs/advanced"
                class="relative rounded-[2.25rem] bg-[#110d10] p-8 transition hover:bg-[#1a1a1a] border border-[#ffffff11]"
        >
                <div class="mb-4">
                        <svg class="h-12 w-12 text-[#f59e0b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                </div>
                <h2 class="text-xl font-bold text-white mb-2">Advanced Topics</h2>
                <p class="text-[#A6A5A7]">Advanced configuration, modding support, and technical deep-dives</p>
        </a>
</div>

<!-- Quick Links and Resources -->
<div class="mt-12 bg-[#1a1a1a] rounded-[2.25rem] p-8 border border-[#ffffff11]">
        <h2 class="text-xl font-bold text-white mb-6">Quick Links & Resources</h2>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
		<div class="flex items-center gap-3 p-4 bg-[#2a1a1a] rounded-lg border border-[#f94d4d]">
			<svg class="h-6 w-6 text-[#f94d4d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <div>
				<h3 class="text-[#f94d4d] font-semibold text-sm">Downloads Paused</h3>
				<p class="text-[#A6A5A7] text-xs">Due to DMCA concerns</p>
                        </div>
		</div>
                
                <a href="https://github.com/orgs/suyu-emu/discussions" target="_blank" class="flex items-center gap-3 p-4 bg-[#110d10] rounded-lg hover:bg-[#2a2a2a] transition border border-[#ffffff11]">
                        <svg class="h-6 w-6 text-[#f78c40]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <div>
                                <h3 class="text-white font-semibold text-sm">Community</h3>
                                <p class="text-[#A6A5A7] text-xs">Join discussions and get help</p>
                        </div>
                </a>
                
                <a href="https://github.com/orgs/suyu-emu/projects/1" target="_blank" class="flex items-center gap-3 p-4 bg-[#110d10] rounded-lg hover:bg-[#2a2a2a] transition border border-[#ffffff11]">
                        <svg class="h-6 w-6 text-[#10b981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <div>
                                <h3 class="text-white font-semibold text-sm">Project Board</h3>
                                <p class="text-[#A6A5A7] text-xs">Track development progress</p>
                        </div>
                </a>
                
                <a href="https://web.archive.org/web/2024/https://git.suyu.dev/suyu/suyu" target="_blank" class="flex items-center gap-3 p-4 bg-[#110d10] rounded-lg hover:bg-[#2a2a2a] transition border border-[#ffffff11]">
                        <svg class="h-6 w-6 text-[#9333ea]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        <div>
                                <h3 class="text-white font-semibold text-sm">Source Code</h3>
                                <p class="text-[#A6A5A7] text-xs">View and contribute to code</p>
                        </div>
                </a>
                
                <a href="{base}/faq" class="flex items-center gap-3 p-4 bg-[#110d10] rounded-lg hover:bg-[#2a2a2a] transition border border-[#ffffff11]">
                        <svg class="h-6 w-6 text-[#f94d4d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                                <h3 class="text-white font-semibold text-sm">FAQ</h3>
                                <p class="text-[#A6A5A7] text-xs">Frequently asked questions</p>
                        </div>
                </a>
                
                <a href="https://web.archive.org/web/2024/https://git.suyu.dev/suyu/suyu/wiki" target="_blank" class="flex items-center gap-3 p-4 bg-[#110d10] rounded-lg hover:bg-[#2a2a2a] transition border border-[#ffffff11]">
                        <svg class="h-6 w-6 text-[#f59e0b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <div>
                                <h3 class="text-white font-semibold text-sm">Wiki</h3>
                                <p class="text-[#A6A5A7] text-xs">Additional documentation</p>
                        </div>
                </a>
        </div>
</div>