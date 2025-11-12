import './assets/main.css'
import { createApp } from 'vue'

import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import router from './router'
// 引入图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 状态管理器
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia) // 👈 注册 Pinia

app.use(ElementPlus, {
  locale: zhCn,
})
app.use(router)

app.mount('#app')
