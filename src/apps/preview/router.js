
import { createRouter, createWebHashHistory } from "vue-router";
const home = () => import('./test.vue');


const pages = import.meta.globEager('./pages/*.vue');

console.log(pages)
// const login = () => import('./pages/login.vue');
// const AddRule = () => import('./pages/AddRule.vue');
const routes = [

    {
        path: '/',
        component: home,
    },]
for (let path in pages){

    console.log(path,pages[path])

    routes.push({ path: path.substr(1), component: pages[path].default})
}
// const routes = [

//     {
//         path: '/',
//         component: home,
//     },
    // {
    //     path: '/home',
    //     name: 'home',
    //     component: home,
    //     meta: {
    //         name: '首页',
    //         title: '首页- 后台系统',
    //         needLogin: true, //需要登录
    //     }


    // },

    // {
    //     path: '/login',
    //     name: 'login',
    //     component: login,
    //     meta: {
    //         name: '首页',
    //         title: '首页- 后台系统',
    //         needLogin: false, //需要登录
    //     },
    //     props: route => { return route.query }
    // },

    // {
    //     path: '/addRule',
    //     name: 'AddRule',
    //     component: AddRule,
    //     meta: {
    //         name: '新建方案',
    //         title: '新建方案',
    //         needLogin: true, //需要登录
    //     },

    // },



// ];


const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router
