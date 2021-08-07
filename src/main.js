import { createApp } from 'vue'
import App from './App.vue'
import  vueEditor from "./formEditor";
const app=createApp(App)

app.use(vueEditor).mount('#app')
