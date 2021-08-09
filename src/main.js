import { createApp } from 'vue'
import App from './App.vue'
import  vueEditor from "./formEditor";

import logo from "./assets/logo.png";

console.log(logo)
const app=createApp(App)

app.use(vueEditor).mount('#app')
