<template>
   <transition>
      <div class="content">
         <div class="am-u-sm-12">
            <div>

            </div>
            <div class="user-table">
               <div class="am-scrollable-horizontal">
                 <table class="am-table am-table-bordered am-table-striped am-text-nowrap">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>用户名</th>
                      <th>邮箱</th>
                      <th>电话</th>
                      <th>注册日期</th>
                      <th>昵称</th>
                      <th>权限</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody v-if="data != false">
                     <tr v-for="item in data">
                        <td>{{item.id}}</td>
                        <td>{{item.username}}</td>
                        <td>{{item.email}}</td>
                        <td>{{item.tel}}</td>
                        <td>{{item.created_at}}</td>
                        <td>{{item.nick_name}}</td>
                        <td>{{item.permission}}</td>
                        <td><button type="button" class="am-btn am-btn-default">删除</button></td>
                     </tr>
                  </tbody>
                 </table>
               </div>
            </div>
         </div>
      </div>
   </transition>
</template>


<script>
import sender from '@/Sender.js'

   export default{
      name:'adminUser',
      data(){
         return {
            page:1,
            last:0,
            data:[],
         }
      },
      mounted(){
         this.getUserList();
      },
      methods:{
         getUserList(){
            sender('/api/user/getAllUser',{page:this.page}).then(res=>{
               this.last = res.data.last_page;
               this.data = res.data.data;
               console.log(res.data);
            })
         }
      }
   }
</script>
