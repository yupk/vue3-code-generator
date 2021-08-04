import loadScript from './loadScript'

import pluginsConfig from './pluginsConfig'
import { ElLoading } from 'element-plus';

// monaco-editor单例
let monacoEidtor

/**
 * 动态加载monaco-editor cdn资源
 * @param {Function} cb 回调，必填
 */
export default function loadMonaco (cb) {
  if (monacoEidtor) {
    cb(monacoEidtor)
    return
  }

  const { monacoEditorUrl: vs } = pluginsConfig

  // 使用element ui实现加载提示
  const loading = ElLoading.service({
    fullscreen: true,
    lock: true,
    text: '编辑器资源初始化中...',
    spinner: 'el-icon-loading',
    background: 'rgba(255, 255, 255, 0.5)'
  })

  !window.require && (window.require = {})
  !window.require.paths && (window.require.paths = {})
  window.require.paths.vs = vs
  console.log(window.require, "window.require")
  loadScript(`${vs}/loader.js`, () => {
    console.log(window.require, "window.require", 222)
    window.require(['vs/editor/editor.main'], () => {
      loading.close()
      monacoEidtor = window.monaco
      cb(monacoEidtor)
    })
  })
}
