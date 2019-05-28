// 服务端渲染都要使用心得啊app对象， 所以每次都要创建新的app
import Vue from 'vue';
// import VueRouter from 'vue-router';
// import Vuex from 'vuex';

import App from './app.vue';
// import createStore from './store/index';
import createRouter from './config/router.js';

// Vue.use(VueRouter);
// Vue.use(Vuex);

// import './assets/styles/global.less'

export default () => {
    const router = createRouter();
    // const store = createStore();

    const app = new Vue({
        render: h => h(App)
    })
    return { app, router };
}