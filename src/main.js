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
//import ci from './assets/js/ci.js';//临时
import cityData from './assets/js/City_data.js';
import wdData from './assets/js/wd_data.js';
import beijing from './assets/js/beijing.js';//临时
import map from './assets/js/drawmap.js';//临时
//import cityDataUse from './assets/js/areadata.js';
//Vue.use(ci);//临时
Vue.use(wdData);
Vue.use(cityData);
Vue.use(beijing);//临时
Vue.use(map);
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