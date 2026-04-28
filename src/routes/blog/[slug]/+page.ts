import type { EntryGenerator, PageLoad } from "./$types";

export const prerender = true;

const modules = import.meta.glob("/src/content/blog/*.json", { eager: true });

const allPosts: Record<string, any> = Object.fromEntries(
	Object.entries(modules).map(([path, mod]: [string, any]) => {
		const post = mod.default ?? mod;
		return [post.slug, post];
	}),
);

export const entries: EntryGenerator = () => {
	return Object.keys(allPosts).map((slug) => ({ slug }));
};

export const load: PageLoad = async ({ params }) => {
	const post = allPosts[params.slug];
	if (!post) {
		throw new Error(`Post not found: ${params.slug}`);
	}
	return { post };
};
