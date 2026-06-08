import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }),
);
