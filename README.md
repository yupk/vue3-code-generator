![image](https://ae01.alicdn.com/kf/U51bfb661aba945b48a4c71774421d414C.gif)
## 简介
本项目以 https://github.com/JakHuang/form-generator 为基础，对vue3 和elementu-next 进行了适配


## 使用方法

main.js
```
import { createApp } from 'vue'
import App from './App.vue'
import  vueEditor from "./formEditor";

 
const app=createApp(App)

app.use(vueEditor).mount('#app') //安装表单设计器

```
然后就可以在项目任意处调用表单设计器了
如：
```
<template>
  <div>
   <vue-editor @updateCode="print_code" device="pc"></vue-editor>
  </div>
</template>
```
封装了 updateCode 事件，你可以通过它接收 生成的 vue 模板字符串，和表单配置json

