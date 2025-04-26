import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dynamicImport from "vite-plugin-dynamic-import";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), dynamicImport()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@helpers": path.resolve(__dirname, "src/helpers"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@interfaces": path.resolve(__dirname, "src/interfaces"),
      "@styles": path.resolve(__dirname, "src/styles"),
    },
  },
});
