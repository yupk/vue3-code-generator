import {
    reactive,
    ref,
    watch
} from "vue";

import {
    isObjectObject,
    isObjectArray,
    isStr,
    isNumber,
    isObjectUnde
} from "@/utils/func.js";


import {
    Api
} from "@/utils/api";

const optParseHandles = {
    default: function (_c, data) {


        for (let item of data) {
            let son = {}
            son.tag = _c.__opt__.tag
            son.attrs = {
                "label": item.value
            }
            son.slots = {
                default: item.key
            }
            _c.childrens.value.push(son);

        }

    },
    "el-option": function (_c, data) {

        for (let item of data) {
            let son = {}
            son.tag = _c.__opt__.tag
            son.attrs = {
                value: item.value,
                label: item.key
            }

            _c.childrens.value.push(son);

        }

    }
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
const _clone = function (obj) {
    if (isNumber(obj) || isStr(obj) || isObjectUnde(obj)) {
        return obj;
    }

    const _c = {}
    for (let a in obj) {
        if (isObjectObject(obj[a])) {
            if ('__val__' in obj[a]) {
                _c[a] = obj[a]['__val__'];
            } else {
                if (['name', 'tagIcon', '__formId', 'rule'].includes(a) == false) {
                    _c[a] = _clone(obj[a]);
                }
            }
        } else if (isObjectArray(obj[a])) {
            _c[a] = obj[a].map((x) => {
                return _clone(x);
            })
        } else {
            if (['name', 'tagIcon', '__formId', 'rule'].includes(a) == false) {
                _c[a] = obj[a];
            }
        }
    }

    if (Object.keys(obj).indexOf('events') > -1 && Object.keys(obj.events)) {
        _c.events = obj.events
    }

    if ('slots' in _c) {
        for (let name in _c.slots) {
            if (!_c.slots[name]) {
                delete _c.slots[name]
            }
        }
    }

    if ('props' in _c) {
        _c.attrs = Object.assign(_c.attrs, _c.props);
        delete _c.props;
    }

    if (!isObjectArray(_c.childrens)) {

        ///api 接口为异步模式，此处定义为响应式
        _c.childrens = ref([]);
    } else {
        _c.childrens = ref(_c.childrens);
    }

    if ('__text' in _c) {
        _c['slots']['default'] = _c.__text;
    }

    if ('__opt__' in _c) {
        let data = _c.__opt__.type == 'static' ? _c.__opt__.staticData : _c.__opt__.dynamicData;
        let parseFunc = _c.__opt__.tag in optParseHandles ? optParseHandles[_c.__opt__.tag] : optParseHandles['default'];

        if (_c.__opt__.type == 'static') {

            parseFunc(_c, data);

        } else {

            Api.Get(data.url).then((res) => {
                parseFunc(_c, res.data);
            });


        }
    }

    console.log(_c, "--c")
    return _c;
}

export function initRender(settings) {
    const conf = reactive({
        formConf: settings.formConf,
        current: settings.current,
        drawingList: settings.drawingList.map((x) => {
            return _clone(x);
        })
    });

    watch(settings, () => {
        conf.drawingList = settings.drawingList.map((x) => {
            return _clone(x);
        });

    })

    return conf
}