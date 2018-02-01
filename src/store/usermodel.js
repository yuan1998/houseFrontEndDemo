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
         state.user.avatar_url = data;
      }
   },
   actions:{
      saveUser({commit},data){
         commit('saveUser',data);
      },
      getCommissioned({commit}){
         sender('/api/commissioned/userRead').then(res=>{
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
      getCommissioned(state){
         return state.userCommissioneds;
      },
      getComM(state){
         return state.userCommissioneds.filter((item,index) => index <3 );
      }
   }

}

