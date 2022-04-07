import {
    isObjectObject
} from "@/utils/func.js";
const slotParser = {

    default(conf) {
        let childrens = []
        for (let db of conf.opts) {
            let attr = {}
            let slots = {}
            for (let k in conf.__child.keyValue) {
                if ('__default__' == conf.__child.keyValue[k]) {
                    slots['default'] = db[k];
                } else {
                    attr[conf.__child.keyValue[k]] = db[k];
                }

            }
            let item = {
                tag: conf.__child.tag,
                attrs: attr,
                slots: slots

            }
            childrens.push(item)
        }
        return childrens

    }

}
export const eleRenderFormat = function (conf, eleName) {

    if (!isObjectObject(conf)) {
        return null
    }


    const types = {
        input_text: {
            childrens: [],
            tag: "el-input",
            attrs: { type: "text" },
            formItem: {},
            slots: {}
        },

        input_icon: {
            childrens: [],
            tag: "input-icon",
            attrs: {},
            formItem: {},
            slots: {}
        },

        input_number: {
            childrens: [],
            tag: "el-input-number",
            attrs: { type: "number" },
            formItem: {},
            slots: {}
        },
        input_range: {
            childrens: [],
            tag: "el-slider",
            attrs: { type: "number" },
            formItem: {},
            slots: {}
        },
        input_radio: {
            childrens: [],
            tag: "el-radio-group",
            attrs: {},
            formItem: {},
            slots: {}

        },
        input_select: {
            childrens: [],
            tag: "el-select",
            attrs: {},
            formItem: {},
            slots: {}
        },
        input_opt: {
            childrens: [],
            tag: "option-input",
            attrs: {},
            slots: {}
        },

        input_boolean: {
            childrens: [],
            tag: "el-switch", attrs: { "active-value": true, "inactive-value": false }
            , formItem: {}, slots: {}
        },
    }

    let t = conf.input_type
    if (conf.input_type in types == false) {
        t = 'input_text'
    }
    let ini = types[t];
    for (let k in conf) {
        if (['__val__', 'input_type', 'label', 'opts'].includes(k) == false) {
            ini['attrs'][k] = conf[k];
        }
    }
    if ('__child' in conf) {
        ini.childrens = slotParser.default(conf);
    } else if (Object.keys(ini.slots).length === 0) {

        delete ini.slots
    }

    ini['formItem'] = { showLabel: true, label: conf.label, labelWidth: conf.labelWidth ? conf.labelWidth : undefined }
    ini['defaultvalue'] = conf['__val__']
    ini['eleName'] = eleName;
    //console.log(ini)
    return ini

}


export const eleRenderSetFormat = function (conf) {
    const eles = [];
    eles.push({ tag: "el-divider", slots: { default: "form item" } });
    for (let f in conf.formItem) {
        let item = conf.formItem[f];
        eles.push(eleRenderFormat(item, f))
    }
    eles.push({ tag: "el-divider", slots: { default: "属性" } });

    if ('__text' in conf) {

        eles.push(eleRenderFormat(conf.__text, '__text'))
    }

    for (let f in conf.attrs) {
        let item = conf.attrs[f];
        eles.push(eleRenderFormat(item, f))
    }
    eles.push(eleRenderFormat(conf.__opt__, '__opt__'))
    return eles;

}