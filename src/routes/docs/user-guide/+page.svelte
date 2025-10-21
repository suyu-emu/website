<svelte:head>
	<title>User Guide - suyu Documentation</title>
	<meta name="description" content="Complete user guide for suyu emulator configuration and usage" />
</svelte:head>

<div
	class="relative flex w-full flex-col gap-6 overflow-hidden rounded-[2.25rem] bg-[#110d10] p-8 md:p-12"
>
	<div class="flex items-center gap-4 mb-4">
		<a href="/docs" class="text-[#60c7e9] hover:text-[#f94d4d] transition">← Back to Documentation</a>
	</div>

	<h1 class="text-[24px] leading-[1.41] md:text-[60px] md:leading-[1.1]">User Guide</h1>
	<p class="max-w-[36rem] text-lg leading-relaxed text-[#A6A5A7]">
		Comprehensive guide to using and configuring suyu emulator
	</p>

	<div class="prose prose-invert max-w-none">
		<h2 class="text-2xl font-bold text-white mt-8 mb-4">Basic Configuration</h2>
		
		<h3 class="text-xl font-semibold text-white mt-6 mb-3">Graphics Settings</h3>
		<div class="bg-[#1a1a1a] rounded-lg p-6 border border-[#ffffff11] mb-6">
			<ul class="text-[#A6A5A7] space-y-3">
				<li><strong class="text-white">API:</strong> Vulkan (recommended) or OpenGL</li>
				<li><strong class="text-white">Resolution:</strong> 1x (720p) to 6x (4320p) scaling</li>
				<li><strong class="text-white">Anti-Aliasing:</strong> FXAA, SMAA, or None</li>
				<li><strong class="text-white">Anisotropic Filtering:</strong> 2x to 16x for better texture quality</li>
			</ul>
		</div>

		<h3 class="text-xl font-semibold text-white mt-6 mb-3">Audio Settings</h3>
		<div class="bg-[#1a1a1a] rounded-lg p-6 border border-[#ffffff11] mb-6">
			<ul class="text-[#A6A5A7] space-y-3">
				<li><strong class="text-white">Output Engine:</strong> Auto, Cubeb, or SDL2</li>
				<li><strong class="text-white">Volume:</strong> Adjust master volume (0-100%)</li>
				<li><strong class="text-white">Device:</strong> Select your preferred audio output device</li>
			</ul>
		</div>

		<h3 class="text-xl font-semibold text-white mt-6 mb-3">Control Configuration</h3>
		<div class="bg-[#1a1a1a] rounded-lg p-6 border border-[#ffffff11] mb-6">
			<ul class="text-[#A6A5A7] space-y-3">
				<li><strong class="text-white">Input Device:</strong> Keyboard, Pro Controller, or custom gamepad</li>
				<li><strong class="text-white">Button Mapping:</strong> Customize all button assignments</li>
				<li><strong class="text-white">Motion Controls:</strong> Enable/disable gyroscope simulation</li>
				<li><strong class="text-white">Vibration:</strong> Configure rumble intensity</li>
			</ul>
		</div>

		<h2 class="text-2xl font-bold text-white mt-8 mb-4">Performance Optimization</h2>
		
		<h3 class="text-xl font-semibold text-white mt-6 mb-3">CPU Settings</h3>
		<div class="bg-[#1a1a1a] rounded-lg p-6 border border-[#ffffff11] mb-6">
			<ul class="text-[#A6A5A7] space-y-3">
				<li><strong class="text-white">Multicore:</strong> Enable for better performance on multi-core CPUs</li>
				<li><strong class="text-white">Limit Speed Percent:</strong> Set to 100% for normal speed</li>
				<li><strong class="text-white">CPU Accuracy:</strong> Auto (recommended), Accurate, or Unsafe</li>
			</ul>
		</div>

		<h3 class="text-xl font-semibold text-white mt-6 mb-3">GPU Settings</h3>
		<div class="bg-[#1a1a1a] rounded-lg p-6 border border-[#ffffff11] mb-6">
			<ul class="text-[#A6A5A7] space-y-3">
				<li><strong class="text-white">GPU Accuracy:</strong> Normal (recommended) or High</li>
				<li><strong class="text-white">Use Asynchronous GPU:</strong> Enable for better performance</li>
				<li><strong class="text-white">Use Fast GPU Time:</strong> Enable to reduce GPU overhead</li>
				<li><strong class="text-white">Assembly Shaders:</strong> Enable for NVIDIA GPUs (better performance)</li>
			</ul>
		</div>

		<h2 class="text-2xl font-bold text-white mt-8 mb-4">Game Management</h2>
		
		<h3 class="text-xl font-semibold text-white mt-6 mb-3">Installing Games</h3>
		<ol class="text-[#A6A5A7] space-y-3 list-decimal list-inside">
			<li>Go to <strong class="text-white">File → Install Files to NAND</strong></li>
			<li>Select your game files (NSP, XCI, or NCA format)</li>
			<li>Wait for installation to complete</li>
			<li>Games will appear in your game list</li>
		</ol>

		<h3 class="text-xl font-semibold text-white mt-6 mb-3">Managing Save Data</h3>
		<div class="bg-[#1a1a1a] rounded-lg p-6 border border-[#ffffff11] mb-6">
			<ul class="text-[#A6A5A7] space-y-3">
				<li><strong class="text-white">Save Location:</strong> Automatically managed by suyu</li>
				<li><strong class="text-white">Backup Saves:</strong> Regularly backup your save folder</li>
				<li><strong class="text-white">Transfer Saves:</strong> Copy saves between different suyu installations</li>
			</ul>
		</div>

		<h2 class="text-2xl font-bold text-white mt-8 mb-4">Advanced Features</h2>
		
		<h3 class="text-xl font-semibold text-white mt-6 mb-3">Mods and Cheats</h3>
		<div class="bg-[#1a1a1a] rounded-lg p-6 border border-[#ffffff11] mb-6">
			<ul class="text-[#A6A5A7] space-y-3">
				<li><strong class="text-white">Mod Support:</strong> Install game modifications via the mod folder</li>
				<li><strong class="text-white">Cheat Codes:</strong> Enable built-in cheat support for compatible games</li>
				<li><strong class="text-white">Texture Packs:</strong> Install custom texture packs for enhanced visuals</li>
			</ul>
		</div>

		<h3 class="text-xl font-semibold text-white mt-6 mb-3">Screenshots and Videos</h3>
		<div class="bg-[#1a1a1a] rounded-lg p-6 border border-[#ffffff11] mb-6">
			<ul class="text-[#A6A5A7] space-y-3">
				<li><strong class="text-white">Screenshots:</strong> Press F8 to capture screenshots</li>
				<li><strong class="text-white">Video Recording:</strong> Built-in recording functionality</li>
				<li><strong class="text-white">Output Location:</strong> Files saved to suyu's screenshots folder</li>
			</ul>
		</div>

		<h2 class="text-2xl font-bold text-white mt-8 mb-4">Tips and Best Practices</h2>
		
		<div class="bg-[#1a2a1a] border-l-4 border-[#10b981] rounded-lg p-6 mb-6">
			<h3 class="text-lg font-semibold text-[#10b981] mb-2">💡 Performance Tips</h3>
			<ul class="text-[#A6A5A7] space-y-2 list-disc list-inside">
				<li>Use Vulkan API for better performance on modern GPUs</li>
				<li>Enable multicore CPU emulation</li>
				<li>Lower resolution scaling if experiencing performance issues</li>
				<li>Close unnecessary background applications</li>
			</ul>
		</div>

		<div class="bg-[#2a2a1a] border-l-4 border-[#f59e0b] rounded-lg p-6 mb-6">
			<h3 class="text-lg font-semibold text-[#f59e0b] mb-2">⚡ Quality Tips</h3>
			<ul class="text-[#A6A5A7] space-y-2 list-disc list-inside">
				<li>Use higher resolution scaling for better visual quality</li>
				<li>Enable anisotropic filtering for sharper textures</li>
				<li>Use assembly shaders on NVIDIA GPUs</li>
				<li>Keep your GPU drivers updated</li>
			</ul>
		</div>
	</div>
</div>