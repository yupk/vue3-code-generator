![image](https://ae01.alicdn.com/kf/U51bfb661aba945b48a4c71774421d414C.gif)
## 简介
本项目借鉴  https://github.com/JakHuang/form-generator ，用vue3 和elementu-next 进行了重新

## 在线预览 
[地址](https://yupk.github.io/vue3-code-generator/)

## 使用方法

main.js
```

import {
  createApp
} from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import SvgIcon from '@/components/form/SvgIcon/index.vue';
import {
  VueDraggableNext
} from "vue-draggable-next";
import DraggableWarp from "@/components/form/DraggableWarp.vue";
import OptionInput from "@/components/form/OptionInput.vue";
import UploadWarp from "@/components/form/elementWarp/UploadWarp.vue";
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import hljs from 'highlight.js';
import 'highlight.js/styles/googlecode.css' //样式文件


const app = createApp(App);
app.use(ElementPlus, {
  locale: zhCn,
});

app.component("draggable", VueDraggableNext);
app.component("draggable-warp", DraggableWarp);
app.component("option-input", OptionInput);
app.component("svg-icon", SvgIcon);
app.component("upload-warp", UploadWarp);


app.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code');
  setTimeout(() => {
    blocks.forEach((block) => {
      hljs.highlightBlock(block)
    })
  }, 200)
})

app.mount('#app');

```
然后就可以在项目任意处调用表单设计器了
如：
```
<template>
  <div>
  <page-generator device="pc" />

  </div>
</template>
```


