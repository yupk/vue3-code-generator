import { resolveComponent } from 'vue'


export default function (h, conf) {
  const list = []
  conf.__slot__.options.forEach(item => {

    const props = { label: item.label, border: conf.border }
    if (conf.__config__.optionType === 'button') {
      list.push(h(resolveComponent("el-checkbox-button"), props, item.label));
    } else {

      list.push(h(resolveComponent("el-checkbox"), props, item.label));

    }
  })

  return { default: list }
}

