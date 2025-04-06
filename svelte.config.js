import adapter from '@sveltejs/adapter-auto'; // Change adapter
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://svelte.dev/docs/kit/integrations
    // for more information about preprocessors
    preprocess: vitePreprocess(),

    kit: {
        // Using adapter-static for GitHub Pages
        adapter: adapter({
            // Default options for static adapter
            pages: 'build',
            assets: 'build',
            fallback: 'index.html',
            precompress: false,
            strict: true
        }),
        paths: {
            // Update this if you're not deploying to root domain
            // If your repository is username.github.io, leave this as '/'
            // If your repository is a project repo (username.github.io/project),
            // change this to '/project'
            base: ''
        }
    }
};

export default config;