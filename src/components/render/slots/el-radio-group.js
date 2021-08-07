
import { resolveComponent } from 'vue'


export default function (h, conf) {
  const list = []
  conf.__slot__.options.forEach(item => {
  const attrs = { label: item.value }

  if (conf.__config__.optionType === 'button') {
    list.push(h(resolveComponent('el-radio-button'), attrs, item.label))
  } else {
    attrs['border'] = conf.border;
    list.push(h(resolveComponent('el-radio'), attrs, item.label))

  }
})
  return { default: list}
}


