export default function (h, conf, key) {
  return { default: conf.__slot__[key] }
}

