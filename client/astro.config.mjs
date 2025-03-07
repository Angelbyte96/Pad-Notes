import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import vercel from '@astrojs/vercel'

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
      // Ya no es necesario incluir 'tslib'
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'framework': ['react', 'react-dom']
            // Se elimina la división manual de 'tslib'
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
