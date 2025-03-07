import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import vercel from '@astrojs/vercel'
import { resolve } from 'path'

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@/': './src',
        // Se resuelve "tslib" a una ruta absoluta
        'tslib': resolve('./node_modules/tslib/tslib.es6.js')
      },
      dedupe: ['react', 'react-dom']
    },
    optimizeDeps: {
      include: ['tslib']
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'framework': ['react', 'react-dom']
          }
        }
      }
    }
  },
  integrations: [react()],
  adapter: vercel({
    includeFiles: ['./node_modules/tslib/**/*']
  })
})
