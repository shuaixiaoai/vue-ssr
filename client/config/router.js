import Router from 'vue-router';

import routes from './routes';

export default () => {                                  // 避免服务端渲染内存溢出
    return new Router({
        routes,
        mode: 'history',
        // base: '/base/',
        // linkActiveClass: 'active-link',                            // 写全局的router样式  匹配
        // linkExactActiveClass: 'exact-active-link',                 // 完全匹配的样式
        // scrollBehavior (to, from, savedPosition) {                 // 状态保存
        //     if (savedPosition) {
        //         return savedPosition;
        //     } else {
        //         return { x: 0, y: 0};
        //     }
        // },
        // parseQuery (query) {},
        // stringifyQuery (obj) {},
        fallback: true                                                  // 浏览器是否支持history
    })
};