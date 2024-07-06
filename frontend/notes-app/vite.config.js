import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        secure: false,
        // changeOrigin: true, // Recommended for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, ''), // Removes leading /api from the request path
      },
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
