import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 8080,
    https: false,
    open: true,
  },
  build: {
    assetsInlineLimit: 2048,
  },
});
