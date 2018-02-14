<template>
   <transition>
      <div>
         <div class="page-header">
            <ol class="am-breadcrumb">
              <li class="">
                  <router-link to="/admin">
                     首页
                  </router-link>
               </li>
              <li class="">用户</li>
              <li class="am-active">列表</li>
            </ol>
         </div>
         <div>
            <div class="am-u-sm-5 am-u-sm-centered">
               <form @submit.prevent="searchEvent">
                  <div class="am-input-group">
                     <input type="text" v-model="keyword" class="am-form-field" placeholder="通过id、用户名、查找">
                     <div class="">
                        <button type="submit" class="am-input-group-label">查找</button>
                     </div>
                  </div>
               </form>
            </div>
         </div>
         <table class="am-table am-table-striped am-table-hover">
             <thead>
               <th>Id</th>
               <th>用户名</th>
               <th>邮箱</th>
               <th>电话</th>
               <th>创建时间</th>
               <th>权限</th>
               <th>操作</th>
             </thead>
             <tbody>
                  <tr v-if="search === false" v-for="item in data">
                     <td>{{item.id}}</td>
                     <td>{{item.username}}</td>
                     <td>{{item.email}}</td>
                     <td>{{item.tel}}</td>
                     <td>{{item.created_at}}</td>
                     <td>{{item.permission}}</td>
                     <td><router-link class="am-link" :to="'/admin/user/info/'+item.id">修改资料</router-link></td>
                  </tr>
                  <tr v-else-if="search == false">
                     <td rowspan="2" colspan="7">
                        没有找到用户
                     </td>
                  </tr>
                  <tr v-else v-for="item in search">
                     <td>{{item.id}}</td>
                     <td>{{item.username}}</td>
                     <td>{{item.email}}</td>
                     <td>{{item.tel}}</td>
                     <td>{{item.created_at}}</td>
                     <td>{{item.permission}}</td>
                     <td><router-link class="am-link" :to="'/admin/user/info/'+item.id">修改资料</router-link></td>
                  </tr>
             </tbody>
         </table>
      </div>
   </transition>
</template>

<script>
import sender from '@/Sender.js'

   export default {
      name:'userLisr',
      data(){
         return {
            data:[],
            page:1,
            max:0,
            search:false,
            keyword:'',
         }
      },
      mounted(){
         setTimeout(res=>{
            this.getUserList();
         },300)
      },
      methods:{
         getUserList(){
            sender('/api/user/getAllUser',{page:this.page}).then(res=>{
               this.data = res.data.data;
               this.max = res.data.last_page;
            })
         },
         searchEvent(){

            sender('/api/user/search',{keyword:this.keyword}).then(res=>{
               this.search = res.data;
            })
         }
      }
   }
</script>
