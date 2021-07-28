import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import router from './router/index';

import App from './App.vue'
import 'element-plus/lib/theme-chalk/index.css';
import '@/styles/index.scss'

createApp(App).use(ElementPlus).use(router).mount('#app')
