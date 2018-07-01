// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router/index';
// import VueRouter from 'vue-router';
import goods from './components/goods/goods';
// Vue.use(VueRouter);

import './stylus/index.styl';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  linkActiveClass: 'active'
});

//vue1.0 的用法
// let app = Vue.extend(App);
//
// let router = new VueRouter();
//
// router.map({
//   '/goods':{
//     component: goods
//   }
// });
//
// router.start(app, '#app');
