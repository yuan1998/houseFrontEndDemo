<template>

      <div class="am-panel am-panel-default" :class="'panel-'+index">
         <div class="am-panel-hd ">
            <div class="am-text-center">
               <span>{{data.city}} {{data.community}} {{data.building_number}}号楼 {{data.unit_number}}单元 {{data.house_number}}号</span>
                <a v-if="getStatus != false" class="am-badge am-fr am-badge-secondary am-radius">{{getStatus[data.status]}}</a>
            </div>
         </div>
         <div :id="'amdoc-'+index" class="am-panel-collapse am-collapse">
            <div class="am-panel-bd">
               <div>
                  {{data}}
                  <div>
                     提交日期：{{data.created_at}}
                  </div>
                  <div>
                     联系人 ：{{data.contact}}  联系人电话：{{data.tel}}
                  </div>
                  <div>
                     地址：{{data.location}}
                  </div>
                  <div>
                    小区：{{data.community}}
                  </div>
                  <div>
                    户型 ：
                    <span v-if="data.room_count.hall >0"> {{data.room_count.hall}}厅 </span>
                    <span v-if="data.room_count.bedroom >0"> {{data.room_count.bedroom}}室 </span>
                    <span v-if="data.room_count.bathroom >0"> {{data.room_count.bathroom}}卫 </span>
                    <span v-if="data.room_count.belcony >0"> {{data.room_count.belcony}}阳台 </span>
                    <span v-if="data.room_count.kitchen >0"> {{data.room_count.kitchen}}厨房 </span>
                  </div>
                  <div>
                    <span>
                      装修：{{data.Decoration}}
                    </span>
                    <span class="am-margin-horizontal-sm">
                       暖气：{{data.supply_heating}}
                    </span>
                    <span class="am-margin-horizontal-sm">
                        电梯：{{data.elevator}}
                    </span>
                    <span class="am-margin-horizontal-sm">
                      朝向：{{data.direction}}
                    </span>
                  </div>
                  <div>

                  </div>
                  <div v-if="data.status == 'audit'" class="am-text-center">
                     请耐心等待审核,这将不会需要太久.
                  </div>
               </div>
            </div>
         </div>
         <div class="am-panel-hd pft am-text-center">
            <span class="am-panel-title am-collapsed" @click="collapse(index)">
               <i class="am-icon-angle-down" :class=""></i>
            </span>
         </div>
      </div>

</template>

<script>
   export default {
      name:'temp-commissioned',
      props:['data','index'],
      methods:{
         collapse(index){
            let collapse = $('#amdoc-'+index);
            this.toggleClass(collapse.hasClass('am-in'));
            collapse.collapse('toggle');
         },
         toggleClass(condi){
            $('.panel-'+this.index).find('i[class^=am-icon]').removeClass().addClass(condi ? 'am-icon-angle-down' : 'am-icon-angle-up');
         }
      },
      computed:{
        getStatus(){
          return this.$store.getters['house/getStatus'];
        }
      }
   }
</script>

<style scoped>

   .am-panel-default > .am-panel-hd{

   background: #fff;
   }
    .am-panel-hd,
    .am-panel-bd,
   .am-panel-default{
      border-color: #5085ff5e;
      border-radius:6px;
   }
   .am-panel-title{
          display: block;
       cursor: pointer;
       padding: 0.5rem;
      transition:0.3s;

   }
   .am-panel-title:hover {
       color: #5085FF;
       background: #f0f0f0;
   }
   .am-panel-bd{
    border-top: 1px solid #5085ff1e !important;
    background: #ffffff;
   }
   .am-panel-hd.pft span:hover .am-icon-angle-up:after,
   .am-panel-hd.pft span:hover .am-icon-angle-down:after{

      color: #5085FF;
      padding-left: 5px;
   }
   .am-panel-hd.pft span:hover .am-icon-angle-down:after{
      content:"显示详细";
   }
   .am-panel-hd.pft span:hover .am-icon-angle-up:after{
      content:"隐藏";
   }

   .am-panel-hd.pft{
      color: #b5b5b5;
       background-color: #fff;
       padding: 0;
       text-align: center;
       border: 0;
       border-top: 1px solid #5085ff1f;
   }
</style>
