// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from '@/store'
import router from './router'
import App from './App'
import 'jquery'
import 'amazeui/dist/css/amazeui.css'
import 'amazeui/dist/js/amazeui.js'

import Notify from 'amaze-vue/dist/amaze-vue.js';
import Loading from 'amaze-vue/dist/amaze-vue.js';
import 'amaze-vue/dist/amaze-vue.css';


import sender from './Sender.js'
import VueAMap from 'vue-amap';
import {Alertx} from '@/components/help/alert/index.js'



Vue.use(Notify);
Vue.use(Alertx)
Vue.use(Loading);


Vue.use(VueAMap);


/**
 *  Amap
 * @type {String}
 */
VueAMap.initAMapApiLoader({
  key: 'bf5b356d3ffaab642c974983267b1ce8',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType']
});

Vue.config.productionTip = false;

/*
   Vue.prototype
 */

Vue.prototype.$storage = $.AMUI.store;

Vue.prototype.$setDocumentTitle = function(title){

    document.title = title;
    let ua = navigator.userAgent;
    if (/\bMicroMessenger\/([\d\.]+)/.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
        var i = document.createElement('iframe');
        i.src = '/favicon.ico';
        i.style.display = 'none';
        i.onload = function () {
            setTimeout(function () {
                i.remove();
            }, 9);
        };
        document.body.appendChild(i);
    }
}


/**
 *  Vue directive
 */
// Vue.directive('titlefff',{
//     inserted:(el,bind)=>{
//         document.title = bind.value;
//     }
// })



/* eslint-disable no-new */

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
    created:async function(){

        this.$store.dispatch('getIpInfo');

        if(!this.$store.getters['isLoginStatus']){
            await this.$store.dispatch('isLogin');
        }
    },
    mounted:function(){
        this.$store.dispatch('scrollEvent');
        this.$store.dispatch('resizeEvent');
    }
})

