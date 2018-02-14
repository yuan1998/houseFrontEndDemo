<template>
   <transition>
      <div class="admin-user-info">

         <div v-if="data  == false">
            <div class="am-text-center">
               Not User Info
            </div>
         </div>
         <div v-else>
            <div class="page-header">
               <ol class="am-breadcrumb">
                 <li class="">
                     <router-link to="/admin">
                        首页
                     </router-link>
                  </li>
                 <li class=""><router-link to="/admin/user/list">
                        用户
                     </router-link></li>
                 <li class="am-active">{{data.id}}</li>
               </ol>
            </div>
            <div >
               <div>
                  <div class="am-g">
                     <div>
                        <div class="am-input-group">
                           <span class="am-input-group-label" >用户名</span>
                           <input class="am-form-field" type="text" v-model="data.username">
                        </div>
                     </div>
                  </div>
                  <div class="am-g">
                     <div>
                        <div class="am-input-group">
                           <span class="am-input-group-label">邮箱</span>
                           <input class="am-form-field" type="text" v-model="data.email">
                        </div>
                     </div>
                  </div>
                  <div class="am-g">
                     <div>
                        <div class="am-input-group">
                           <span class="am-input-group-label" >电话</span>
                           <input class="am-form-field" type="text" v-model="data.tel">
                        </div>
                     </div>
                  </div>
                  <div class="am-g">
                     <div>
                        <div class="am-input-group">
                           <span class="am-input-group-label" >权限</span>
                           <select id="my-select" class="" v-model="data.permission" >
                              <option v-for="n in range(0,10)" :value="n">{{n}}</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div class="am-g">
                     <button type="submit" @click="submit" class="am-btn am-btn-default">保存</button>
                     <button type="button" @click="$router.go(-1)" class="am-btn am-btn-default">放回</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </transition>
</template>

<script>
import sender from '@/Sender.js'

   export default{
      name:'admin-user-info',
      props:{
         id:{
            Type:Number,
         }
      },
      data(){
         return {
            data:[],
         }
      },
      mounted(){
         setTimeout(res=>{
            this.getUser();
         },300);
      },
      methods:{
         getUser(){
            sender('/api/user/getUserInfo',{id:this.id}).then(res=>{
               this.data = res.data;
            })
         },
         range(min,max){
            let arr = [];

            for(let i = min; i<=max;i++){
               arr.push(i);
            }
            return arr;
         },
         submit(){
            sender('/api/user/changeUserData',this.data).then(res=>{
               this.$notify({
                  message:'修改成功',
                  type:'success'
               })
            })
         }
      }
   }
</script>

<style scoped>

   span.am-input-group-label{
      border:none;
      background: transparent;
   }

</style>
