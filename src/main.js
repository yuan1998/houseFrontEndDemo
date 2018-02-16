// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from '@/store/index'
import router from './router'
import App from './App'
import 'jquery'
import 'amazeui/dist/css/amazeui.css'
import 'amazeui/dist/js/amazeui.js'

import AmazeVue from 'amaze-vue';
import 'amaze-vue/dist/amaze-vue.css';


import sender from './Sender.js'

import VueAMap from 'vue-amap';

Vue.use(AmazeVue);
Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  key: 'bf5b356d3ffaab642c974983267b1ce8',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType']
});

Vue.config.productionTip = false;

/*
   Vue.prototype
 */

Vue.prototype.$storage = $.AMUI.store;

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created:function(){
   // this.$store.dispatch('set_headers');
   this.$store.dispatch('getIpInfo');
   this.$store.dispatch('isLogin');
  },
  mounted:function(){
   this.$store.dispatch('scrollEvent');
   this.$store.dispatch('resizeEvent');
  }
})

