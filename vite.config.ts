import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    outDir: '../backend/public',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
