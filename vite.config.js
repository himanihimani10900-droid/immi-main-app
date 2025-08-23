import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5175,
    allowedHosts: [
      '3e41e292ac49.ngrok-free.app',
      'online.immigovaau.info'
    ]
  }
})
