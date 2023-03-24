import { createApp } from 'vue'
import { createPinia } from 'pinia'
import TDesign from 'tdesign-vue-next';
import 'tdesign-vue-next/es/style/index.css';



import App from './App.vue'
import router from './router'

import './assets/main.css'
import piniaPersist from 'pinia-plugin-persist'
const pinia = createPinia()
pinia.use(piniaPersist)

const app = createApp(App)
app.use(TDesign)
app.use(pinia)
app.use(router)


app.mount('#app')
