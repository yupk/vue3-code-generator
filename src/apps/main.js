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