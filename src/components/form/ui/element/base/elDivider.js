import helper from "@/components/form/ui/helper.js";

export default {
        '__ID': '',
        tag: "el-divider",
        name: "分割线",
        __openRules: false,
        tagIcon: "line",
        __text: helper.input_text("文本内容", "分割线"),
        slots: {

        },
      
        props: {},
        ctrlBtn: true,
        attrs: {
                fieldName: helper.input_text("字段名", "字段名"),
                'direction': helper.input_radio('方向', [{ "key": "horizontal", "value": "horizontal" }, { "key": "vertical", "value": "vertical" }], 'horizontal'),
                'content-position': helper.input_radio('对齐', [{ "key": "left", "value": "left" }, { "key": "right", "value": "right" }, { "key": "center", "value": "center" }], 'center')
        }
}