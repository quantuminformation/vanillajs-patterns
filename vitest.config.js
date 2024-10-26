import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom', // Simulate browser-like environment
    exclude: [
      '**/node_modules/**', // Exclude all tests in node_modules
      'examples/vue-project/**/*', // Exclude any Vue project tests if you're not working on them
    ],
    coverage: {
      reporter: ['text-summary'], // Only display the summary report
      provider: 'v8', // Use the v8 provider for coverage
      exclude: ['node_modules/','examples/'], // Exclude node_modules and Vue project from coverage
    },
  },
});
