import axios from 'axios';


axios.defaults.timeout = 10000; //响应时间
import {
    ElMessage
} from 'element-plus';

axios.defaults.baseURL = ''; //配置接口地址
// 请求拦截器（在发送请求之前做些什么）
axios.interceptors.request.use(function (config) {
    let token = localStorage.getItem('token');
    if (token) {
        config.headers['security-hash'] = token;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    ElMessage.error('请求错误，请重试');
    return Promise.reject(error);
});


export class Api {
    static Callback(res, resolve) {
        if (res.data.code !== 0) {
            ElMessage.error(res.data.data.msg);
        } else {
            resolve(res.data);
        }
    }

    static Get(url, param) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                    params: param
                })
                .then(res => {
                    Api.Callback(res, resolve)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    static Post(url, params, config) {
        return new Promise((resolve, reject) => {
            axios.post(url, params, config)
                .then(res => {
                    Api.Callback(res, resolve);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

}