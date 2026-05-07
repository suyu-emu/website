import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";

export default defineConfig({
	plugins: [
		imagetools({
			defaultDirectives: new URLSearchParams({
				format: "webp",
			}),
		}),
		sveltekit(),
	],
	resolve: {
		conditions: ['svelte', 'browser', 'import', 'default'],
	},
	optimizeDeps: {
		include: ['flowbite-svelte-icons'],
	},
	ssr: {
		noExternal: ['flowbite-svelte-icons'],
	},
});
