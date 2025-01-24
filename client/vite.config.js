import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/socket.io": {
        target: "https://blogorbit.onrender.com", // Backend URL
        changeOrigin: true,
        ws: true, // Enable WebSocket proxying
      },
    },
  },
});
