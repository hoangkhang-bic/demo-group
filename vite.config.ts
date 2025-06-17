import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
    minify: false,
    emptyOutDir: true,
    
  },
  server:{
    host: '10.20.50.152',
    port: 5173,
    open: true,
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@css': path.resolve(__dirname, './src/css'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@navigators': path.resolve(__dirname, './src/navigators'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@assets/images': path.resolve(__dirname, './src/assets/images'),
      '@services': path.resolve(__dirname, './src/services'),
      '@store': path.resolve(__dirname, './src/store'),
    },
  },
});