import Vue from 'vue'
import Vuex from 'vuex'
import userStore from '@/store/usermodel.js'
import messageStore from '@/store/messagemodel.js'
import $ from 'jquery'
Vue.use(Vuex)

import sender from '@/Sender.js'


export default new Vuex.Store({
   modules:{
      user:userStore,
      message:messageStore,
   },
   state:{
      alertMsg : {'title':'添加成功～','content':'请耐心等待审核'},
      ipInfo:{}
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

            let token =response.getResponseHeader('s_token');
            console.log(token);
            if(token)
               state.dispatch('set_token',token);

            if(res.success){
               state.dispatch('user/saveUser',res.data);
               state.dispatch('message/getUserMessage');
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
            console.log(remote_ip_info);
            state.commit('saveIpInfo',remote_ip_info);
         })
      },
      add({commit}){
         commit('add');
      },
      readerFile(state,{file,arr}){
         let reader = new FileReader(),result;

         reader.onload = (e) =>{
            arr.push(e.target.result);
         }

         reader.readAsDataURL(file);
      }
   },
   getters:{
      getIpCity(state){
         return state.ipInfo.city || null;
      },
      msg(state){
         return state.alertMsg;
      }
   }
})

