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
            '/api': 'http://127.0.0.1:5001/agents-as-a-service/us-central1/api',
        },
        fs: {
            allow: [
                "file:.generated/api-client",
                ".generated/api-client",
                searchForWorkspaceRoot(process.cwd()) + "/.generated",
                "/Users/robert/Developer/Robert/PROJECT-Agents-as-a-Service/website/.generated/api-client/dist/index.js",
            ],
        },
    },
});
