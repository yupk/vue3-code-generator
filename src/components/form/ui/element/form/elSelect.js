import helper from "@/components/form/ui/helper.js";


const elOption = {
        tag: "el-option",
        name: "eloption",
        __openRules: false,
        tagIcon: "input",
        ctrlBtn: true,
        attrs: {
                fieldName: helper.input_text("字段名", "字段名"),
                'disabled': helper.input_boolean('是否禁用该选项', false)
        },
        slots: {
        },
        props: {},
        childrens: []
}

export default {
        tag: "el-select",
        name: "select选择",
        __openRules: false,
        tagIcon: "select",
        ctrlBtn: true,
        defaultvalue: "",

        __opt__: helper.input_opt("选择项", 'el-option'),

        formItem: {
                showLabel: helper.input_boolean("显示 label", true),
                labelWidth: helper.input_number("label 宽", 100),
                label: helper.input_text("label", 'select选择',),
        },
        attrs: {
                fieldName: helper.input_text("字段名", "字段名"),
                'multiple': helper.input_boolean('是否多选', false),
                'disabled': helper.input_boolean('是否禁用', false),
                'size': helper.input_radio('输入框尺寸', [{ "key": "medium", "value": "medium" }, { "key": "small", "value": "small" }, { "key": "mini", "value": "mini" }], 'large'),
                'clearable': helper.input_boolean('是否可以清空选项', false),
                'collapse-tags': helper.input_boolean('多选时是否将选中值按文字的形式展示', false),
                'filterable': helper.input_boolean('是否可搜索', false),
                'allow-create': helper.input_boolean('是否允许用户创建新条目， 注意此时filterable必须为真。', false),
                'remote': helper.input_boolean('是否为远程搜索', false),
                'loading': helper.input_boolean('是否正在从远程获取数据', false),
                'reserve-keyword': helper.input_boolean('多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词', false),
                'default-first-option': helper.input_boolean('在输入框按下回车，选择第一个匹配项。 需配合 filterable 或 remote 使用', false),
                'popper-append-to-body': helper.input_boolean('是否将弹出框插入至 body 元素。 在弹出框的定位出现问题时，可将该属性设置为 false', true),
                'automatic-dropdown': helper.input_boolean('对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单', false)
        }, slots: {
        },
        props: {},
        childrens: []
}