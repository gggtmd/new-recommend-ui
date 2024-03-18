import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': { //路径包含/api
        target: 'http://localhost:8080',  //转发至此源
        changeOrigin: true, //是否修改源
        rewrite: path => path.replace(/^\/api/, '')  //将/api
      }
    }
  }
})
