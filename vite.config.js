import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  base: '/Sierra-Harpist/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
});