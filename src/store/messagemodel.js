
import sender from '@/Sender.js'

   export default {
   namespaced: true,
   state:{
      userMessage:[],
      webMessage:[],
      unreadUserMessageCount:0,
      unreadWebMessageCount:0,
   },
   mutations:{
      userMessage(state,payload){
         state.userMessage = payload
      },
      webMessage(state,payload){
         state.webMessage = payload
      },
      saveUserCount(state,payload){
         state.unreadUserMessageCount = payload
      },
      saveWebCount(state,payload){
         state.unreadWebMessageCount = payload
      },
      systemMessageLess(state){
         state.unreadWebMessageCount--;
      },
      userMessageLess(state){
         state.unreadUserMessageCount--;
      }
   },
   actions:{
      getUserMessage(state){
         // sender('/api/envelope/getUnreadCount').then(res=>{
         //    state.commit('saveUserCount',res.data)
         // })
         sender('/api/adminMessage/getUnreadCount').then(res=>{
            state.commit('saveWebCount',res.data)
         })
      },
      less({commit},type){
         type ? commit('userMessageLess') :commit('systemMessageLess');
      }
   },
   getters:{
      userMessageCount:(state)=>{
         return state.unreadUserMessageCount
      },
      webMessageCount:(state)=>{
         return state.unreadWebMessageCount
      },
      user:(state)=>{
         return state.userMessage
      },
      web:(state)=>{
         return state.webMessage
      }
   }
}

