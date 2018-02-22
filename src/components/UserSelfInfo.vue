<template>
   <transition>
      <div class="self-info" v-if="getUser">
         <div class="content">
            <div class="am-u-sm-12">
               <div class="info">
                  <avatar></avatar>
                  <div class="am-u-md-10 am-u-sm-12 am-u-sm-centered">
                     <div class="am-form-group">
                        <label>用户名</label>
                        <input type="text" v-model="data.username" disabled>
                     </div>
                     <div @keyup="ksave" class="am-form-group">
                        <label>昵称</label>
                        <input type="text" v-model="data.nick_name" >
                     </div>
                     <div @keyup="ksave" class="am-form-group">
                        <label>邮箱</label>
                        <input type="text" v-model="data.email" >
                     </div>
                     <div @keyup="ksave" class="am-form-group">
                        <label>电话</label>
                        <input type="text" :value="data.tel" >
                     </div>
                     <div  class="am-text-center" v-if="save">
                        <button @click="change" class="am-btn am-btn-primary">保存</button>
                        <button @click="reset" class="am-btn am-btn-default">取消</button>
                     </div>
                  </div>
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
         setTimeout(res=>{
            this.getUserInfo()
         },0)
      },
      methods:{
         change(){
            sender('/api/user/change',this.data).then(res=>{
               console.log(res);

               this.$notify({
                  type:'success',
                  message:'修改成功'
               })
               this.save = false;
            },res=>{

            })
         },
         reset(){
            this.getUserInfo();
            this.save = false;
         },
         ksave(){
            this.save = true;
         },
         getUserInfo(){
            this.data = this.getUser;
         }
      },
      computed:{
         getUser(){
            return this.$store.getters['user/user'];
         }

      }

   }
</script>

<style scoped>
.am-form-group label{
   font-weight: 400;
   font-size: 18px;
   color:#767676;
}
.am-form-group input{
   width: 100%;
   height: 40px;
   font-size: 18px;
   line-height: 37px;
   color:#666;
   border-radius: 5px;
   border:1px solid #e1e1e1;
   padding-left: 5px;

}

.am-form-group input[disabled]{
   background-color: #e1e1e1;
   user-select: none;
}

</style>
