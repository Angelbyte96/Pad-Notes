// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import vercel from '@astrojs/vercel'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@/': './src'
      },
      dedupe: ['react', 'react-dom']
    },
    optimizeDeps: {
      include: ['tslib']
    },
    build: {
      rollupOptions: {
        external: ['tslib'],
        output: {
          paths: {
            tslib: './node_modules/tslib/tslib.es6.js'
          }
        }
      }
    }
  },
  integrations: [react()],
  adapter: vercel()
})