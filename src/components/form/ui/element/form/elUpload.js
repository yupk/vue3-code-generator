import helper from "@/components/form/ui/helper.js";
import elButton from "@/components/form/ui/element/base/elButton";
export default {
        '__ID': '',
        tag: "upload-warp",
        name: "上传文件",
        __openRules: false,
        tagIcon: "input",
        ctrlBtn: true,
        defaultvalue: "",
        formItem: {
                showLabel: helper.input_boolean("显示 label", true),
                labelWidth: helper.input_number("label 宽", 100),
                label: helper.input_text("label", '上传文件',),
        },
        attrs: {
                fieldName: helper.input_text("字段名", "字段名"),

                'uploadType': helper.input_radio('上传类型', [{ "value": "图片", "key": "image" }, { "value": "文件", "key": "file" }], 'image'),

                'action': helper.input_text('上传接口', 'https://www.vkandian.cn/index.php/index/upload'),
                'multiple': helper.input_boolean('多文件上传', ''),
                'name': helper.input_text('文件字段名', 'file'),
                'tip': helper.input_text('上传提示', ''),

                'show-file-list': helper.input_boolean('是否显示文件列表', true),
                'drag': helper.input_boolean('拖拽上传', false),
                'accept': helper.input_text('文件类型', ''),
                'thumbnail-mode': helper.input_boolean('显示缩略图', false),
                'list-type': helper.input_radio('列表模式', [{ "key": "text", "value": "text" }, { "key": "picture", "value": "picture" }, { "key": "picture-card", "value": "picture-card" }], 'text'),
                'auto-upload': helper.input_boolean('自动上传', true),
                'disabled': helper.input_boolean('禁用', false),
                'limit': helper.input_number('最多可上传文件', 1)
        },
        slots: {
        },
        props: {},
        childrens: []







}