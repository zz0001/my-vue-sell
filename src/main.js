// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router/index';
import VueResource from 'vue-resource';
import axios from 'axios';//引入文件

import './common/stylus/index.styl';

Vue.config.productionTip = false;

Vue.use(VueResource);
Vue.prototype.$ajax = axios;//将axios挂载到Vue实例中的$ajax上面,在项目中的任何位置通过this.$ajax使用

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  linkActiveClass: 'active'
});

