import helper from "@/components/form/ui/helper.js";

export default {
    tag: "el-color-picker",
    name: "颜色拾取",
    __openRules: false,
    tagIcon: "color",
    ctrlBtn: true,
    defaultvalue:"#000000",
    formItem: {
        showLabel: helper.input_boolean("显示 label", true),
        labelWidth: helper.input_number("label 宽", 100),
        label: helper.input_text("label", '颜色拾取',),
    },
    attrs: {
        fieldName: helper.input_text("字段名", '字段名'),
        'disabled': helper.input_boolean('是否禁用', false),
        'size': helper.input_radio('尺寸', [{ "key": "medium", "value": "medium" }, { "key": "small", "value": "small" }, { "key": "mini", "value": "mini" }], ''),
        'show-alpha': helper.input_boolean('是否支持透明度选择', false),
        'color-format': helper.input_radio('写入 v-model 的颜色的格式', [{ "key": "hsl", "value": "hsl" }, { "key": "hsv", "value": "hsv" }, { "key": "hex", "value": "hex" }, { "key": "rgb", "value": "rgb" }], 'rgb')
    },
    slots: {
    },
    props: {},
    childrens:[]
}