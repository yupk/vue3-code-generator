import ElementPlus from 'unplugin-element-plus/vite'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import {
    defineConfig
} from 'vite'
import {
    svgBuilder
} from './src/plugins/svgBuilder';

const {
    join,
    resolve
} = require('path')

const D = (s) => {

    return join(resolve("src"), s.substr(2))
}

export default defineConfig({

    build: {
        rollupOptions: {
            input: {
                main: "./index.html",
                tool: "./tool.html"

            },
        },
    },

    resolve: {
        alias: [{
            find: (new RegExp(/^@\/.+/)),
            replacement: D
        }],
    },
    plugins: [
        vue(),
        ElementPlus({
            importStyle: 'sass',
            useSource: true
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        }),
        svgBuilder('./src/assets/icons/svg/')
    ]
})