import helper from "@/components/form/ui/helper.js";

export default {
        tag: "draggable",
        defaultvalue: [],
        props: {
                component: "el-scrollbar",
                group: "componentsGroup",
                class: "drag-wrapper box",
                style: {
                        "margin-left": "0px",
                        "margin-right": "0px"
                },
                animation: 340,
        },
        slots: {
        },
      
        ctrlBtn: false,
        name: "滚动条",
        __openRules: false,
        tagIcon: 'input',
        __ID: '',

        attrs: {
                'height': helper.input_text('滚动条高度', '100'),
                'max-height': helper.input_text('滚动条最大高度', ''),
                'native': helper.input_boolean('是否使用原生滚动条样式', false),
                'wrap-style': helper.input_text('包裹容器的自定义样式', ''),
                'wrap-class': helper.input_text('包裹容器的自定义类名', ''),
                'view-style': helper.input_text('视图的自定义样式', ''),
                'view-class': helper.input_text('视图的自定义类名', ''),
                'noresize': helper.input_boolean('不响应容器尺寸变化，如果容器尺寸不会发生变化，最好设置它可以优化性能', false),
                'tag': helper.input_text('视图的元素标签', 'div'),
                'always': helper.input_boolean('滚动条总是显示', false),
                'min-size': helper.input_text('滚动条最小尺寸', '20')
        },
        childrens: [


        ],
}