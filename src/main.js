import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import router from './router/index';

import App from './App.vue'
import 'element-plus/lib/theme-chalk/index.css';
import '@/styles/index.scss'
import Tinymce from '@/components/tinymce/index.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

 
const app=createApp(App)
app.component('tinymce', Tinymce)
app.component('svg-icon', SvgIcon)
// app.use(axios)
app.use(ElementPlus).use(router).mount('#app')
