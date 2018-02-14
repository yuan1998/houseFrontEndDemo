<template>
   <transition>
      <div class="admin-user-add">
         <div>
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
                 <li class="am-active">添加用户</li>
               </ol>
            </div>
            <form @submit.prevent="submit">
               <div>
                  <div class="am-g">
                     <div>
                        <div class="am-form-group">
                           <label >用户名</label>
                           <input type="text" v-model="data.username">
                        </div>
                     </div>
                  </div>
                  <div class="am-g">
                     <div>
                        <div class="am-form-group">
                           <label >密码</label>
                           <input type="text" v-model="data.password">
                        </div>
                     </div>
                  </div>
                  <div class="am-g">
                     <div>
                        <div class="am-form-group">
                           <label>邮箱</label>
                           <input type="text" v-model="data.email">
                        </div>
                     </div>
                  </div>
                  <div class="am-g">
                     <div>
                        <div class="am-form-group">
                           <label >电话</label>
                           <input type="text" v-model="data.tel">
                        </div>
                     </div>
                  </div>
                  <div class="am-g">
                     <div>
                        <div class="am-form-group">
                           <label >权限</label>
                           <select v-model="data.permission" >
                              <option v-for="n in range(0,10)" :value="n">{{n}}</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div class="am-g">
                     <button type="submit" class="am-btn am-btn-default">创建</button>
                  </div>
               </div>
            </form>
         </div>
      </div>
   </transition>
</template>

<script>
import sender from '@/Sender.js'

   export default{
      name:'admin-user-add',
      data(){
         return {
            data:{
               permission:1,
            }
         }
      },
      methods:{
         range(min,max){
            let arr = [];

            for(min;min <= max; min++){
               arr.push(min);
            }

            return arr;
         },
         submit(){
            sender('/api/user/createUser',this.data).then(res=>{
               this.$notify({
                  message:'创建成功',
                  type:'success',
               })
            },res=>{
               this.$notify({
                  message:'创建失败',
                  type:'error',
               })
            })
         }
      }
   }
</script>
