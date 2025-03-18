import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@router": path.resolve(__dirname, "src/router"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@schema": path.resolve(__dirname, "src/schema"),
      "@services": path.resolve(__dirname, "src/services"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@redux": path.resolve(__dirname, "src/redux"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@data": path.resolve(__dirname, "src/data"),
      "@context": path.resolve(__dirname, "src/contexts"),
    },
  },
  server: {
    proxy: {
      // Proxy API requests to avoid CORS issues
      "/wp-api": {
        target: "https://hochiminhcitymetro.com/wp-json/wp/v2",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wp-api/, ""),
      },
    },
  },
});
