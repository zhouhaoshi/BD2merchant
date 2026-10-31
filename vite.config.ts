import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/BD2merchant/',
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'], // 自动引入 vue 的 ref、toRefs、onMounted 等
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // 「角色抓取」页面用的代理：
  // gamekee 的图鉴接口要 game-alias 头，api-cdn 还要求 Origin/Referer 是 gamekee.com，
  // 浏览器改不了 Origin，只能让 dev server 转发时帮我们补上。
  server: {
    proxy: {
      '/gk-wiki': {
        target: 'https://www.gamekee.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gk-wiki/, ''),
        headers: {
          Origin: 'https://www.gamekee.com',
          Referer: 'https://www.gamekee.com/',
        },
      },
      '/gk-img': {
        target: 'https://cdnimg-v2.gamekee.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gk-img/, ''),
        headers: {
          Origin: 'https://www.gamekee.com',
          Referer: 'https://www.gamekee.com/',
        },
      },
      '/gk-cdn': {
        target: 'https://api-cdn.gamekee.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gk-cdn/, ''),
        headers: {
          Origin: 'https://www.gamekee.com',
          Referer: 'https://www.gamekee.com/',
        },
      },
    },
  },
})
