import helper from "@/components/form/ui/helper.js";

export default {
        tag: "el-switch",
        name: "Switch 开关",
        __openRules: false,
        tagIcon: "switch",
        ctrlBtn: true,
        formItem: {
                showLabel: helper.input_boolean("显示 label", true),
                labelWidth: helper.input_number("label 宽", 100),
                label: helper.input_text("label", 'Switch 开关', ),
        },
        attrs: {
                fieldName: helper.input_text("字段名", '字段名'),
                'disabled': helper.input_boolean('是否禁用', false),
                'loading': helper.input_boolean('是否显示加载中', false),
                'validate-event': helper.input_boolean('改变 switch 状态时是否触发表单的校验', true)
        }, slots: {
        },
        props: {},
        childrens: []
}