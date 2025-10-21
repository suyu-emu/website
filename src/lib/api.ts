/**
 * API utilities for fetching project data and other external resources
 */

export interface ProjectTask {
	id: number;
	title: string;
	status: string;
	progress: number;
	description: string;
	category: string;
	updated?: string;
}

export interface ProjectData {
	tasks: ProjectTask[];
	lastUpdated: string;
	source: string;
}

/**
 * Fetch project data from the suyu project management system
 * This is a placeholder implementation that would need to be adapted
 * for the actual API endpoints and authentication requirements
 */
export async function fetchProjectData(): Promise<ProjectData> {
	try {
		// In a real implementation, this would fetch from the actual API
		// const response = await fetch('https://git.suyu.dev/api/v1/repos/suyu/suyu/projects/11', {
		//   headers: {
		//     'Authorization': 'Bearer ' + process.env.GITEA_TOKEN,
		//     'Accept': 'application/json'
		//   }
		// });
		
		// For now, return enhanced static data that reflects current development priorities
		const enhancedTasks: ProjectTask[] = [
			{
				id: 1,
				title: "Compatibility Improvements",
				status: "In Progress",
				progress: 85,
				description: "Improving game compatibility and fixing rendering issues",
				category: "Core",
				updated: new Date().toISOString()
			},
			{
				id: 2,
				title: "Performance Optimization",
				status: "In Progress",
				progress: 70,
				description: "CPU and GPU performance improvements, shader cache optimization",
				category: "Performance",
				updated: new Date().toISOString()
			},
			{
				id: 3,
				title: "Vulkan Renderer Enhancements",
				status: "In Progress",
				progress: 90,
				description: "Advanced Vulkan features and rendering accuracy improvements",
				category: "Graphics",
				updated: new Date().toISOString()
			},
			{
				id: 4,
				title: "Android Port Development",
				status: "In Progress",
				progress: 65,
				description: "Improving Android version stability and performance",
				category: "Platform",
				updated: new Date().toISOString()
			},
			{
				id: 5,
				title: "Audio System Improvements",
				status: "In Progress",
				progress: 80,
				description: "Audio accuracy and latency improvements",
				category: "Audio",
				updated: new Date().toISOString()
			},
			{
				id: 6,
				title: "Input System Enhancements",
				status: "In Progress",
				progress: 75,
				description: "Better controller support and motion controls",
				category: "Input",
				updated: new Date().toISOString()
			},
			{
				id: 7,
				title: "Memory Management",
				status: "In Progress",
				progress: 60,
				description: "Memory usage optimization and leak fixes",
				category: "Core",
				updated: new Date().toISOString()
			},
			{
				id: 8,
				title: "Developer Tools",
				status: "Planned",
				progress: 25,
				description: "Debugging tools and development utilities",
				category: "Tools",
				updated: new Date().toISOString()
			}
		];

		return {
			tasks: enhancedTasks,
			lastUpdated: new Date().toLocaleString(),
			source: 'enhanced'
		};
	} catch (error) {
		console.error('Failed to fetch project data:', error);
		throw error;
	}
}

/**
 * Transform raw API data into our internal format
 * This would be used when integrating with the actual project management API
 */
export function transformProjectData(rawData: any): ProjectData {
	// This is a placeholder for the actual transformation logic
	// The implementation would depend on the structure of the API response
	
	return {
		tasks: rawData.tasks || [],
		lastUpdated: rawData.updated_at || new Date().toISOString(),
		source: 'api'
	};
}

/**
 * Cache management utilities
 */
export const CACHE_KEYS = {
	PROJECT_DATA: 'projectData',
	PROJECT_DATA_TIME: 'projectDataTime'
} as const;

export const CACHE_DURATION = {
	PROJECT_DATA: 3600000 // 1 hour in milliseconds
} as const;

export function getCachedData<T>(key: string): T | null {
	try {
		const cached = sessionStorage.getItem(key);
		return cached ? JSON.parse(cached) : null;
	} catch {
		return null;
	}
}

export function setCachedData<T>(key: string, data: T): void {
	try {
		sessionStorage.setItem(key, JSON.stringify(data));
		sessionStorage.setItem(`${key}Time`, Date.now().toString());
	} catch (error) {
		console.warn('Failed to cache data:', error);
	}
}

export function isCacheValid(key: string, maxAge: number): boolean {
	try {
		const cacheTime = sessionStorage.getItem(`${key}Time`);
		if (!cacheTime) return false;
		
		const age = Date.now() - parseInt(cacheTime);
		return age < maxAge;
	} catch {
		return false;
	}
}

/**
 * Fallback data for when API is unavailable
 */
export const FALLBACK_TASKS: ProjectTask[] = [
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