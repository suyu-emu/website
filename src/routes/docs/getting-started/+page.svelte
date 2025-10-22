<script lang="ts">
        import { base } from "$app/paths";
</script>

<svelte:head>
        <title>Getting Started - suyu Documentation</title>
        <meta name="description" content="Getting started with suyu emulator - installation and setup guide" />
</svelte:head>

<div
        class="relative flex w-full flex-col gap-6 overflow-hidden rounded-[2.25rem] bg-[#110d10] p-8 md:p-12"
>
        <div class="flex items-center gap-4 mb-4">
                <a href="{base}/docs" class="text-[#60c7e9] hover:text-[#f94d4d] transition">← Back to Documentation</a>
        </div>

        <h1 class="text-[24px] leading-[1.41] md:text-[60px] md:leading-[1.1]">Getting Started</h1>
        <p class="max-w-[36rem] text-lg leading-relaxed text-[#A6A5A7]">
                Everything you need to know to get suyu up and running on your system
        </p>

        <div class="prose prose-invert max-w-none">
                <h2 class="text-2xl font-bold text-white mt-8 mb-4">System Requirements</h2>
                <div class="bg-[#1a1a1a] rounded-lg p-6 border border-[#ffffff11] mb-6">
                        <h3 class="text-xl font-semibold text-white mb-3">Minimum Requirements</h3>
                        <ul class="text-[#A6A5A7] space-y-2">
                                <li><strong class="text-white">OS:</strong> Windows 10 64-bit, Ubuntu 20.04+, or macOS 10.15+</li>
                                <li><strong class="text-white">CPU:</strong> Intel Core i5-4430 / AMD Ryzen 3 1200</li>
                                <li><strong class="text-white">GPU:</strong> Intel HD Graphics 4400 / AMD Radeon R5 M230</li>
                                <li><strong class="text-white">RAM:</strong> 8 GB</li>
                                <li><strong class="text-white">Storage:</strong> 2 GB available space</li>
                        </ul>
                </div>

                <div class="bg-[#1a1a1a] rounded-lg p-6 border border-[#ffffff11] mb-6">
                        <h3 class="text-xl font-semibold text-white mb-3">Recommended Requirements</h3>
                        <ul class="text-[#A6A5A7] space-y-2">
                                <li><strong class="text-white">OS:</strong> Windows 11 64-bit, Ubuntu 22.04+, or macOS 12+</li>
                                <li><strong class="text-white">CPU:</strong> Intel Core i5-10400 / AMD Ryzen 5 3600</li>
                                <li><strong class="text-white">GPU:</strong> NVIDIA GTX 1060 6GB / AMD RX 580 8GB</li>
                                <li><strong class="text-white">RAM:</strong> 16 GB</li>
                                <li><strong class="text-white">Storage:</strong> 10 GB available space (SSD recommended)</li>
                        </ul>
                </div>

                <h2 class="text-2xl font-bold text-white mt-8 mb-4">Installation</h2>
                
                <h3 class="text-xl font-semibold text-white mt-6 mb-3">Windows</h3>
                <ol class="text-[#A6A5A7] space-y-3 list-decimal list-inside">
                        <li>Download the latest Windows build from our <a href="https://github.com/suyu-emu/suyu-releases" class="text-[#60c7e9] hover:text-[#f94d4d] transition" target="_blank">releases page</a></li>
                        <li>Extract the downloaded ZIP file to a folder of your choice</li>
                        <li>Run <code class="bg-[#2a2a2a] px-2 py-1 rounded text-white">suyu.exe</code> to start the emulator</li>
                        <li>Follow the first-time setup wizard</li>
                </ol>

                <h3 class="text-xl font-semibold text-white mt-6 mb-3">Linux</h3>
                <ol class="text-[#A6A5A7] space-y-3 list-decimal list-inside">
                        <li>Download the AppImage from our <a href="https://github.com/suyu-emu/suyu-releases" class="text-[#60c7e9] hover:text-[#f94d4d] transition" target="_blank">releases page</a></li>
                        <li>Make the AppImage executable: <code class="bg-[#2a2a2a] px-2 py-1 rounded text-white">chmod +x suyu-*.AppImage</code></li>
                        <li>Run the AppImage: <code class="bg-[#2a2a2a] px-2 py-1 rounded text-white">./suyu-*.AppImage</code></li>
                        <li>Follow the first-time setup wizard</li>
                </ol>

                <h3 class="text-xl font-semibold text-white mt-6 mb-3">Android</h3>
                <ol class="text-[#A6A5A7] space-y-3 list-decimal list-inside">
                        <li>Download the APK from our <a href="https://github.com/suyu-emu/suyu-releases" class="text-[#60c7e9] hover:text-[#f94d4d] transition" target="_blank">releases page</a></li>
                        <li>Enable "Install from unknown sources" in your Android settings</li>
                        <li>Install the APK file</li>
                        <li>Launch suyu and complete the setup process</li>
                </ol>

                <h2 class="text-2xl font-bold text-white mt-8 mb-4">First-Time Setup</h2>
                
                <div class="bg-[#2a1a1a] border-l-4 border-[#f94d4d] rounded-lg p-6 mb-6">
                        <h3 class="text-lg font-semibold text-[#f94d4d] mb-2">⚠️ Important Legal Notice</h3>
                        <p class="text-[#A6A5A7]">
                                You must legally own a Nintendo Switch console and the games you wish to emulate. 
                                suyu does not provide any copyrighted content, including system files, games, or keys.
                        </p>
                </div>

                <h3 class="text-xl font-semibold text-white mt-6 mb-3">Required Files</h3>
                <ul class="text-[#A6A5A7] space-y-3 list-disc list-inside">
                        <li><strong class="text-white">System Firmware:</strong> Dump your Switch's firmware using tools like TegraRcmGUI</li>
                        <li><strong class="text-white">Title Keys:</strong> Extract your console's unique keys (title.keys, prod.keys)</li>
                        <li><strong class="text-white">Game Files:</strong> Dump your legally owned games in NSP, XCI, or NCA format</li>
                </ul>

                <h3 class="text-xl font-semibold text-white mt-6 mb-3">Setup Steps</h3>
                <ol class="text-[#A6A5A7] space-y-3 list-decimal list-inside">
                        <li>Launch suyu for the first time</li>
                        <li>Go to <strong class="text-white">File → Install Files to NAND</strong> and install your firmware</li>
                        <li>Place your keys in the appropriate directory (shown in suyu's configuration)</li>
                        <li>Add your game directories in <strong class="text-white">File → Select Game Directory</strong></li>
                        <li>Configure your input devices in <strong class="text-white">Emulation → Configure → Controls</strong></li>
                </ol>

                <h2 class="text-2xl font-bold text-white mt-8 mb-4">Next Steps</h2>
                <div class="grid gap-4 md:grid-cols-2">
                        <a href="{base}/docs/user-guide" class="bg-[#1a1a1a] rounded-lg p-4 border border-[#ffffff11] hover:bg-[#2a2a2a] transition">
                                <h3 class="text-white font-semibold mb-2">User Guide</h3>
                                <p class="text-[#A6A5A7] text-sm">Learn how to configure and optimize suyu</p>
                        </a>
                        <a href="{base}/docs/troubleshooting" class="bg-[#1a1a1a] rounded-lg p-4 border border-[#ffffff11] hover:bg-[#2a2a2a] transition">
                                <h3 class="text-white font-semibold mb-2">Troubleshooting</h3>
                                <p class="text-[#A6A5A7] text-sm">Solutions to common issues and problems</p>
                        </a>
                </div>
        </div>
</div>