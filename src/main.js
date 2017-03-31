// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './app';
import routes from './routes';
import storeOption from './store';
import $ from 'jquery';

//外界引入js
//import date from './assets/js/vue.datepicker.js';
import ci from './assets/js/ci.js';
import cityData from './assets/js/City_data.js';
//import cityDataUse from './assets/js/areadata.js';
Vue.use(ci);
Vue.use(cityData);
//Vue.use(cityDataUse);
//Vue.use(date);


Vue.use(Vuex);
Vue.use(VueRouter);

// 创建一个路由对象用于管理页面的路由
const router = new VueRouter({
  mode: 'history',
  routes: routes
});

// 创建一个 store 对象用于管理应用状态
const store = new Vuex.Store(storeOption);

window.__lendApp__ = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});