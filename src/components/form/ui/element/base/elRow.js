import helper from "@/components/form/ui/helper.js";

const elCol = {
    tag: "draggable",
    name: "栅格",
    __openRules: false,
    tagIcon: 'row',
    __ID: '',

    defaultvalue: [],
    attrs: {
        span: helper.input_range("列数", 1, 24, 8),
        offset: helper.input_range("左侧间隔", 0, 24, 0),
        push: helper.input_range("右移动", 0, 24, 0),
        pull: helper.input_range("左移动", 0, 24, 0),
    },
    props: {
        style: {
            "min-height": "60px"
        },
        component: "el-col",
        group: "componentsGroup",
        class: "drag-wrapper box",
        animation: 340,
    },
    childrens: [
    ],
    ctrlBtn: true,
    slots: {
    }
}

export default {
    tag: "el-row",
    defaultvalue: [],
    props: {
        component: "el-row",
        group: "componentsGroup",
        class: "drag-wrapper box",
        style: {
            "margin-left": "0px",
            "margin-right": "0px"
        },
        animation: 340,
    },
    ctrlBtn: true,
    name: "布局组件",
    __openRules: false,
    tagIcon: 'input',
    __ID: '',
    attrs: {
        gutter: helper.input_range("栅格间隔", 1, 24, 24),
        justify: helper.input_radio("justify", [{
            key: 'start',
            value: 'start'
        },
        {
            key: 'end',
            value: 'end'
        },
        {
            key: 'center',
            value: 'center'
        },
        {
            key: 'space-around',
            value: 'space-around'
        },
        {
            key: 'space-between',
            value: 'space-between'
        }
        ], "start"),

        align: helper.input_radio("align", [{
            key: 'top',
            value: 'top'
        }, {
            key: 'middle',
            value: 'middle'
        }, {
            key: 'bottom',
            value: 'bottom'
        }]),
    },

    actions: {
        "增加列": function (current) {
            current.childrens.push(helper.cloneItem(elCol))
        }
    },

    childrens: [
        helper.cloneItem(elCol)
    ],
    slots: {}
}