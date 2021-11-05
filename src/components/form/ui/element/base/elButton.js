import helper from "@/components/form/ui/helper.js";

export default {
        '__ID': '',
        tag: "el-button",
        name: "按钮",
        __openRules: false,
        tagIcon: "button",
        ctrlBtn: true,
        __text: helper.input_text("按钮文本", "提交"),
        slots: {
        },
        props:{},
        attrs: {
                fieldName: helper.input_text("字段名", "字段名"),
                'size': helper.input_radio('尺寸', [{
                        "key": "medium",
                        "value": "medium"
                }, {
                        "key": "small",
                        "value": "small"
                }, {
                        "key": "mini",
                        "value": "mini"
                }], ''),
                'type': helper.input_radio('类型', [{
                        "key": "primary",
                        "value": "primary"
                }, {
                        "key": "success",
                        "value": "success"
                }, {
                        "key": "warning",
                        "value": "warning"
                }, {
                        "key": "danger",
                        "value": "danger"
                }, {
                        "key": "info",
                        "value": "info"
                }, {
                        "key": "text",
                        "value": "text"
                }], ''),
                'plain': helper.input_boolean('是否朴素按钮', false),
                'round': helper.input_boolean('是否圆角按钮', false),
                'circle': helper.input_boolean('是否圆形按钮', false),
                'loading': helper.input_boolean('是否加载中状态', false),
                'disabled': helper.input_boolean('是否禁用状态', false),
                'autofocus': helper.input_boolean('是否默认聚焦', false)
        }
}