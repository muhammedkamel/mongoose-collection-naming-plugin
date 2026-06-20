import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'source',
          include: ['test/unit/**/*.spec.ts', 'test/integration/**/*.spec.ts'],
        },
      },
      {
        extends: true,
        test: {
          name: 'dist',
          include: ['test/dist/**/*.spec.ts'],
        },
      },
    ],
  },
});
