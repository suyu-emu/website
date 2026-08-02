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
	ssr: {
		resolve: {
			conditions: ['svelte', 'node', 'import', 'default'],
			externalConditions: ['svelte', 'node'],
		},
	},
});
