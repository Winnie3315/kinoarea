import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        actor: resolve(__dirname, 'pages/actor/index.html'),
        movie: resolve(__dirname, 'pages/movie/index.html'),
      },
    },
  },
})