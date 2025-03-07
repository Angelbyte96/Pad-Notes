import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import vercel from '@astrojs/vercel'

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@/': './src',
        // Cambiamos el alias para que resuelva a "tslib/tslib.js"
        'tslib': 'tslib/tslib.js'
      },
      dedupe: ['react', 'react-dom']
    },
    optimizeDeps: {
      // No es necesario incluir "tslib" acá ya que se resolverá correctamente
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
