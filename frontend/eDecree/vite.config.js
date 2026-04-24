import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/auth": {           // ✅ only proxy API paths
        target: "http://localhost:9090", // your Spring Boot backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});