import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  publicDir: 'public',
  appType: 'mpa',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main:      resolve(__dirname, 'index.html'),
        privacidad: resolve(__dirname, 'privacidad/index.html'),
      },
    },
  },
})
