// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from '@/store/index'
import router from './router'
import App from './App'
import $ from 'jquery'
import 'amazeui/dist/css/amazeui.css'
import 'amazeui/dist/js/amazeui.js'
import sender from './Sender.js'

Vue.config.productionTip = false
/* eslint-disable no-new */
window.$ = $;

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created:function(){
   this.$store.dispatch('set_headers');
   this.$store.dispatch('getIpInfo');
   this.$store.dispatch('isLogin',{want:['username','email','tel','id','permission','avatar_url']});
  },
  mounted:function(){

  }
})

