import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import os from 'node:os'
import path from 'node:path'

// Put Vite cache in a temp folder, not node_modules
const cacheDir = path.join(os.tmpdir(), 'vite-mannan-cache')

export default defineConfig({
  plugins: [react()],
  cacheDir, // e.g. C:\Users\<you>\AppData\Local\Temp\vite-mannan-cache
  server: {
    port: 5173,
    hmr: { overlay: false },
    proxy: { '/api': 'http://localhost:8080' }
  },
  optimizeDeps: {
    force: true
  }
})
