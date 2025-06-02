import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    mainFields: ["module", "jsnext:source", "jsnext:main", "browser", "main"],
    alias: {
      "@": resolve(__dirname, "./src"),
      "@components": resolve(__dirname, "./src/components"),
      "@pages": resolve(__dirname, "./src/pages"),
      "@utils": resolve(__dirname, "./src/utils"),
      "@assets": resolve(__dirname, "./src/assets"),
      "@lib": resolve(__dirname, "./src/lib"),
      "@route": resolve(__dirname, "./src/route"),
      "@routes": resolve(__dirname, "./src/route"),
    },
  },
})
