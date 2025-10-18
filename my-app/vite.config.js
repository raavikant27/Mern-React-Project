import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // ✅ Tailwind plugin add
  ],
  server: {
    port: 5177, // Updated to match current running port
    proxy: {
      '/api': {
        target: 'https://foodfire.onrender.com',
        changeOrigin: true,
        secure: true,
      }
    }
  },
  preview: {
    port: 5177,
  }
})
