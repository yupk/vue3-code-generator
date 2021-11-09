import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

import flow from '@/utils/flow'
const app = createApp(App);
app.use(ElementPlus);
app.use(flow);
app.mount('#app');
