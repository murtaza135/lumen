import { defineConfig } from 'vite';
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: 'framework', replacement: '/framework' },
    ],
  },
  plugins: [topLevelAwait({})],
});
