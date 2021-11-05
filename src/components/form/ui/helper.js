import {
    randFieldId,
    deepClone
} from "@/utils/func.js";

const cloneItem = function (item) {
    const newitem = deepClone(item);
    newitem.__ID = randFieldId()
    return newitem;
}
const input_text = function (name, val) {

    return {
        __val__: val,
        input_type: "input_text",
        label: name
    }

}

const input_slot_text = function (name, val) {
    let ini = input_text(name, val);
    ini.tag = "text";
    return ini;
}

const input_number = function (name, val) {

    return {
        __val__: val,
        input_type: "input_number",
        label: name
    }

}

const input_boolean = function (name, val) {

    return {
        __val__: val,
        input_type: "input_boolean",
        label: name
    }

}


const input_icon = function (name, val) {

    return {
        __val__: val,
        input_type: "input_icon",
        label: name
    }

}


const input_range = function (label, min, max, val) {

    return {
        __val__: val,
        input_type: "input_range",
        label,
        min,
        max
    }

}


export const input_radio = function (label, opts, val) {
    const __child = {
        tag: "el-radio-button",
        keyValue: {
            "key": "label",
            "value": "__default__"
        }
    }

    return {
        __val__: val,
        input_type: "input_radio",
        label,
        opts,
        __child
    }

}
const input_select = function (label, opts, val) {
    const __child = {
        tag: "el-option",
        keyValue: {
            "key": "value",
            "value": "label"
        }
    }


    return {
        __val__: val,
        input_type: "input_select",
        label,
        opts,
        __child
    }

}

const optValue = function (tag) {

    return {
        type: 'static',
        tag: tag,
        staticData: [{
            key: "选项一",
            value: 1
        }, {
            key: "选项二",
            value: 2
        }],
        dynamicData: {
            url: "http://",
            medth: "post",
            keyName: "keyName",
            valueName: "valueName",
        }
    }

}
const input_opt = function (label, tag) {

    return {
        __val__: optValue(tag),
        input_type: "input_opt",
        label

    }
}

export default {
    input_text, input_icon, input_boolean, input_number, input_opt, input_radio, input_range,
    input_select, input_slot_text, cloneItem, optValue
}