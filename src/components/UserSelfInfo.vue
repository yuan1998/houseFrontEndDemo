<template>
   <transition>
      <div class="self-info" v-if="getUser">
         <div class="content">
            <div class="am-u-sm-12">
               <div class="info">
                  <avatar></avatar>
                  <form class="am-form">
                     <div class="am-form-group">
                        <label>用户名</label>
                        <input type="text" v-model="getUser.username" disabled>
                     </div>
                     <div @keyup="ksave" class="am-form-group">
                        <label>昵称</label>
                        <input type="text" v-model="getUser.nickname" >
                     </div>
                     <div @keyup="ksave" class="am-form-group">
                        <label>邮箱</label>
                        <input type="text" v-model="getUser.email" >
                     </div>
                     <div @keyup="ksave" class="am-form-group">
                        <label>电话</label>
                        <input type="text" :value="getUser.tel" >
                     </div>
                     <div  class="am-text-center" v-if="save">
                        <button class="am-btn am-btn-primary">保存</button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   </transition>
</template>

<script>
import sender from '@/Sender.js'

import avatar from '@/components/user/userAvatar'


   export default {
      components:{
         avatar
      },
      name:'selfInfo',
      data(){
         return {
            data:{},
            save:false,
         }
      },
      mounted(){
         console.log(1);
      },
      methods:{
         change(){
            sender('/api/user/change',this.data).then(res=>{
               console.log(res);
            })
         },
         ksave(){
            this.save = true;
         }
      },
      computed:{
         getUser(){
            return this.$store.getters['user/user'];
         },

      }

   }
</script>
