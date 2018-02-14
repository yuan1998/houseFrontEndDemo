<template>
   <transition>
      <div class="">
         <div class="page-header">
            <ol class="am-breadcrumb">
               <li>
                  <router-link to="/admin">首页</router-link>
               </li>
               <li>
                  <router-link to="/admin/house">房屋</router-link>
               </li>
               <li class="am-active">{{statusList[status]}}</li>
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
                     <th>状态</th>
                     <th>操作</th>
                   </thead>
                   <tbody>
                     <tr v-if="data == false" class="am-text-center">
                        <td  rowspan="2" colspan="7">
                           并没有{{statusList[status]}}房子
                        </td>
                     </tr>
                     <tr v-else v-for="item in data">
                        <td>{{item.id}}</td>
                        <td>{{item.city}}</td>
                        <td>{{item.community}}</td>
                        <td>{{item.location}}</td>
                        <td>{{item.created_at}}</td>
                        <td>{{statusList[item.status]}}</td>
                        <td>
                           <router-link class="am-link" :to="'/admin/house/info/'+item.id">查看详细</router-link>
                           <button v-if="status == 'audit'" @click="auditPass(item.id)" class="am-btn am-btn-link">
                              审核通过
                           </button>
                           <button v-else @click="auditPass(item.id)" class="am-btn am-btn-link">
                              关闭
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
            statusList:{},
         }
      },
      props:{
         status:{
            type:String,
         }
      },
      mounted(){
         if(!this.validator())
               this.$router.push({path:'/404'});
         this.getStatusList();
         setTimeout(res=>{
            this.getList();
         },300);
      },
      methods:{
         getList(){
            if(!this.validator())
               this.$router.push({path:'/404'});

            sender('/api/house/'+this.status+'House',{page:this.page})
            .then(res=>{
               this.data= res.data.data;
               this.last = res.data.last_page;
            })
         },
         validator(){
            return ['all','audit','pass','sell'].includes(this.status);
         },
         getStatusList(){
            sender('/api/house/status')
            .then(res=>{
               this.statusList = res.data;
            })
         },
         auditPass(id){
            sender('/api/house/houseAuditPass',{hid:id})
            .then(res=>{
               this.$notify({
                  message:'操作成功',
                  type:'success',
               })
               this.getList();
            },res=>{
               this.$notify({
                  message:'操作失败',
                  type:'error',
               })
            })
         },
         closeHouse(hid){
            sender('/api/house/closeHouse',{hid})
            .then(res=>{

            })
         }
      },
      computed:{
         olTag(){
            return this.statusList[this.data.status];
         }
      },
      watch:{
         status(){
            console.log(this.statusList);
            this.getList();
         }
      }
   }
</script>

