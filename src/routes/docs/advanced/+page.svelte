<svelte:head>
	<title>Advanced Topics - suyu Documentation</title>
	<meta name="description" content="Advanced configuration, modding support, and technical deep-dives for suyu emulator" />
</svelte:head>

<div
	class="relative flex w-full flex-col gap-6 overflow-hidden rounded-[2.25rem] bg-[#110d10] p-8 md:p-12"
>
	<div class="flex items-center gap-4 mb-4">
		<a href="/docs" class="text-[#60c7e9] hover:text-[#f94d4d] transition">← Back to Documentation</a>
	</div>

	<h1 class="text-[24px] leading-[1.41] md:text-[60px] md:leading-[1.1]">Advanced Topics</h1>
	<p class="max-w-[36rem] text-lg leading-relaxed text-[#A6A5A7]">
		Advanced configuration, modding support, and technical deep-dives for power users and developers
	</p>

	<div class="prose prose-invert max-w-none">
		<h2 class="text-2xl font-bold text-white mt-8 mb-4">Advanced Configuration</h2>
		
		<h3 class="text-xl font-semibold text-white mt-6 mb-3">Custom Configuration Files</h3>
		<div class="bg-[#1a1a1a] rounded-lg p-6 border border-[#ffffff11] mb-6">
			<p class="text-[#A6A5A7] mb-4">
				suyu supports advanced configuration through custom configuration files and command-line parameters.
			</p>
			<ul class="text-[#A6A5A7] space-y-2">
				<li><strong class="text-white">Config Location:</strong> <code class="bg-[#2a2a2a] px-2 py-1 rounded text-white">%APPDATA%/suyu/config/</code> (Windows)</li>
				<li><strong class="text-white">Linux Config:</strong> <code class="bg-[#2a2a2a] px-2 py-1 rounded text-white">~/.config/suyu/</code></li>
				<li><strong class="text-white">Custom Settings:</strong> Edit <code class="bg-[#2a2a2a] px-2 py-1 rounded text-white">qt-config.ini</code> for advanced options</li>
			</ul>
		</div>

		<h3 class="text-xl font-semibold text-white mt-6 mb-3">Performance Tuning</h3>
		<div class="bg-[#1a1a1a] rounded-lg p-6 border border-[#ffffff11] mb-6">
			<h4 class="text-lg font-semibold text-white mb-3">CPU Optimization</h4>
			<ul class="text-[#A6A5A7] space-y-2 mb-4">
				<li><strong class="text-white">CPU Accuracy:</strong> Adjust between Auto, Accurate, and Unsafe for performance vs accuracy trade-offs</li>
				<li><strong class="text-white">Multicore:</strong> Enable multicore CPU emulation for better performance on multi-threaded systems</li>
				<li><strong class="text-white">Unsafe Optimizations:</strong> Enable for maximum performance (may cause instability)</li>
			</ul>
			
			<h4 class="text-lg font-semibold text-white mb-3">GPU Optimization</h4>
			<ul class="text-[#A6A5A7] space-y-2">
				<li><strong class="text-white">GPU Accuracy:</strong> Normal, High, or Extreme accuracy levels</li>
				<li><strong class="text-white">Async GPU:</strong> Enable asynchronous GPU emulation for better performance</li>
				<li><strong class="text-white">Shader Cache:</strong> Precompiled shader cache management and optimization</li>
			</ul>
		</div>

		<h2 class="text-2xl font-bold text-white mt-8 mb-4">Modding and Homebrew</h2>
		
		<h3 class="text-xl font-semibold text-white mt-6 mb-3">Mod Installation</h3>
		<div class="bg-[#1a1a1a] rounded-lg p-6 border border-[#ffffff11] mb-6">
			<ol class="text-[#A6A5A7] space-y-3 list-decimal list-inside">
				<li>Navigate to <strong class="text-white">File → Install Files to NAND</strong></li>
				<li>Select your mod files (NSP format recommended)</li>
				<li>Restart suyu to apply changes</li>
				<li>Enable mods in <strong class="text-white">Emulation → Configure → General → Patches</strong></li>
			</ol>
		</div>

		<h3 class="text-xl font-semibold text-white mt-6 mb-3">Homebrew Support</h3>
		<div class="bg-[#1a1a1a] rounded-lg p-6 border border-[#ffffff11] mb-6">
			<p class="text-[#A6A5A7] mb-4">
				suyu supports running homebrew applications and development tools.
			</p>
			<ul class="text-[#A6A5A7] space-y-2">
				<li><strong class="text-white">NRO Files:</strong> Directly executable homebrew applications</li>
				<li><strong class="text-white">Development Mode:</strong> Enable developer options for homebrew testing</li>
				<li><strong class="text-white">Debug Features:</strong> Access to debugging tools and logging</li>
			</ul>
		</div>

		<h2 class="text-2xl font-bold text-white mt-8 mb-4">Technical Deep-Dives</h2>
		
		<h3 class="text-xl font-semibold text-white mt-6 mb-3">Emulation Architecture</h3>
		<div class="bg-[#1a1a1a] rounded-lg p-6 border border-[#ffffff11] mb-6">
			<p class="text-[#A6A5A7] mb-4">
				Understanding suyu's emulation architecture can help with troubleshooting and optimization.
			</p>
			<ul class="text-[#A6A5A7] space-y-2">
				<li><strong class="text-white">HLE (High-Level Emulation):</strong> System service emulation for compatibility</li>
				<li><strong class="text-white">LLE (Low-Level Emulation):</strong> Hardware-level emulation for accuracy</li>
				<li><strong class="text-white">JIT Compilation:</strong> Just-in-time compilation for ARM64 code execution</li>
				<li><strong class="text-white">GPU Emulation:</strong> Vulkan/OpenGL translation layer</li>
			</ul>
		</div>

		<h3 class="text-xl font-semibold text-white mt-6 mb-3">Debugging and Logging</h3>
		<div class="bg-[#1a1a1a] rounded-lg p-6 border border-[#ffffff11] mb-6">
			<p class="text-[#A6A5A7] mb-4">
				Advanced debugging features for developers and power users.
			</p>
			<ul class="text-[#A6A5A7] space-y-2">
				<li><strong class="text-white">Log Levels:</strong> Configure logging verbosity (Trace, Debug, Info, Warning, Error)</li>
				<li><strong class="text-white">Performance Metrics:</strong> Enable FPS counter, frame time graphs, and CPU/GPU usage</li>
				<li><strong class="text-white">Memory Debugging:</strong> Memory usage tracking and leak detection</li>
				<li><strong class="text-white">Crash Dumps:</strong> Automatic crash dump generation for debugging</li>
			</ul>
		</div>

		<h2 class="text-2xl font-bold text-white mt-8 mb-4">Command Line Usage</h2>
		
		<div class="bg-[#1a1a1a] rounded-lg p-6 border border-[#ffffff11] mb-6">
			<p class="text-[#A6A5A7] mb-4">
				suyu supports various command-line arguments for automation and advanced usage.
			</p>
			<div class="bg-[#2a2a2a] rounded p-4 mb-4">
				<code class="text-white text-sm">
					suyu.exe [options] [game_path]<br/>
					<br/>
					Options:<br/>
					  -f, --fullscreen    Start in fullscreen mode<br/>
					  -g, --game &lt;path&gt;   Load game from specified path<br/>
					  -c, --config &lt;path&gt; Use custom configuration file<br/>
					  --log-level &lt;level&gt; Set logging level (0-5)<br/>
					  --version           Show version information<br/>
					  --help              Show help message
				</code>
			</div>
		</div>

		<h2 class="text-2xl font-bold text-white mt-8 mb-4">Advanced Troubleshooting</h2>
		
		<h3 class="text-xl font-semibold text-white mt-6 mb-3">Performance Issues</h3>
		<div class="bg-[#1a1a1a] rounded-lg p-6 border border-[#ffffff11] mb-6">
			<ul class="text-[#A6A5A7] space-y-2">
				<li><strong class="text-white">Shader Compilation:</strong> First-time shader compilation causes stuttering - this is normal</li>
				<li><strong class="text-white">CPU Bottlenecks:</strong> Monitor CPU usage and adjust accuracy settings</li>
				<li><strong class="text-white">Memory Issues:</strong> Ensure sufficient RAM and close unnecessary applications</li>
				<li><strong class="text-white">GPU Driver Issues:</strong> Update graphics drivers and check compatibility</li>
			</ul>
		</div>

		<h3 class="text-xl font-semibold text-white mt-6 mb-3">Compatibility Issues</h3>
		<div class="bg-[#1a1a1a] rounded-lg p-6 border border-[#ffffff11] mb-6">
			<ul class="text-[#A6A5A7] space-y-2">
				<li><strong class="text-white">Game-Specific Settings:</strong> Some games require specific configuration tweaks</li>
				<li><strong class="text-white">Firmware Compatibility:</strong> Ensure firmware version matches game requirements</li>
				<li><strong class="text-white">Region Settings:</strong> Configure correct region and language settings</li>
				<li><strong class="text-white">Save Data Issues:</strong> Backup and restore save data when troubleshooting</li>
			</ul>
		</div>

		<div class="bg-[#2a1a1a] border-l-4 border-[#f94d4d] rounded-lg p-6 mb-6">
			<h3 class="text-lg font-semibold text-[#f94d4d] mb-2">⚠️ Advanced User Warning</h3>
			<p class="text-[#A6A5A7]">
				The settings and procedures described in this section are intended for advanced users. 
				Incorrect configuration may cause instability, crashes, or other issues. 
				Always backup your configuration and save data before making advanced changes.
			</p>
		</div>

		<h2 class="text-2xl font-bold text-white mt-8 mb-4">Related Resources</h2>
		<div class="grid gap-4 md:grid-cols-2">
			<a href="/docs/developer" class="bg-[#1a1a1a] rounded-lg p-4 border border-[#ffffff11] hover:bg-[#2a2a2a] transition">
				<h3 class="text-white font-semibold mb-2">Developer Guide</h3>
				<p class="text-[#A6A5A7] text-sm">Building from source and contributing to suyu</p>
			</a>
			<a href="/docs/troubleshooting" class="bg-[#1a1a1a] rounded-lg p-4 border border-[#ffffff11] hover:bg-[#2a2a2a] transition">
				<h3 class="text-white font-semibold mb-2">Troubleshooting</h3>
				<p class="text-[#A6A5A7] text-sm">Common issues and solutions</p>
			</a>
		</div>
	</div>
</div>