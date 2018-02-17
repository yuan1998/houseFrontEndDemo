import sender from '@/Sender.js'


export default {
   namespaced: true,
   state:{
      user:null,
      userCommissioneds:[]
   },
   mutations:{
      saveUser(state,payload){
         state.user = payload;
      },
      saveCommissioned(state,data){
         state.userCommissioneds = data;
      },
      saveAvatar(state,data){
         console.log(state.user.avatar_url);
         state.user.avatar_url = data;
         console.log(state.user.avatar_url);
      }
   },
   actions:{
      saveUser({commit},data){
         commit('saveUser',data);
      },
      getCommissioned({commit}){
         sender('/api/commissioned/userRead',{page:1}).then(res=>{
            commit('saveCommissioned',res.data);
         })
      },
      changeAvatar({commit},data){
         commit('saveAvatar',data);
      }
   },
   getters:{
      user:(state)=>{
         return state.user;
      },
      getComM(state){
         return state.userCommissioneds;
      },
      getAvatar(state){
         return state.user.avatar_url;
      }
   }

}

