<script lang="ts">
        import { onMount } from 'svelte';
        import { 
                fetchProjectData, 
                getCachedData, 
                setCachedData, 
                isCacheValid,
                CACHE_KEYS,
                CACHE_DURATION,
                FALLBACK_TASKS,
                type ProjectTask,
                type ProjectData
        } from '$lib/api';

        let projectTasks: ProjectTask[] = FALLBACK_TASKS;
        let isLoading = true;
        let lastUpdated = '';
        let dataSource = 'fallback';

        async function loadProjectData() {
                try {
                        // Check for cached data first
                        if (isCacheValid(CACHE_KEYS.PROJECT_DATA, CACHE_DURATION.PROJECT_DATA)) {
                                const cachedData = getCachedData<ProjectData>(CACHE_KEYS.PROJECT_DATA);
                                if (cachedData) {
                                        projectTasks = cachedData.tasks;
                                        lastUpdated = cachedData.lastUpdated;
                                        dataSource = 'cached';
                                        isLoading = false;
                                        return;
                                }
                        }

                        // Fetch fresh data
                        const projectData = await fetchProjectData();
                        projectTasks = projectData.tasks;
                        lastUpdated = projectData.lastUpdated;
                        dataSource = projectData.source;

                        // Cache the data
                        setCachedData(CACHE_KEYS.PROJECT_DATA, projectData);

                } catch (error) {
                        console.warn('Failed to fetch project data, using fallback:', error);
                        projectTasks = FALLBACK_TASKS;
                        lastUpdated = 'Using fallback data';
                        dataSource = 'fallback';
                } finally {
                        isLoading = false;
                }
        }

        onMount(() => {
                loadProjectData();
        });

        function getStatusColor(status: string): string {
                switch (status) {
                        case "Completed":
                                return "bg-green-600";
                        case "In Progress":
                                return "bg-blue-600";
                        case "Planned":
                                return "bg-gray-600";
                        case "On Hold":
                                return "bg-yellow-600";
                        case "Cancelled":
                                return "bg-red-600";
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
                        case "Performance":
                                return "bg-orange-500";
                        case "Tools":
                                return "bg-indigo-500";
                        default:
                                return "bg-gray-500";
                }
        }

        function refreshData() {
                isLoading = true;
                // Clear cache to force fresh data
                sessionStorage.removeItem(CACHE_KEYS.PROJECT_DATA);
                sessionStorage.removeItem(`${CACHE_KEYS.PROJECT_DATA}Time`);
                loadProjectData();
        }
</script>

<div class="w-full">
        <div class="mb-6 flex items-center justify-between">
                <div>
                        <h3 class="text-2xl font-bold text-white mb-2">Development Progress</h3>
                        <p class="text-[#A6A5A7]">Current status of major development tasks and improvements</p>
                </div>
                <div class="flex items-center gap-4">
                        {#if lastUpdated}
                                <span class="text-xs text-[#A6A5A7]">
                                        Last updated: {lastUpdated}
                                </span>
                        {/if}
                        <button 
                                on:click={refreshData}
                                disabled={isLoading}
                                class="px-3 py-1 bg-[#60c7e9] text-black rounded-lg text-sm font-medium hover:bg-[#4fb3d9] transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                                {#if isLoading}
                                        <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                {:else}
                                        Refresh
                                {/if}
                        </button>
                </div>
        </div>

        {#if isLoading}
                <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {#each Array(6) as _, i}
                                <div class="bg-[#1a1a1a] rounded-lg p-4 border border-[#ffffff11] animate-pulse">
                                        <div class="flex items-start justify-between mb-3">
                                                <div class="flex items-center gap-2">
                                                        <div class="w-3 h-3 rounded-full bg-gray-600"></div>
                                                        <div class="w-16 h-3 bg-gray-600 rounded"></div>
                                                </div>
                                                <div class="w-20 h-6 bg-gray-600 rounded-full"></div>
                                        </div>
                                        <div class="w-3/4 h-5 bg-gray-600 rounded mb-2"></div>
                                        <div class="w-full h-3 bg-gray-600 rounded mb-3"></div>
                                        <div class="w-full h-2 bg-gray-600 rounded"></div>
                                </div>
                        {/each}
                </div>
        {:else}
                <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {#each projectTasks as task}
                                <div class="bg-[#1a1a1a] rounded-lg p-4 border border-[#ffffff11] hover:bg-[#2a2a2a] transition-colors">
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
                                                                class="bg-[#60c7e9] h-2 rounded-full transition-all duration-500 ease-out"
                                                                style="width: {task.progress}%"
                                                        ></div>
                                                </div>
                                        </div>
                                </div>
                        {/each}
                </div>
        {/if}

        <div class="mt-6 p-4 bg-[#1a1a1a] rounded-lg border border-[#ffffff11]">
                <div class="flex items-start gap-3">
                        <div class="flex-shrink-0">
                                {#if dataSource === 'enhanced'}
                                        <div class="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                {:else if dataSource === 'cached'}
                                        <div class="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                                {:else}
                                        <div class="w-2 h-2 bg-gray-500 rounded-full mt-2"></div>
                                {/if}
                        </div>
                        <div class="flex-1">
                                <p class="text-sm text-[#A6A5A7]">
                                        <strong class="text-white">Note:</strong> This progress tracker shows the current status of major development initiatives.
                                        {#if dataSource === 'enhanced'}
                                                Data is updated with current development priorities.
                                        {:else if dataSource === 'cached'}
                                                Showing cached data from previous update.
                                        {:else}
                                                Showing fallback data - live updates unavailable.
                                        {/if}
                                        For real-time updates and detailed discussions, visit our 
                                        <a href="https://github.com/orgs/suyu-emu/discussions" class="text-[#60c7e9] hover:text-[#f94d4d] transition" target="_blank">GitHub Discussions</a>
                                        or check the 
                                        <a href="https://web.archive.org/web/2024/https://git.suyu.dev/suyu/suyu/projects/11" class="text-[#60c7e9] hover:text-[#f94d4d] transition" target="_blank">project board</a>.
                                </p>
                        </div>
                </div>
        </div>
</div>