import sender from '@/Sender.js'


export default {
   namespaced: true,
   state:{
      status:[]
   },
   mutations:{
      saveStatus(state,data){
         state.status = data;
      }
   },
   actions:{
      getStatusList({commit}){
         sender('/api/house/status').then(res=>{
            commit('saveStatus',res.data);
         })
      }
   },
   getters:{
      getStatus(state){
         return state.status;
      }
   }

}

