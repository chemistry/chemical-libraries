import path from 'node:path';
import { defineConfig } from 'vitest/config';

const root = import.meta.dirname;

export default defineConfig({
  resolve: {
    alias: {
      '@chemistry/common': path.resolve(root, 'packages/common/src/index.ts'),
      '@chemistry/elements': path.resolve(root, 'packages/elements/src/index.ts'),
      '@chemistry/math': path.resolve(root, 'packages/math/src/index.ts'),
      '@chemistry/formula': path.resolve(root, 'packages/formula/src/index.ts'),
      '@chemistry/molecule': path.resolve(root, 'packages/molecule/src/index.ts'),
      '@chemistry/space-groups': path.resolve(root, 'packages/space-groups/src/index.ts'),
    },
  },
  test: {
    globals: true,
    include: ['packages/*/src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['packages/*/src/**/*.{ts,tsx}'],
      exclude: ['packages/*/src/**/*.test.{ts,tsx}', 'packages/*/src/**/index.ts'],
      thresholds: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70,
      },
    },
  },
});
