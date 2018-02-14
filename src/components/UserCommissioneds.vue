<template>
   <transition>
      <div class="content am-cf">
         <div class="am-u-sm-12" v-if="data !=false">
            <div style="min-height: 430px;">
               <div>
                  <div class="am-panel-group" v-if="data !=false" id="commisioned-bar">
                     <div class="am-g">
                        <template v-for="(item,n) in data">
                           <div class="am-i-sm-12 am-u-md-6 am-g-collapse am-u-end">
                              <commissioned v-bind:data="item" v-bind:index="n"></commissioned>
                           </div>
                        </template>
                     </div>

                  </div>
               </div>
            </div>
            <div v-if="maxPage > 1">
               <page v-bind:current="current" v-bind:last="maxPage" @onpagechange="pageChange"></page>
            </div>
            <div v-else>
               <div class="am-text-center b-text">
                  没有更多了.
               </div>
            </div>
         </div>
         <div v-else>
            <div class="am-text-center">
               <div><i class="am-icon-sticky-note-o am-text-xxxxl"></i></div>
               <div><span class="am-text-xxl">空</span></div>
            </div>
         </div>
      </div>
   </transition>
</template>

<script>
import commissioned from '@/components/user/homeCommissioned'
import page from '@/components/paginate/page'
import sender from '@/Sender.js'


   export default {
      name:'commissioneds',
      components:{
         commissioned,
         page
      },
      data(){
         return {
            count:0,
            current:1,
            data:[],
            maxPage:0,
         }
      },
      mounted(){
         this.getPage();

      },
      methods:{
         getPage(){
            sender('/api/house/getUserHouse',{page:this.current}).then(res=>{
               this.data = res.data.data;
               this.maxPage = res.data.last_page;
            })
         },
         pageChange(page){
            this.current = page;
            this.getPage();
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
</style>
