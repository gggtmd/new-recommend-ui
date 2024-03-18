import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { createPersistedState } from 'pinia-persistedstate-plugin'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
const pinia = createPinia()
const persist = createPersistedState()

pinia.use(persist)
app.use(router)
app.use(pinia)
app.use(ElementPlus)

app.mount('#app')
