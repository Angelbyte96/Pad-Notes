import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@/': './src'
      },
      dedupe: ['react', 'react-dom']
    },
    build: {
      rollupOptions: {
        // Le indicamos a Rollup que trate "tslib" como externo
        external: ['tslib'],
        output: {
          manualChunks: {
            'framework': ['react', 'react-dom']
          }
        }
      }
    }
  },
  integrations: [react()],
  // Con esta opción nos aseguramos de que la carpeta de "tslib" se copie a la build final
  adapter: vercel({
    includeFiles: ['./node_modules/tslib/**/*']
  })
});
