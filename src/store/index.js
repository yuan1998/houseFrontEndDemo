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
      _alert(state,msg){
         if(msg){
            if(typeof(msg) == 'object'){
               state.commit('setMsgTitle',msg.title);
               state.commit('setMsgContent',msg.content);
            }else state.commit('setMsgContent',msg);
         }
         document.querySelector('#alertBtn').click();
      },
      isLogin(state,data){
         sender('/api/user/is_login',data).then((res,textStatus,response)=>{

            if(res.success){
               state.dispatch('user/saveUser',res.data);
               state.dispatch('message/getUserMessage');
               setInterval(res=>{
                  state.dispatch('message/getUserMessage');
               },10000)
            }
         })
      },
      set_headers(){
         $.ajaxSetup({
            headers: {
               'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
               's_token':$.AMUI.utils.cookie.get('s_token')
            }
         });
      },
      set_token(state,token){
         $.AMUI.utils.cookie.set('s_token',token);
         state.dispatch('set_headers');
      },
      getIpInfo(state){
         $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js').then(res=>{

            state.commit('saveIpInfo',remote_ip_info);
         })
      },
      add({commit}){
         commit('add');
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
      msg(state){
         return state.alertMsg;
      },
      getScrollTop(state){
         return state.scrollTop;
      },
      getWindowWidth(state){
         return state.windowWidth;
      }
   }
})

