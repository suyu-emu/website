import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Preprocessor configuration
	preprocess: [vitePreprocess({})],

	kit: {
		// Node adapter configuration
		adapter: adapter({
			// You can add Node adapter specific options here if needed
		}),
		
		// Path aliases
		alias: {
			$components: "./src/components",
			$assets: "./src/assets",
			$types: "./src/types",
		},
		
		// Base path configuration
		paths: {
			base: process.env.BASE_PATH || '/website' // Replace '/website' with your repo name if different
		}
	}
};

export default config;
