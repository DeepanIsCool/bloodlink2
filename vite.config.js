import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000, // Changed from default port 5175 to 4000
    strictPort: false, // Allow Vite to try another port if 4000 is occupied
  },
})
