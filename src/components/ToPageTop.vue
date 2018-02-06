<template>
   <transition>
      <div class="to-page-top">
         <div class="am-text-center">
            <a href="#" class="am-hide-sm">
               <div class="am-icon-question"></div>
               <div>帮助</div>
            </a>
            <a href="#" v-if="topShow" @click.prevent="top" class="am-hide-sm">
               <div class="am-icon-arrow-up"></div>
               <div>Top</div>
            </a>
         </div>
      </div>
   </transition>
</template>

<script>
   export default{
      name:'toTop',
      data(){
         return {
            topShow:false,
         }
      },
      methods:{
         top(){
            this.$store.dispatch('windowScroll',0);
         },
         getTopPosition(){

         }
      },
      computed:{
         getScrollTop(){
            return this.$store.getters['getScrollTop'];
         }
      },
      watch:{
         getScrollTop(val){
            console.log(val);
            this.topShow = (val > 350);
         }
      }
   }
</script>

<style scoped>
   .to-page-top{
      background: transparent;
      position:fixed;
      right: 3%;
      bottom: 10px;
   }

   .to-page-top a{
      color:#ff5a5f;
   }

   .to-page-top a div:not([class^=am-icon]){
      font-size: 14px;
   }
</style>
