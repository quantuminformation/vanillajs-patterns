import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'jsdom',  // Simulate browser-like environment
        exclude: [
            '**/node_modules/**',  // Exclude all tests in node_modules
            'examples/vue-project/**/*',  // Exclude any Vue project tests if you're not working on them
        ],
    },
});
