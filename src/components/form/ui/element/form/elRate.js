import helper from "@/components/form/ui/helper.js";

export default {
        tag: "el-rate",
        name: "Rate 评分",
        __openRules: true,
        tagIcon: "rate",
        defaultvalue: "",
        ctrlBtn: true,
        formItem: {
                showLabel: helper.input_boolean("显示 label", true),
                labelWidth: helper.input_number("label 宽", 100),
                label: helper.input_text("label", 'Rate 评分', ),
        },
        attrs: {
                fieldName: helper.input_text("字段名", '字段名'),
                'disabled': helper.input_boolean('是否为只读', false),
                'allow-half': helper.input_boolean('是否允许半选', false),
                'show-text': helper.input_boolean('是否显示辅助文字，若为真，则会从 texts 数组中选取当前分数对应的文字内容', false),
                'show-score': helper.input_boolean('是否显示当前分数， show-score 和 show-text 不能同时为真', false)
        },
        slots: {
        },
        props: {},
        childrens: []
}