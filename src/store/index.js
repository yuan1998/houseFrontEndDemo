import Vue from 'vue'
import Vuex from 'vuex'
import userStore from '@/store/usermodel.js'
import messageStore from '@/store/messagemodel.js'
import houseStore from '@/store/housemodel.js'
Vue.use(Vuex)

import sender from '@/Sender.js'


export default new Vuex.Store({
   modules:{
      user:userStore,
      message:messageStore,
      house:houseStore,
   },
   state:{
      alertMsg : {'title':'添加成功～','content':'请耐心等待审核'},
      ipInfo:{},
      scrollTop:0,
      windowWidth:null,
      messageInterval:false,
      isloginStatu:false
   },
   mutations:{
      setMsgTitle(state,text){
         state.alertMsg.title = text;
      },
      setMsgContent(state,text){
         state.alertMsg.content = text;
      },
      saveIpInfo(state,data){
         state.ipInfo = data;
      },
      saveOffsetTop(state,offset){
         state.scrollTop = offset;
      },
      saveWindowWidth(state,width){
         state.windowWidth = width;
      }
   },
   actions:{
      progress(state,type){
         $.AMUI.progress[type]();
      },
      _alert({commit},msg){
         if(msg){
            if(typeof(msg) == 'object'){
               commit('setMsgTitle',msg.title);
               commit('setMsgContent',msg.content);
            }else commit('setMsgContent',msg);
         }
         document.querySelector('#alertBtn').click();
      },
      isLogin({state,dispatch},data){
         state.isloginStatu = true;
         data = data || {want:['username','email','tel','id','permission','avatar_url']};

         return sender('/api/user/is_login',data).then((res,textStatus,response)=>{
            if(res.success){
               dispatch('user/saveUser',res.data);
               dispatch('message/getUserMessage');

               state.messageInterval = setInterval(res=>{
                  dispatch('message/getUserMessage');
               },10000);
            }

         })
      },
      logout({state,dispatch}){


         clearInterval(state.messageInterval);

         dispatch('user/saveUser',null);
      },
      getIpInfo(state){
         $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js').then(res=>{

            state.commit('saveIpInfo',remote_ip_info);
         })
      },
      readerFile(state,{file,callback}){
         let reader = new FileReader(),result;

         // reader.onload = (e) =>{
         //    arr.push(e.target.result);
         // }

         reader.onload = callback;


         reader.readAsDataURL(file);
      },
      windowScroll(state,height){

         let $w = $(window);
         $w.smoothScroll({
            position:height
         });
      },
      scrollEvent({commit}){
         window.addEventListener('scroll',res=>{
            commit('saveOffsetTop',window.pageYOffset);
         })
      },
      resizeEvent({commit}){
         commit('saveWindowWidth',window.innerWidth);
         window.addEventListener('resize',res=>{
            commit('saveWindowWidth',window.innerWidth);
         })
      }
   },
   getters:{
      getIpCity(state){
         return '西安';
         return state.ipInfo.city || null;
      },
      getScrollTop(state){
         return state.scrollTop;
      },
      getWindowWidth(state){
         return state.windowWidth;
      },
      isLoginStatus(state){
         return state.isloginStatu;
      }
   }
})

