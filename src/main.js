import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'animate.css';
import pinia from '@/stores/index'
import persist from 'pinia-plugin-persistedstate'
import "./mock/index.js"
import { ElLoading } from 'element-plus'
// import '@/assets/main.scss'
// import ElementUI from 'element-ui';
const app = createApp(App)
app.use(router)

app.use(createPinia().use(persist))

app.mount('#app')