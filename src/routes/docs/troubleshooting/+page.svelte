<script>
        import { base } from "$app/paths";
</script>

<svelte:head>
        <title>Troubleshooting - suyu Documentation</title>
        <meta name="description" content="Troubleshooting guide for common suyu emulator issues and solutions" />
</svelte:head>

<div
        class="relative flex w-full flex-col gap-6 overflow-hidden rounded-[2.25rem] bg-[#110d10] p-8 md:p-12"
>
        <div class="flex items-center gap-4 mb-4">
                <a href="{base}/docs" class="text-[#60c7e9] hover:text-[#f94d4d] transition">← Back to Documentation</a>
        </div>

        <h1 class="text-[24px] leading-[1.41] md:text-[60px] md:leading-[1.1]">Troubleshooting</h1>
        <p class="max-w-[36rem] text-lg leading-relaxed text-[#A6A5A7]">
                Solutions to common issues and problems you might encounter with suyu
        </p>

        <div class="prose prose-invert max-w-none">
                <h2 class="text-2xl font-bold text-white mt-8 mb-4">Common Issues</h2>
                
                <div class="bg-[#2a1a1a] border-l-4 border-[#f94d4d] rounded-lg p-6 mb-6">
                        <h3 class="text-lg font-semibold text-[#f94d4d] mb-3">🚫 suyu Won't Start</h3>
                        <div class="text-[#A6A5A7] space-y-3">
                                <p><strong class="text-white">Symptoms:</strong> Application crashes on startup or shows error messages</p>
                                <p><strong class="text-white">Solutions:</strong></p>
                                <ul class="list-disc list-inside space-y-1 ml-4">
                                        <li>Update your graphics drivers to the latest version</li>
                                        <li>Install Microsoft Visual C++ Redistributables</li>
                                        <li>Run suyu as administrator (Windows)</li>
                                        <li>Check if your antivirus is blocking suyu</li>
                                </ul>
                        </div>
                </div>

                <div class="bg-[#2a1a1a] border-l-4 border-[#f94d4d] rounded-lg p-6 mb-6">
                        <h3 class="text-lg font-semibold text-[#f94d4d] mb-3">🎮 Games Won't Load</h3>
                        <div class="text-[#A6A5A7] space-y-3">
                                <p><strong class="text-white">Symptoms:</strong> Games show errors when trying to launch</p>
                                <p><strong class="text-white">Solutions:</strong></p>
                                <ul class="list-disc list-inside space-y-1 ml-4">
                                        <li>Ensure you have the correct firmware installed</li>
                                        <li>Verify your keys (prod.keys, title.keys) are present and valid</li>
                                        <li>Check if the game file is corrupted</li>
                                        <li>Install any required game updates</li>
                                </ul>
                        </div>
                </div>

                <div class="bg-[#2a1a1a] border-l-4 border-[#f94d4d] rounded-lg p-6 mb-6">
                        <h3 class="text-lg font-semibold text-[#f94d4d] mb-3">🐌 Poor Performance</h3>
                        <div class="text-[#A6A5A7] space-y-3">
                                <p><strong class="text-white">Symptoms:</strong> Low FPS, stuttering, or slow gameplay</p>
                                <p><strong class="text-white">Solutions:</strong></p>
                                <ul class="list-disc list-inside space-y-1 ml-4">
                                        <li>Enable multicore CPU emulation</li>
                                        <li>Switch to Vulkan graphics API</li>
                                        <li>Lower resolution scaling</li>
                                        <li>Disable unnecessary graphics enhancements</li>
                                        <li>Close background applications</li>
                                </ul>
                        </div>
                </div>

                <div class="bg-[#2a1a1a] border-l-4 border-[#f94d4d] rounded-lg p-6 mb-6">
                        <h3 class="text-lg font-semibold text-[#f94d4d] mb-3">🔇 No Audio</h3>
                        <div class="text-[#A6A5A7] space-y-3">
                                <p><strong class="text-white">Symptoms:</strong> Games run but produce no sound</p>
                                <p><strong class="text-white">Solutions:</strong></p>
                                <ul class="list-disc list-inside space-y-1 ml-4">
                                        <li>Check audio device selection in suyu settings</li>
                                        <li>Try different audio output engines (Cubeb, SDL2)</li>
                                        <li>Verify system audio is working</li>
                                        <li>Restart suyu after changing audio settings</li>
                                </ul>
                        </div>
                </div>

                <h2 class="text-2xl font-bold text-white mt-8 mb-4">Graphics Issues</h2>
                
                <div class="bg-[#1a1a2a] border-l-4 border-[#8b5cf6] rounded-lg p-6 mb-6">
                        <h3 class="text-lg font-semibold text-[#8b5cf6] mb-3">🖼️ Visual Glitches</h3>
                        <div class="text-[#A6A5A7] space-y-3">
                                <p><strong class="text-white">Symptoms:</strong> Corrupted textures, missing graphics, or rendering errors</p>
                                <p><strong class="text-white">Solutions:</strong></p>
                                <ul class="list-disc list-inside space-y-1 ml-4">
                                        <li>Try switching between Vulkan and OpenGL</li>
                                        <li>Update graphics drivers</li>
                                        <li>Disable assembly shaders if using NVIDIA</li>
                                        <li>Change GPU accuracy settings</li>
                                </ul>
                        </div>
                </div>

                <div class="bg-[#1a1a2a] border-l-4 border-[#8b5cf6] rounded-lg p-6 mb-6">
                        <h3 class="text-lg font-semibold text-[#8b5cf6] mb-3">💥 Graphics Driver Crashes</h3>
                        <div class="text-[#A6A5A7] space-y-3">
                                <p><strong class="text-white">Symptoms:</strong> System freezes or driver resets during gameplay</p>
                                <p><strong class="text-white">Solutions:</strong></p>
                                <ul class="list-disc list-inside space-y-1 ml-4">
                                        <li>Lower resolution scaling</li>
                                        <li>Disable asynchronous GPU emulation</li>
                                        <li>Use OpenGL instead of Vulkan</li>
                                        <li>Reduce graphics settings</li>
                                </ul>
                        </div>
                </div>

                <h2 class="text-2xl font-bold text-white mt-8 mb-4">Input Problems</h2>
                
                <div class="bg-[#1a2a1a] border-l-4 border-[#10b981] rounded-lg p-6 mb-6">
                        <h3 class="text-lg font-semibold text-[#10b981] mb-3">🎯 Controller Not Working</h3>
                        <div class="text-[#A6A5A7] space-y-3">
                                <p><strong class="text-white">Symptoms:</strong> Controller input not recognized or mapped incorrectly</p>
                                <p><strong class="text-white">Solutions:</strong></p>
                                <ul class="list-disc list-inside space-y-1 ml-4">
                                        <li>Reconfigure controls in Emulation → Configure → Controls</li>
                                        <li>Try different controller profiles</li>
                                        <li>Update controller drivers</li>
                                        <li>Use Steam Input if available</li>
                                </ul>
                        </div>
                </div>

                <h2 class="text-2xl font-bold text-white mt-8 mb-4">Error Codes</h2>
                
                <div class="bg-[#1a1a1a] rounded-lg p-6 border border-[#ffffff11] mb-6">
                        <h3 class="text-xl font-semibold text-white mb-3">Common Error Codes</h3>
                        <div class="space-y-4">
                                <div>
                                        <p class="text-white font-mono">Error 2002-4518</p>
                                        <p class="text-[#A6A5A7] text-sm">Missing or invalid system firmware. Install the latest firmware.</p>
                                </div>
                                <div>
                                        <p class="text-white font-mono">Error 2168-0002</p>
                                        <p class="text-[#A6A5A7] text-sm">Missing title keys. Ensure prod.keys and title.keys are properly installed.</p>
                                </div>
                                <div>
                                        <p class="text-white font-mono">Error 2002-2060</p>
                                        <p class="text-[#A6A5A7] text-sm">Corrupted game file. Re-dump or re-download the game.</p>
                                </div>
                        </div>
                </div>

                <h2 class="text-2xl font-bold text-white mt-8 mb-4">Getting Help</h2>
                
                <div class="bg-[#1a2a2a] border-l-4 border-[#60c7e9] rounded-lg p-6 mb-6">
                        <h3 class="text-lg font-semibold text-[#60c7e9] mb-3">📞 Support Channels</h3>
                        <div class="text-[#A6A5A7] space-y-3">
                                <p>If you're still experiencing issues after trying these solutions:</p>
                                <ul class="list-disc list-inside space-y-1 ml-4">
                                        <li>Check our <a href="/faq" class="text-[#60c7e9] hover:text-[#f94d4d] transition">FAQ page</a> for additional help</li>
                                        <li>Visit our <a href="https://github.com/orgs/suyu-emu/discussions" class="text-[#60c7e9] hover:text-[#f94d4d] transition" target="_blank">GitHub Discussions</a></li>
                                        <li>Join the community on <a href="https://www.reddit.com/r/suyu/" class="text-[#60c7e9] hover:text-[#f94d4d] transition" target="_blank">Reddit</a></li>
                                        <li>Report bugs using the <a href="https://github.com/suyu-emu/suyu-issue-tracker" class="text-[#60c7e9] hover:text-[#f94d4d] transition" target="_blank">suyu issue tracker</a></li>
                                </ul>
                        </div>
                </div>

                <div class="bg-[#2a2a1a] border-l-4 border-[#f59e0b] rounded-lg p-6 mb-6">
                        <h3 class="text-lg font-semibold text-[#f59e0b] mb-3">📋 When Reporting Issues</h3>
                        <div class="text-[#A6A5A7] space-y-3">
                                <p>Please include the following information:</p>
                                <ul class="list-disc list-inside space-y-1 ml-4">
                                        <li>suyu version and build date</li>
                                        <li>Operating system and version</li>
                                        <li>Hardware specifications (CPU, GPU, RAM)</li>
                                        <li>Game title and version</li>
                                        <li>Steps to reproduce the issue</li>
                                        <li>Log files (if applicable)</li>
                                </ul>
                        </div>
                </div>
        </div>
</div>