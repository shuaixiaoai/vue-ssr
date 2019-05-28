import Vue from 'vue'
import Vuex from 'vuex'
import App from './app.vue'
import VueRouter from 'vue-router';
import createRouter from './config/router'
import createStore from './store/index'
import './assets/styles/global.css'

Vue.use(VueRouter);
Vue.use(Vuex)

const router = createRouter();
const store = createStore();

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')