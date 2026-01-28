import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
    globals: true,
  },
  css: {
    postcss: (ctx) => {
      if (ctx.file?.includes('node_modules') && ctx.file?.includes('.module.css')) {
        return {
          plugins: [],
        }
      }
      return {
        plugins: {
          '@tailwindcss/postcss': {},
          autoprefixer: {},
        },
      }
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'widget.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'widget.css'
          }
          return assetInfo.name || 'assets/[name].[ext]'
        },
      },
    },
  },
})
