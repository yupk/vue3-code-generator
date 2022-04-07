import helper from "@/components/form/ui/helper.js";

export default {
        tag: "el-slider",
        name: "Slider 滑块",
        __openRules: false,
        tagIcon: "slider",
        ctrlBtn: true,
        formItem: {
                showLabel: helper.input_boolean("显示 label", true),
                labelWidth: helper.input_number("label 宽", 100),
                label: helper.input_text("label", "Slider 滑块"),
        },
        attrs: {
                fieldName: helper.input_text("字段名", "字段名"),
                disabled: helper.input_boolean("是否禁用", false),
                "show-input": helper.input_boolean(
                        "是否显示输入框，仅在非范围选择时有效",
                        false
                ),
                "show-input-controls": helper.input_boolean(
                        "在显示输入框的情况下，是否显示输入框的控制按钮",
                        true
                ),
                "show-stops": helper.input_boolean("是否显示间断点", false),
                "show-tooltip": helper.input_boolean("是否显示 tooltip", true),
                range: helper.input_boolean("是否为范围选择", false),
                vertical: helper.input_boolean("是否竖向模式", false),
        },
        slots: {},
        props: {},
        childrens: [],
};
