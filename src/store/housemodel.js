import sender from '@/Sender.js'


export default {
   namespaced: true,
   state:{
      status:[],
      supply_heating:['集体供暖','个人供暖','无供暖','其他'],
      direction:['西','南','北','东','东南','西南','西北','东北','其他'],
      house_type:['平房','公寓','小区公寓','商业店铺','别墅公寓','私人别墅'],
      Decoration:['毛胚房','精装','简装','其他']
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
      },
      getSupplyHeating(state){
         return state.supply_heating;
      },
      getDirection(state){
         return state.direction;
      },
      getHouseType(state){
         return state.house_type;
      },
      getDecoration(state){
         return state.Decoration;
      }
   }

}

