import $ from 'jquery'

export default {
   namespaced: true,
   state:{
      user:null,
   },
   mutations:{
      saveUser(state,payload){
         state.user = payload;
      }
   },
   actions:{
      saveUser({commit},data){
         commit('saveUser',data);
      }
   },
   getters:{
      user:(state)=>{
         console.log(state);
         return state.user;
      }
   }

}

