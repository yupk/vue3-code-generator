export default function (h, conf, key) {

  const slot = {}

  if ("__slot__" in conf) {


    if ("append" in conf.__slot__ && conf.__slot__.append) {
      slot['append'] = conf.__slot__.append
    }

    if ("prepend" in conf.__slot__ && conf.__slot__.prepend) {
      slot['prepend'] = conf.__slot__.prepend
    }
  }
  return slot;

}

