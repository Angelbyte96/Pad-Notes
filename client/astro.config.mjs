import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  vite: {
    ssr: {
      // Forzamos que "tslib" se incluya en el bundle para SSR
      noExternal: ['tslib', '@radix-ui/react-*', 'react-remove-scroll', 'react-remove-scroll-bar', 'use-sidecar']
    },
    optimizeDeps: {
      // Aseguramos que "tslib" se procese durante la optimización
      include: ['tslib']
    },
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@/': './src'
      },
      dedupe: ['react', 'react-dom']
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'framework': ['react', 'react-dom']
          }
        }
      },
      commonjsOptions: {
        include: [/tslib/, /node_modules/]
      }
    }
  },
  integrations: [react()]
});
