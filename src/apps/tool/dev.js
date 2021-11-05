import { createApp } from 'vue'
import Dev from './Dev.vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
const app = createApp(Dev);
app.use(ElementPlus);
app.mount('#app');
