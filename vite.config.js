import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueJsx from "@vitejs/plugin-vue-jsx";

import styleImport from 'vite-plugin-style-import'

import { svgBuilder } from './src/plugins/svgBuilder';
const { join, resolve } = require('path')

const D = (s) => {

  return join(resolve("src"), s.substr(2))
}



export default defineConfig({

  

  resolve: {
    alias: [{ find: (new RegExp(/^@\/.+/)), replacement: D }],
  },
  plugins: [vue(),
  // vueJsx(),
  styleImport({
    libs: [
      {
        libraryName: 'element-plus',
        esModule: true,
        ensureStyleFile: true,
        resolveStyle: (name) => {
          return `element-theme-chalk/lib/${name}.css`;
        },
        resolveComponent: (name) => {
          return `element-plus/lib/${name}`;
        },
      },

    ],
    // css: {
    //   // css预处理器
    //   preprocessorOptions: {
    //     scss: {
    //       // 引入 var.scss 这样就可以在全局中使用 var.scss中预定义的变量了
    //       additionalData: '@import "./src/scss/color.scss";',
    //     },
    //   },
    // },

  }),

    svgBuilder('./src/assets/icons/svg/')

  ]
})
