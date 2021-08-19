import { deepClone } from '@/utils/index'
import { h, resolveComponent } from 'vue'

const componentChild = {}
/**
 * 将./slots中的文件挂载到对象componentChild上
 * 文件名为key，对应JSON配置中的__config__.tag
 * 文件内容为value，解析JSON配置中的__slot__
 */

const modules = import.meta.globEager('./slots/*.js');


const keys = Object.keys(modules)
keys.forEach(key => {
  const tag = key.replace(/^\.\/(.*)\.\w+$/, '$1').replace('slots/', '')
  console.log(tag);
  const value = modules[key];
  componentChild[tag] = value
})


// const slotsFiles = require.context('./slots', false, /\.js$/)
// const keys = slotsFiles.keys() || []
// keys.forEach(key => {
//   const tag = key.replace(/^\.\/(.*)\.\w+$/, '$1')
//   const value = slotsFiles(key).default
//   componentChild[tag] = value
// })

function vModel (dataObject, defaultValue) {
  dataObject.value = defaultValue


}

function mountSlotFiles (h, confClone) {
  let children
  const childObjs = componentChild[confClone.__config__.tag];

  if (childObjs) {
    Object.keys(childObjs).forEach(key => {
      const childFunc = childObjs[key];
      children = childFunc(h, confClone);
    })
  }

  return children;
}

function emitEvents (confClone) {
  ['on', 'nativeOn'].forEach(attr => {
    const eventKeyList = Object.keys(confClone[attr] || {})
    eventKeyList.forEach(key => {
      const val = confClone[attr][key]
      if (typeof val === 'string') {
        confClone[attr][key] = event => this.$emit(val, event)
      }
    })
  })
}

function buildDataObject (confClone, dataObject) {


  Object.keys(confClone).forEach(key => {
    const val = confClone[key]
    if (key === '__vModel__') {

      // vModel.call(this, dataObject, confClone.__config__.defaultValue)
    } else if (dataObject[key] !== undefined) {
      if (dataObject[key] === null
        || dataObject[key] instanceof RegExp
        || ['boolean', 'string', 'number', 'function'].includes(typeof dataObject[key])) {
        dataObject[key] = val
      } else if (Array.isArray(dataObject[key])) {
        dataObject[key] = [...dataObject[key], ...val]
      } else {
        dataObject[key] = { ...dataObject[key], ...val }
      }
    } else {
      dataObject.attrs[key] = val
    }
  })

  // 清理属性
  clearAttrs(dataObject)
  console.log(dataObject, confClone)
}

function clearAttrs (dataObject) {
  delete dataObject.attrs.__config__
  delete dataObject.attrs.__slot__
  delete dataObject.attrs.__methods__

}

function makeDataObject (dataObject, confClone) {


  Object.keys(confClone).forEach(key => {
    console.log("---", key, confClone[key])

    if (key === '__vModel__') {
      // vModel.call(this, dataObject, confClone.__config__.defaultValue)
      // dataObject["v-model"] = confClone.__config__.defaultValue;

      dataObject["model-value"] = this.conf.__config__.defaultValue;
      dataObject['onUpdate:modelValue'] = value => {
        this.conf.__config__.defaultValue = value
      }


    } else if (key.substr(0, 2) !== '__') {
      let val = confClone[key];

      dataObject[key] = val;


    }



  });
  // dataObject['value'] = confClone.__config__.defaultValue;


  // dataObject['__slot__'] = confClone.__slot__;
  // console.log(dataObject);
  // 深入数据对象：
  // https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
  // return {
  //   class: [],
  //   style: []
  //   // attrs: {},
  //   // props: {},
  //   // domProps: {},
  //   // nativeOn: {},
  //   // on: {},
  //   // style: {},
  //   // directives: [],
  //   // scopedSlots: {},
  //   // slot: null,
  //   // key: null,
  //   // ref: null,
  //   // refInFor: true
  // }
}

export default {
  props: {
    conf: {
      type: Object,
      required: true
    }
  },
  render (_h) {
    // const dataObject = makeDataObject()
    const confClone = deepClone(this.conf)


    // 如果slots文件夹存在与当前tag同名的文件，则执行文件中的代码
    const children = mountSlotFiles.call(this, h, confClone)

    // 将字符串类型的事件，发送为消息
    emitEvents.call(this, confClone)

    const dataObject = {

    }

    makeDataObject.call(this, dataObject, confClone);

    console.log(dataObject, "--------++dataObject+++----------", children, componentChild)

    // 将json表单配置转化为vue render可以识别的 “数据对象（dataObject）”
    // buildDataObject.call(this, confClone, dataObject)
    // console.log(dataObject)



    return h(resolveComponent(this.conf.__config__.tag), dataObject,
      children
    )
  }
}
