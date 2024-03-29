import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { createPersistedState } from 'pinia-persistedstate-plugin'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import EventBus from "@/lib/EventBus.js";
import directive from "@/directive/index.js";
import VirtualScroll from "@/plugin/index.js";


const app = createApp(App)
const pinia = createPinia()
const persist = createPersistedState()
const $bus = new EventBus()

pinia.use(persist)
app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.provide("$bus", $bus)
app.use(directive)
app.use(VirtualScroll)

app.mount('#app')
