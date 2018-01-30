
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
      }
   },
   actions:{
      getUserMessage(state){

         sender('/api/envelope/getUserMessage').then(res=>{
            state.commit('userMessage',res.data)
         })
         sender('/api/adminMessage/userGetMessage').then(res=>{
            state.commit('webMessage',res.data)
         })

         sender('/api/envelope/getUnreadCount').then(res=>{
            state.commit('saveUserCount',res.data)
         })
         sender('/api/adminMessage/getUnreadCount').then(res=>{
            state.commit('saveWebCount',res.data)
         })


      },
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

