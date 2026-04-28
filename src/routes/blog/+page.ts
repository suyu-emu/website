import type { PageLoad } from "./$types";

export const prerender = true;

export const load: PageLoad = async () => {
	const modules = import.meta.glob("/src/content/blog/*.json", { eager: true });

	const posts = Object.values(modules)
		.map((mod: any) => mod.default ?? mod)
		.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return { posts };
};
