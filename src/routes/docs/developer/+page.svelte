<script>
        import { base } from "$app/paths";
</script>

<svelte:head>
        <title>Developer Guide - suyu Documentation</title>
        <meta name="description" content="Developer guide for contributing to suyu emulator" />
</svelte:head>

<div
        class="relative flex w-full flex-col gap-6 overflow-hidden rounded-[2.25rem] bg-[#110d10] p-8 md:p-12"
>
        <div class="flex items-center gap-4 mb-4">
                <a href="{base}/docs" class="text-[#60c7e9] hover:text-[#f94d4d] transition">← Back to Documentation</a>
        </div>

        <h1 class="text-[24px] leading-[1.41] md:text-[60px] md:leading-[1.1]">Developer Guide</h1>
        <p class="max-w-[36rem] text-lg leading-relaxed text-[#A6A5A7]">
                Information for developers who want to contribute to suyu
        </p>

        <div class="prose prose-invert max-w-none">
                <h2 class="text-2xl font-bold text-white mt-8 mb-4">Getting Started</h2>
                
                <div class="bg-[#1a1a2a] border-l-4 border-[#8b5cf6] rounded-lg p-6 mb-6">
                        <h3 class="text-lg font-semibold text-[#8b5cf6] mb-3">📋 Prerequisites</h3>
                        <div class="text-[#A6A5A7] space-y-3">
                                <ul class="list-disc list-inside space-y-1">
                                        <li>C++20 compatible compiler (GCC 11+, Clang 12+, MSVC 2022)</li>
                                        <li>CMake 3.22 or newer</li>
                                        <li>Git for version control</li>
                                        <li>Basic knowledge of emulation concepts</li>
                                </ul>
                        </div>
                </div>

                <h3 class="text-xl font-semibold text-white mt-6 mb-3">Building from Source</h3>
                <div class="bg-[#1a1a1a] rounded-lg p-6 border border-[#ffffff11] mb-6">
                        <p class="text-[#A6A5A7] mb-4">For detailed build instructions, see the <a href="https://github.com/suyu-emu/suyu/blob/dev/README.md" class="text-[#60c7e9] hover:text-[#f94d4d] transition" target="_blank">README.md</a> in our repository.</p>
                        <div class="bg-[#2a2a2a] rounded p-4">
                                <code class="text-white text-sm">
                                        git clone https://github.com/suyu-emu/suyu.git<br/>
                                        cd suyu<br/>
                                        mkdir build && cd build<br/>
                                        cmake .. -DCMAKE_BUILD_TYPE=Release<br/>
                                        make -j$(nproc)
                                </code>
                        </div>
                </div>

                <h2 class="text-2xl font-bold text-white mt-8 mb-4">Contributing</h2>
                
                <div class="bg-[#1a2a1a] border-l-4 border-[#10b981] rounded-lg p-6 mb-6">
                        <h3 class="text-lg font-semibold text-[#10b981] mb-3">🤝 How to Contribute</h3>
                        <div class="text-[#A6A5A7] space-y-3">
                                <ol class="list-decimal list-inside space-y-2">
                                        <li>Submit a dev application in our <a href="https://github.com/suyu-emu" class="text-[#60c7e9] hover:text-[#f94d4d] transition" target="_blank">GitHub Organization</a></li>
                                        <li>Once approved, we'll help set you up with repository access</li>
                                        <li>Fork the repository and create a feature branch</li>
                                        <li>Make your changes following our coding standards</li>
                                        <li>Submit a pull request with detailed description</li>
                                </ol>
                        </div>
                </div>

                <h3 class="text-xl font-semibold text-white mt-6 mb-3">Code Style Guidelines</h3>
                <div class="bg-[#1a1a1a] rounded-lg p-6 border border-[#ffffff11] mb-6">
                        <ul class="text-[#A6A5A7] space-y-2 list-disc list-inside">
                                <li>Follow the existing code style and formatting</li>
                                <li>Use meaningful variable and function names</li>
                                <li>Add comments for complex logic</li>
                                <li>Write unit tests for new functionality</li>
                                <li>Ensure code compiles without warnings</li>
                        </ul>
                </div>

                <h2 class="text-2xl font-bold text-white mt-8 mb-4">Architecture Overview</h2>
                
                <div class="bg-[#1a1a1a] rounded-lg p-6 border border-[#ffffff11] mb-6">
                        <h3 class="text-xl font-semibold text-white mb-3">Core Components</h3>
                        <ul class="text-[#A6A5A7] space-y-2 list-disc list-inside">
                                <li><strong class="text-white">Core:</strong> Main emulation engine and system services</li>
                                <li><strong class="text-white">Video Core:</strong> Graphics rendering and GPU emulation</li>
                                <li><strong class="text-white">Audio Core:</strong> Audio processing and output</li>
                                <li><strong class="text-white">Input:</strong> Controller and input device handling</li>
                                <li><strong class="text-white">Frontend:</strong> User interface and platform-specific code</li>
                        </ul>
                </div>

                <h2 class="text-2xl font-bold text-white mt-8 mb-4">Resources</h2>
                
                <div class="grid gap-4 md:grid-cols-2">
                        <a href="https://github.com/suyu-emu/suyu" class="bg-[#1a1a1a] rounded-lg p-4 border border-[#ffffff11] hover:bg-[#2a2a2a] transition" target="_blank">
                                <h3 class="text-white font-semibold mb-2">Source Code</h3>
                                <p class="text-[#A6A5A7] text-sm">Main repository with all source code</p>
                        </a>
                        <a href="https://github.com/orgs/suyu-emu/discussions" class="bg-[#1a1a1a] rounded-lg p-4 border border-[#ffffff11] hover:bg-[#2a2a2a] transition" target="_blank">
                                <h3 class="text-white font-semibold mb-2">Discussions</h3>
                                <p class="text-[#A6A5A7] text-sm">Community discussions and development chat</p>
                        </a>
                </div>
        </div>
</div>