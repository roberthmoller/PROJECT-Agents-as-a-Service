import {sveltekit} from '@sveltejs/kit/vite';
import {defineConfig} from 'vitest/config';
import {searchForWorkspaceRoot} from "vite";

export default defineConfig({
    plugins: [sveltekit()],
    test: {
        include: ['src/**/*.{test,spec}.{js,ts}']
    },
    server: {
        proxy: {
            // '/api': 'http://127.0.0.1:5001/agents-as-a-service/us-central1',
            // '/api': 'http://127.0.0.1:5002/',
        },
        fs: {
            allow: [
                searchForWorkspaceRoot(process.cwd()) + "/.generated",
            ],
        },
    },
});
