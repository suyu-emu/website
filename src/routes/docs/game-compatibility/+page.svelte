<svelte:head>
	<title>Game Compatibility - suyu Documentation</title>
	<meta name="description" content="Game compatibility information and guides for suyu emulator" />
</svelte:head>

<div
	class="relative flex w-full flex-col gap-6 overflow-hidden rounded-[2.25rem] bg-[#110d10] p-8 md:p-12"
>
	<div class="flex items-center gap-4 mb-4">
		<a href="/docs" class="text-[#60c7e9] hover:text-[#f94d4d] transition">← Back to Documentation</a>
	</div>

	<h1 class="text-[24px] leading-[1.41] md:text-[60px] md:leading-[1.1]">Game Compatibility</h1>
	<p class="max-w-[36rem] text-lg leading-relaxed text-[#A6A5A7]">
		Information about game compatibility and optimization settings
	</p>

	<div class="prose prose-invert max-w-none">
		<div class="bg-[#1a2a1a] border-l-4 border-[#10b981] rounded-lg p-6 mb-6">
			<h3 class="text-lg font-semibold text-[#10b981] mb-3">📊 Compatibility Database</h3>
			<div class="text-[#A6A5A7] space-y-3">
				<p>For the most up-to-date compatibility information, visit our comprehensive compatibility list:</p>
				<a href="https://docs.google.com/spreadsheets/u/0/d/1LrLak1DP4UP3bNZKOCAzwNEp5JMkVozYuMnUBDF8gQM/htmlview#" 
				   class="inline-block bg-[#60c7e9] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#4fb3d9] transition" 
				   target="_blank">
					View Compatibility List
				</a>
			</div>
		</div>

		<h2 class="text-2xl font-bold text-white mt-8 mb-4">Compatibility Ratings</h2>
		
		<div class="grid gap-4 md:grid-cols-2">
			<div class="bg-[#1a2a1a] border-l-4 border-[#10b981] rounded-lg p-4">
				<h3 class="text-[#10b981] font-semibold mb-2">✅ Perfect</h3>
				<p class="text-[#A6A5A7] text-sm">Game runs without issues at full speed</p>
			</div>
			<div class="bg-[#1a2a1a] border-l-4 border-[#22c55e] rounded-lg p-4">
				<h3 class="text-[#22c55e] font-semibold mb-2">✅ Great</h3>
				<p class="text-[#A6A5A7] text-sm">Game runs well with minor issues</p>
			</div>
			<div class="bg-[#2a2a1a] border-l-4 border-[#f59e0b] rounded-lg p-4">
				<h3 class="text-[#f59e0b] font-semibold mb-2">⚠️ Okay</h3>
				<p class="text-[#A6A5A7] text-sm">Game runs but has noticeable issues</p>
			</div>
			<div class="bg-[#2a1a1a] border-l-4 border-[#f94d4d] rounded-lg p-4">
				<h3 class="text-[#f94d4d] font-semibold mb-2">❌ Bad</h3>
				<p class="text-[#A6A5A7] text-sm">Game has major issues or doesn't run</p>
			</div>
		</div>

		<h2 class="text-2xl font-bold text-white mt-8 mb-4">Popular Games</h2>
		
		<div class="bg-[#1a1a1a] rounded-lg p-6 border border-[#ffffff11] mb-6">
			<h3 class="text-xl font-semibold text-white mb-4">Well-Supported Titles</h3>
			<div class="grid gap-3 md:grid-cols-2">
				<div class="flex items-center gap-3">
					<span class="w-3 h-3 bg-[#10b981] rounded-full"></span>
					<span class="text-[#A6A5A7]">Super Mario Odyssey</span>
				</div>
				<div class="flex items-center gap-3">
					<span class="w-3 h-3 bg-[#10b981] rounded-full"></span>
					<span class="text-[#A6A5A7]">The Legend of Zelda: Breath of the Wild</span>
				</div>
				<div class="flex items-center gap-3">
					<span class="w-3 h-3 bg-[#10b981] rounded-full"></span>
					<span class="text-[#A6A5A7]">Super Smash Bros. Ultimate</span>
				</div>
				<div class="flex items-center gap-3">
					<span class="w-3 h-3 bg-[#22c55e] rounded-full"></span>
					<span class="text-[#A6A5A7]">Pokémon Sword/Shield</span>
				</div>
				<div class="flex items-center gap-3">
					<span class="w-3 h-3 bg-[#10b981] rounded-full"></span>
					<span class="text-[#A6A5A7]">Mario Kart 8 Deluxe</span>
				</div>
				<div class="flex items-center gap-3">
					<span class="w-3 h-3 bg-[#22c55e] rounded-full"></span>
					<span class="text-[#A6A5A7]">Animal Crossing: New Horizons</span>
				</div>
			</div>
		</div>

		<h2 class="text-2xl font-bold text-white mt-8 mb-4">Optimization Tips</h2>
		
		<div class="bg-[#1a1a2a] border-l-4 border-[#8b5cf6] rounded-lg p-6 mb-6">
			<h3 class="text-lg font-semibold text-[#8b5cf6] mb-3">🎮 Game-Specific Settings</h3>
			<div class="text-[#A6A5A7] space-y-3">
				<p>Some games benefit from specific configuration changes:</p>
				<ul class="list-disc list-inside space-y-1 ml-4">
					<li><strong class="text-white">CPU-intensive games:</strong> Enable multicore, use accurate CPU timing</li>
					<li><strong class="text-white">Graphics-heavy games:</strong> Use Vulkan, enable assembly shaders</li>
					<li><strong class="text-white">Audio issues:</strong> Try different audio backends</li>
					<li><strong class="text-white">Input lag:</strong> Disable V-Sync, use exclusive fullscreen</li>
				</ul>
			</div>
		</div>

		<h2 class="text-2xl font-bold text-white mt-8 mb-4">Reporting Issues</h2>
		
		<div class="bg-[#2a2a1a] border-l-4 border-[#f59e0b] rounded-lg p-6 mb-6">
			<h3 class="text-lg font-semibold text-[#f59e0b] mb-3">🐛 Found a Bug?</h3>
			<div class="text-[#A6A5A7] space-y-3">
				<p>Help us improve compatibility by reporting issues:</p>
				<ol class="list-decimal list-inside space-y-1 ml-4">
					<li>Check if the issue is already reported</li>
					<li>Test with the latest suyu version</li>
					<li>Provide detailed reproduction steps</li>
					<li>Include system specifications and logs</li>
					<li>Submit to our <a href="https://github.com/suyu-emu/suyu/issues" class="text-[#60c7e9] hover:text-[#f94d4d] transition" target="_blank">GitHub Issues</a></li>
				</ol>
			</div>
		</div>
	</div>
</div>