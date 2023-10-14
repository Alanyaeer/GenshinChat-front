import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'animate.css';
import pinia from '@/stores/index'
// import '@/assets/main.scss'
// import ElementUI from 'element-ui';
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(pinia)
app.mount('#app')