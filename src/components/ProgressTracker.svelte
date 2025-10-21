<script lang="ts">
	// Static project data since this is a static site
	// Based on typical project tracker structure
	const projectTasks = [
		{
			id: 1,
			title: "Core Emulation Improvements",
			status: "In Progress",
			progress: 75,
			description: "Ongoing improvements to core emulation accuracy and performance",
			category: "Core"
		},
		{
			id: 2,
			title: "Graphics Rendering Enhancements",
			status: "In Progress", 
			progress: 60,
			description: "Vulkan and OpenGL rendering improvements",
			category: "Graphics"
		},
		{
			id: 3,
			title: "Audio System Optimization",
			status: "Completed",
			progress: 100,
			description: "Audio latency reduction and quality improvements",
			category: "Audio"
		},
		{
			id: 4,
			title: "Input System Refactor",
			status: "In Progress",
			progress: 45,
			description: "Better controller support and input mapping",
			category: "Input"
		},
		{
			id: 5,
			title: "Android Port Stability",
			status: "In Progress",
			progress: 80,
			description: "Improving stability and performance on Android devices",
			category: "Platform"
		},
		{
			id: 6,
			title: "Memory Management Optimization",
			status: "Planned",
			progress: 0,
			description: "Reducing memory usage and improving garbage collection",
			category: "Core"
		}
	];

	function getStatusColor(status: string): string {
		switch (status) {
			case "Completed":
				return "bg-green-600";
			case "In Progress":
				return "bg-blue-600";
			case "Planned":
				return "bg-gray-600";
			default:
				return "bg-gray-600";
		}
	}

	function getCategoryColor(category: string): string {
		switch (category) {
			case "Core":
				return "bg-red-500";
			case "Graphics":
				return "bg-purple-500";
			case "Audio":
				return "bg-green-500";
			case "Input":
				return "bg-yellow-500";
			case "Platform":
				return "bg-blue-500";
			default:
				return "bg-gray-500";
		}
	}
</script>

<div class="w-full">
	<div class="mb-6">
		<h3 class="text-2xl font-bold text-white mb-2">Development Progress</h3>
		<p class="text-[#A6A5A7]">Current status of major development tasks and improvements</p>
	</div>

	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each projectTasks as task}
			<div class="bg-[#1a1a1a] rounded-lg p-4 border border-[#ffffff11]">
				<div class="flex items-start justify-between mb-3">
					<div class="flex items-center gap-2">
						<span class={`inline-block w-3 h-3 rounded-full ${getCategoryColor(task.category)}`}></span>
						<span class="text-xs text-[#A6A5A7] uppercase tracking-wide">{task.category}</span>
					</div>
					<span class={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(task.status)}`}>
						{task.status}
					</span>
				</div>
				
				<h4 class="text-white font-semibold mb-2">{task.title}</h4>
				<p class="text-sm text-[#A6A5A7] mb-3">{task.description}</p>
				
				<div class="space-y-2">
					<div class="flex justify-between text-sm">
						<span class="text-[#A6A5A7]">Progress</span>
						<span class="text-white">{task.progress}%</span>
					</div>
					<div class="w-full bg-[#2a2a2a] rounded-full h-2">
						<div 
							class="bg-[#60c7e9] h-2 rounded-full transition-all duration-300"
							style="width: {task.progress}%"
						></div>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<div class="mt-6 p-4 bg-[#1a1a1a] rounded-lg border border-[#ffffff11]">
		<p class="text-sm text-[#A6A5A7]">
			<strong class="text-white">Note:</strong> This progress tracker shows the current status of major development initiatives. 
			For real-time updates and detailed discussions, visit our 
			<a href="https://github.com/orgs/suyu-emu/discussions" class="text-[#60c7e9] hover:text-[#f94d4d] transition" target="_blank">GitHub Discussions</a>.
		</p>
	</div>
</div>