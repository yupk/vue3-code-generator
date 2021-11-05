import helper from "@/components/form/ui/helper.js";

export default {
        tag: "el-time-picker",
        name: "时间选择器",
        __openRules: false,
        tagIcon: "time",
        ctrlBtn: true,
        formItem: {
                showLabel: helper.input_boolean("显示 label", true),
                labelWidth: helper.input_number("label 宽", 100),
                label: helper.input_text("label", '时间选择器', ),
        },
        attrs: {
                fieldName: helper.input_text("字段名", '字段名'),
                'readonly': helper.input_boolean('完全只读', false),
                'disabled': helper.input_boolean('禁用', false),
                'editable': helper.input_boolean('文本框可输入', true),
                'clearable': helper.input_boolean('是否显示清除按钮', true),
                'is-range': helper.input_boolean('是否为时间范围选择', false),
                'arrow-control': helper.input_boolean('是否使用箭头进行时间选择', false)
        }, slots: {
        },
        props: {},
        childrens: []
}