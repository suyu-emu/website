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
 * Load project board data.
 *
 * Priority:
 *   1. src/content/project-board.json  – written at build time by
 *      scripts/fetch-project-board.mjs from GitHub Projects or an archival
 *      snapshot of the git.suyu.dev project board.
 *   2. FALLBACK_TASKS below            – static data used when the
 *      fetch script was unable to reach the archive.
 */
export async function fetchProjectData(): Promise<ProjectData> {
	// import.meta.glob resolves at Vite build time; returns {} when the
	// file does not yet exist so the build never fails.
	const boardModules = import.meta.glob("/src/content/project-board.json", { eager: true });
	const boardMod: any = Object.values(boardModules)[0];

	if (boardMod) {
		const board = boardMod.default ?? boardMod;
		if (Array.isArray(board.tasks) && board.tasks.length > 0) {
			return {
				tasks: board.tasks as ProjectTask[],
				lastUpdated: board.lastUpdated || new Date().toISOString(),
				source: board.source || "project-board-json",
			};
		}
	}

	// Fallback to static data
	return {
		tasks: FALLBACK_TASKS,
		lastUpdated: new Date().toISOString(),
		source: "fallback",
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
 * Fallback data shown when the Wayback Machine fetch fails and no
 * cached project-board.json is available.  These reflect the main
 * development areas of a Switch emulator rather than specific tasks.
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
