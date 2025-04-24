import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Preprocessor configuration
  preprocess: [vitePreprocess({})],
  kit: {
    // Static adapter configuration
    adapter: adapter({
      // Static adapter options
      pages: 'build',
      assets: 'build',
      fallback: 'index.html',
      precompress: false
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
    },
    // Enable prerendering for static site generation
    prerender: {
      entries: ['*']  // This replaces the 'default: true' property
    }
  }
};

export default config;