 
import { resolveComponent } from 'vue'


export default function (h, conf) {
  const list = []
  conf.__slot__.options.forEach(item => {



    const props = { label: item.label, value: item.value ,disabled:item.disabled}
 

      list.push(h(resolveComponent("el-option"), props, item.label));

  
  })

  return { default: list }
}
