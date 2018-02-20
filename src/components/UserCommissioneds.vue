<template>
   <transition>
      <div class="content am-cf">
         <div class="am-u-sm-12" v-if="$data._list !=false">
            <div style="min-height: 430px;">
               <div>
                  <div class="am-panel-group" v-if="$data._list !=false" id="commisioned-bar">
                     <div class="am-g">
                        <template v-for="(item,n) in $data._list">
                           <div class="am-i-sm-12 am-u-md-6 am-g-collapse am-u-end">
                              <commissioned :data="item" :index="n"></commissioned>
                           </div>
                        </template>
                     </div>

                  </div>
               </div>
            </div>
            <div v-if="$data._lastPage > 1">
               <page v-bind:current="$data._page"
                  v-bind:last="$data._lastPage"
                  @onpagechange="_changePage">
               </page>
            </div>
            <div v-else>
               <div class="am-text-center b-text">
                  没有更多了.
               </div>
            </div>
         </div>
         <div class="not-commissioned" v-else>
            <div class="am-text-center">
               <div><i class="am-icon-sticky-note-o"></i></div>
               <div><span class="">空</span></div>
               <div class="description">你没有发布过任何房源</div>
            </div>
         </div>
      </div>
   </transition>
</template>

<script>
import commissioned from '@/components/user/homeCommissioned'
import page from '@/components/paginate/page'
import sender from '@/Sender.js'

import paginate from '@/mixin/paginate'
import util from '@/mixin/unity'


   export default {
      name:'commissioneds',
      mixins:[paginate,util],
      components:{
         commissioned,
         page
      },
      data(){
         return {
         }
      },
      mounted(){

         setTimeout(res=>{
            this.getData();
         },0);

      },
      methods:{
         getData(){
            let url = '/api/house/getUserHouse';

            this._getPageData(url);
         }
      },
      computed:{

      }
   }
</script>

<style scoped>
   .b-text{
      font-size: 18px;
      font-weight: 400;
      line-height: 28px;
      padding-bottom: 20px;
      color:#666;
   }
   .am-u-md-6{
      padding-top: 15px;
   }
   .content{
      margin-bottom: 50px;
   }
   .not-commissioned{
      margin-top: 45px !important;
   }
   .not-commissioned span{
      font-size: 32px !important;
      line-height: 35px !important;
      color:#555 !important;
   }
   .not-commissioned i{
      font-size: 50px !important;
      line-height: 63px !important;
      color:#333 !important;
   }
   .not-commissioned .description{
      font-size: 16px !important;
      color:#777 !important;
      line-height: 28px !important;
   }
</style>
