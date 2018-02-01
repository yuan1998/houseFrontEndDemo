<template>

      <div class="am-panel am-panel-default" :class="'panel-'+index">
         <div class="am-panel-hd ">
            <div class="am-text-center">
               <span>{{data.city}} {{data.community}} {{data.building_number}}号楼 {{data.unit_number}}单元 {{data.house_number}}号</span>

               <a v-if="data.status == 'pass'" class="am-badge am-fr am-badge-success am-radius">审核通过</a>
               <a v-else-if="data.status == 'audit'" class="am-badge am-fr am-badge-secondary am-radius">审核中</a>
               <a v-else-if="data.status == 'unpass'" class="am-badge am-fr am-badge-danger am-radius">审核失败</a>
               <a v-else-if="data.status == 'valuation'" class="am-badge am-fr am-badge-danger am-radius">估价中</a>
               <a v-else-if="data.status == 'sell'" class="am-badge am-fr am-badge-danger am-radius">在售</a>
               <a v-else-if="data.status == 'pay'" class="am-badge am-fr am-badge-danger am-radius">交易中</a>
               <a v-else-if="data.status == 'complete'" class="am-badge am-fr am-badge-danger am-radius">交易完成</a>
               <a v-else-if="data.status == 'close'" class="am-badge am-fr am-badge-danger am-radius">已关闭</a>
            </div>
         </div>
         <div :id="'amdoc-'+index" class="am-panel-collapse am-collapse">
            <div class="am-panel-bd">
               <div>
                  <div>
                     提交日期：{{data.created_at}}
                  </div>
                  <div>
                     联系人 ：{{data.contact}}  联系人电话：{{data.tel}}
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
      }
   }
</script>

<style scoped>

   .am-panel-default > .am-panel-hd{

   background: #fff;
   }

   .am-panel-default{
    border-color: #5085ff5e;
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
    background: #fffcfc;
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
