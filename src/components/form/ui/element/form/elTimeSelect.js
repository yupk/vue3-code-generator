import helper from "@/components/form/ui/helper.js";

export default {
        tag: "el-time-select",
        name: "时间选择",
        __openRules: false,
        tagIcon: "time-range",
        defaultvalue: "",
        ctrlBtn: true,
        formItem: {
                showLabel: helper.input_boolean("显示 label", true),
                labelWidth: helper.input_number("label 宽", 100),
                label: helper.input_text("label", 'TimeSelect 时间选择',),
        },
        attrs: {
                fieldName: helper.input_text("字段名", "字段名"),
                'disabled': helper.input_boolean('禁用', false),
                'editable': helper.input_boolean('文本框可输入', true),
                'clearable': helper.input_boolean('是否显示清除按钮', true),
                'size': helper.input_radio('输入框尺寸', [{
                        "key": "medium",
                        "value": "medium"
                }, {
                        "key": "small",
                        "value": "small"
                }, {
                        "key": "mini",
                        "value": "mini"
                }], '')
        }, slots: {
        },
        props: {},
        childrens: []
}