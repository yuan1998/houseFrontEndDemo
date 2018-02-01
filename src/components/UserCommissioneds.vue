<template>
   <transition>
      <div class="content">
         <div class="am-u-sm-12" v-if="data !=false">
            <div style="min-height: 430px;">
               <div>
                  <div class="am-panel-group" v-if="data !=false" id="commisioned-bar">
                     <template v-for="(item,n) in data">
                        <commissioned v-bind:data="item" v-bind:index="n"></commissioned>
                     </template>
                  </div>
               </div>
            </div>
            <div v-if="maxPage !=false">
               <page v-bind:current="current" v-bind:last="maxPage" @onpagechange="pageChange"></page>
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
import page from '@/components/page/page'
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
            sender('/api/commissioned/getPage',{page:this.current}).then(res=>{
               this.data = res.data.data;
               this.maxPage = res.data.last_page;
            })
         },
         pageChange(page){
            console.log(page);
            this.current = page;
            this.getPage();
         }
      },
      computed:{
         getCommissioneds(){
            return this.$store.getters['user/getCommissioned'];
         }
      }
   }
</script>
