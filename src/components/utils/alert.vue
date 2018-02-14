<template>
   <transition name="alert">
      <div class="alert-bar am-cf">
         <div class="am-cf">
            <div class="am-alert am-text-center am-cf" >
               <button type="button" @click="close()" class="am-close">&times;</button>
               <p v-html="content"></p>
            </div>
         </div>
      </div>
   </transition>
</template>

<script>
   export default{
      name:'alert',
      props:['content'],
      methods:{
         close(){
            this.$emit('close');
         }
      }
   }
</script>

<style scoped>
   .alert-bar{
      position:absolute;
      top: 80px;
      left: 10px;
      right: 10px;
      z-index: 1;
   }
   .am-alert{

      background: #fc46d8 !important;
      border-color:#e178cc;
   }

   .alert-leave-to,
   .alert-enter{
      opacity:0;
      transform:translateX(100%);
   }
   .alert-leave,
   .alert-enter-to{
      opacity:1;
      transform:translateX(0);
   }
   .alert-leave-active,
   .alert-enter-active{
      transition:transform 0.3s ease-out,opacity 0.4s ease-out;
   }
   .am-close{
      color:#fff;
      opacity:0.8 !important;
      z-index: 10;
   }
</style>
