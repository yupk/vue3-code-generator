import {
    deepClone,
    isObjectObject,
    isObjectArray,
    isStr,
    isNumber,
    isObjectUnde
} from "@/utils/func.js";

import {
    js_beautify,

    html_beautify
} from 'js-beautify'

class Set {

    constructor() {
        this.__data = [];

    }

    add(s) {
        if (this.__data.indexOf(s) > -1) {
            return
        }
        this.__data.push(s);
    }

    data() {

        return this.__data;
    }
}

class Scripts {
    constructor(rules) {
        this.importFuncVue = new Set();
        this.importString = new Set();
        this.UIData = new Set();
        this.vars = new Set();
        this.formData = new Set();
        this.APIData = new Set();
        this.ActionData = new Set();
        this.returnData = new Set();
        this.rules = false;

    }

    definedVar(name,val){
        this.vars.add(`const ${name}=ref(${val})`)
    }
    addRules(rules) {
        this.rules = rules;
    }

    addUiDataFromApi(url, medth, name) {
        this.UIData.add(name);
        this.importString.add('import {Api} from "@/api"; ')
        this.APIData.add(`
        Api.${medth}("${url}").then(res=>{
            UIData.${name}=res.data.data;
        });
        `);

    }

    addPostAction(apiUrl) {

        this.importString.add('import {Api} from "@/api"; ');
        this.ActionData.add(`
        const postData=function(formEl){
        formEl.validate((valid) => {
            if(valid===false){
                return false;
            }
            Api.Post("${apiUrl}",formData).then(res=>{
              Elmessage.sucess("操作成功!");
            });
            })
        }
        `);
        this.returnData.add("postData");

    }


    renderImport(lines) {
        let vueFunc = this.importFuncVue.data().join(",");
        lines.push(`import {${vueFunc}} from "vue";`);
        return lines.concat(this.importString.data());
    }

    red(lines) {
        this.importFuncVue.add('reactive');
        let formData = {};
        this.formData.data().forEach(element => {
            console.log(element)
            formData[element[0]] = element[1];
        });
        lines.push(`const formData=reactive(${JSON.stringify(formData)});`);
        this.returnData.add("formData");
        return lines;
    }

    renderUIData(lines) {
        this.importFuncVue.add('reactive');
        let uiData = {};
        this.UIData.data().forEach(element => {
            uiData[element] = '';
        });
        lines.push(`const UIData=reactive(${JSON.stringify(uiData)});`);
        this.returnData.add("UIData");
        return lines;
    }

    renderApiScript(lines) {

        return lines.concat(this.APIData.data().join("\n"));
    }
    renderVarsData(lines) {
        return lines.concat(this.vars.data().join("\n"));
    }
    renderActionData(lines) {
        return lines.concat(this.ActionData.data().join("\n"));
    }

    renderFormRules(lines) {

        if (this.rules === false) {

            return lines;
        }
        for (let p in this.rules) {

            this.rules[p] = Object.values(this.rules[p])
        }
        this.returnData.add("rules");
        let ruleStr = JSON.stringify(this.rules, (k, v) => {
            if (k === 'pattern') {
                return `--${v}--`;
            }
            return v;
        });

        ruleStr = ruleStr.replace(/\-\-"/g, '/').replace(/"\-\-/g, '/')
        lines.push(`const rules=${ruleStr}`);
        return lines;
    }

    renderSetup(lines) {
        lines = this.red(lines);
        lines = this.renderUIData(lines);
        lines = this.renderApiScript(lines);
        lines = this.renderFormRules(lines);
        lines = this.renderVarsData(lines);
        lines = this.renderActionData(lines);
        return lines;
    }

    renderEnd(lines) {
        return lines;
    }

    render() {
        this.importFuncVue.add('ref');
        let lines = [""];
        lines = this.renderSetup(lines);
        lines = this.renderEnd(lines);
        lines[0] = this.renderImport([]).join("\n");
        return lines.join("\n")
    }


}

const keyName = function (k) {
    let r = new RegExp('([A-Z]{1,1})');
    return k.replace(r, '-$1').toLowerCase();
}

const toVal = function (obj) {
    const _c = {}
    for (let a in obj) {
        if (typeof obj[a] == 'object') {
            if ('__val__' in obj[a]) {
                _c[a] = obj[a]['__val__'];
            } else {
                _c[a] = toVal(obj[a]);
            }
        } else {
            _c[a] = obj[a];
        }
    }

    return _c;

}


const isBoolean = function (s) {
    if (typeof s == 'boolean') {
        return true;
    }
    return ['true', "false"].indexOf(s) > -1;
}
const attrFuns = {
    FormData: "formData",
    default(k, v) {
        if (k.substring(0, 2) === '__') {
            return "";
        }
        if (v) {
            if (isBoolean(v)) {
                console.log(k, '=----')
                return `:${keyName(k)}="${v}"`
            }
            return `${keyName(k)}="${v}"`
        }
        return "";
    },
    __formRef(v) {

        // attrFuns.FormData = v;
        return `ref="${v}"`;

    },
    __formModel(v) {
        attrFuns.FormData = v;
        return `:model="${v}"`;
    },
    fieldName(v) {
        return `v-model="${attrFuns.FormData}.${v}"`;
    },
    style(css) {
        let lines = [];
        for (let name in css) {
            lines.push(`${keyName(name)}:${css[name]}`);
        }
        return `style="${lines.join(";")}"`
    }
}
const attrFormat = function (attrs, props) {
    attrs = Object.assign({}, attrs, props);
    let attr = [];
    for (let k in attrs) {

        if (k in attrFuns) {
            attr.push(attrFuns[k](attrs[k]));
        } else {
            attr.push(attrFuns.default(k, attrs[k]));
        }

    }

    return attr.join(" ");

}

const slotFormat = function (slots) {

    let eles = [];
    for (let name in slots) {
        if (slots[name]) {
            eles.push(`<template slot="${name}">${slots[name]}</template>`)
        }

    }

    return eles.join("");
}

const childrenFormat = function (childrens, js) {

    if (!childrens) {
        return ''
    }
    childrens = Object.values(childrens)
    let sons = childrens.map(function (ele) {

        return toHtml(ele, js);
    })

    return sons.join(" ");
}

const optParseHandles = {

    dynamic: {
        default: function (name, opts, data) {
            let sons = [];

            let son = {
                props: {}
            }
            son.tag = opts.tag
            son.attrs = {
                ":label": "item.value",
                "v-for": `item in UIData.${name}`,
                ":key": "item.key"
            }
            son.slots = {
                default: "{{item.key}}"
            }
            sons.push(son);

            return sons;

        },
        "el-option": function (name, opts, data) {
            let sons = [];

            let son = {
                props: {}
            }
            son.tag = opts.tag
            son.attrs = {
                ":value": "item.value",
                ":label": "item.key",
                "v-for": `item in UIData.${name}`,
                ":key": "item.key"
            }

            sons.push(son);


            return sons;

        }
    },

    static: {
        default: function (name, opts, data) {
            let sons = [];
            for (let item of data) {
                let son = {
                    props: {}
                }
                son.tag = opts.tag;
                son.attrs = {
                    "label": item.value
                }
                son.slots = {
                    default: item.key
                }
                sons.push(son);
            }
            return sons;

        },
        "el-option": function (name, opts, data) {
            let sons = [];
            for (let item of data) {
                let son = {
                    props: {}
                }
                son.tag = opts.tag
                son.attrs = {
                    value: item.value,
                    label: item.key
                }

                sons.push(son);

            }
            return sons;

        }
    },

}

const opt = function (name, opts, js) {


    let data = opts.type === 'static' ? opts.staticData : opts.dynamicData;
    let parseFunc = opts.tag in optParseHandles[opts.type] ? optParseHandles[opts.type][opts.tag] : optParseHandles[opts.type]['default'];

    if (opts.type === "dynamic") {

        js.addUiDataFromApi(data.url, data.medth, name);


    }

    return parseFunc(name, opts, data)


}

const renderBtns = function (ele, js) {
    if (('__formBtns' in ele.attrs) && ele.attrs.__formBtns) {

        js.addPostAction(ele.api);
        return ` 
        <el-form-item>
        <el-button type="primary" @click="postData(${ele.attrs.__formRef})">立即创建</el-button>
        <el-button>取消</el-button>
        </el-form-item>`;

    }
}
const toHtml = function (ele, js) {
    if (ele.attrs.fieldName) {
        js.formData.add([ele.attrs.fieldName, ele.defaultvalue]);
    }


    if (ele.__rules) {
        js.addRules(deepClone(ele.__rules))
        ele.attrs[":rules"] = "rules";
    }
    let tagName = 'component' in ele.props ? ele.props.component : ele.tag;

    if ('__text' in ele) {
        ele['slots']['default'] = ele.__text;
    }

    if ('__opt__' in ele) {

        if (isObjectArray(ele['childrens']) === false) {
            ele['childrens'] = [];
        }
        let ops = opt(ele.attrs.fieldName, ele.__opt__, js);

        ele['childrens'] = ele['childrens'].concat(ops);

    }


    let node = ["<", tagName, " ", attrFormat(ele.attrs, ele.props), " ", ">\n", childrenFormat(ele.childrens, js), slotFormat(ele.slots), renderBtns(ele, js), "</", tagName, ">\n"]
    if (ele.formItem) {
        node = ["<", "el-form-item", " ", attrFormat(ele.formItem, {
            prop: ele.attrs.fieldName
        }), " ", ">", node.join(""), "</", "el-form-item", ">"];

    }

    return node.join("");

}
const generate = function (settings) {
    settings = toVal(settings);
    let element = settings.formConf;
    console.log(element);
    element.childrens = settings.drawingList;

    const js = new Scripts();
    let html = toHtml(element, js);

    js.definedVar(element.attrs.__formRef,'null');

    return ["<template>", html_beautify(html), '</template>', "<script setup>", js_beautify(js.render()), "</script>"].join("\n")

}
export {
    generate
}