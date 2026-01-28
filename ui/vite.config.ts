import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcssPostcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
    globals: true,
  },
  css: {
    postcss: {
      plugins: [
        tailwindcssPostcss(),
        autoprefixer(),
      ],
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
