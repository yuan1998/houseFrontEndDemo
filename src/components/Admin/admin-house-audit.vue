<template>
   <transition>
      <div class="">
         <div class="page-header">
            <ol class="am-breadcrumb">
               <li>
                  <router-link to="/admin/home">首页</router-link>
               </li>
               <li>
                  <router-link to="/admin/house">房屋</router-link>
               </li>
              <li class="am-active">审核中</li>
            </ol>
         </div>
         <div class="body">
            <div>
               <table class="am-table am-table-striped am-table-hover">
                   <thead>
                     <th>Id</th>
                     <th>城市</th>
                     <th>小区</th>
                     <th>地址</th>
                     <th>申请时间</th>
                     <th>操作</th>
                   </thead>
                   <tbody>
                     <tr v-if="data == false">
                        <td rowspan="2" colspan="7">
                           没有审核中的房子
                        </td>
                     </tr>
                     <tr v-else v-for="item in data">
                        <td>{{item.id}}</td>
                        <td>{{item.city}}</td>
                        <td>{{item.community}}</td>
                        <td>{{item.location}}</td>
                        <td>{{item.created_at}}</td>
                        <td>
                           <router-link class="am-link" :to="'/admin/house/info/'+item.id">查看详细</router-link>
                           <button @click="auditPass(item.id)" class="am-btn am-btn-link">
                              审核通过
                           </button>
                        </td>
                     </tr>
                   </tbody>
               </table>
            </div>
         </div>
      </div>
   </transition>
</template>


<script>
import sender from '@/Sender.js'

   export default{
      name:'admin-house-audit',
      data(){
         return {
            data:[],
            page:1,
            last:0,
         }
      },
      mounted(){
         setTimeout(res=>{
            this.getAudit();
         },300);
      },
      methods:{
         getAudit(){
            sender('/api/house/getAuditHouse',{page:this.page})
            .then(res=>{
               this.data= res.data.data;
               this.last = res.data.last_page;
            })
         },
         auditPass(id){
            sender('/api/house/houseAuditPass',{hid:id})
            .then(res=>{
               this.$notify({
                  message:'操作成功',
                  type:'success',
               })
               this.getAudit();
            },res=>{
               this.$notify({
                  message:'操作失败',
                  type:'error',
               })
            })
         }
      }
   }
</script>

