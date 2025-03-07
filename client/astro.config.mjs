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
