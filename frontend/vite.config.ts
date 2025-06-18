import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // Opens the browser on start
    port: 3000, // Default Vite port
    fs: {
      strict: false, // Allow history-based routing
    },
  },
});
