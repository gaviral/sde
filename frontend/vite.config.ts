import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Generate source maps for better debugging
    sourcemap: true,
    // Optimize for smaller bundles with better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Split Monaco editor into a separate chunk since it's large
          monaco: ['@monaco-editor/react'],
          // Group React and related libraries
          vendor: ['react', 'react-dom'],
        }
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000
  },
  server: {
    // Configure server for better development experience
    port: 5173,
    strictPort: true,
    open: true
  }
})
