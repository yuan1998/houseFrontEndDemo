<template>
   <transition>
      <div class="admin-home">
         <div class="">
            <div class="page-header">
               <ol class="am-breadcrumb">
                 <li class="am-active">首页</li>
               </ol>
            </div>
            <div class="link-card">
               <div class="header">
                  <h1>概要</h1>
               </div>
               <div class="am-u-sm-4">
                  <div class="am-panel am-panel-primary">
                     <router-link tag="div" to="/admin/user/list" class="am-panel-bd">
                        <div class="user-panel">
                           <div>
                              用户数量
                              <span>{{userCount}}</span>
                           </div>
                        </div>
                     </router-link>
                  </div>

               </div>
               <div class="am-u-sm-4">
                  <div class="am-panel am-panel-danger">
                     <router-link tag="div" to="/admin/house/audit" class="am-panel-bd">
                        <div class="audit-house-panel">
                           <div>
                              在审房屋
                              <span>{{auditHouse}}</span>
                           </div>
                        </div>
                     </router-link>
                  </div>

               </div>
               <div class="am-u-sm-4">
                  <div class="am-panel am-panel-warning">
                     <router-link tag="div" to="/admin/house/sell" class="am-panel-bd">
                        <div class="selling-house-panel">
                           <div>
                              在售房屋
                              <span>{{sellingHouse}}</span>
                           </div>
                        </div>
                     </router-link>
                  </div>

               </div>
            </div>
            <div class="send-system-message">
               <div class="header">
                  <h1>发送站内消息</h1>
               </div>
               <div class="body">
                  <div class="am-g">
                     <div class="am-u-sm-6">
                        <div class="am-input-group">
                           <span class="am-input-group-label">标题</span>
                           <input type="text" v-model="message.title" class="am-form-field">
                        </div>
                     </div>
                     <div class="am-u-sm-6">
                        <div class="am-input-group">
                           <span class="am-input-group-label">收信人</span>
                           <input type="text" v-model="message.rec" placeholder="必填,0为全站消息,大于0为用户Id对点推送" class="am-form-field">
                        </div>
                     </div>
                  </div>
                  <div class="am-g">
                     <div class="content">
                        <textarea placeholder="内容" class="am-block" v-model="message.content" rows="5"></textarea>
                     </div>
                  </div>
               </div>
               <div class="footer">
                  <div>
                     <button class="am-btn am-btn-primary" @click="send">
                        发送
                     </button>
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
      name:'adminHome',
      data(){
         return {
            userCount:0,
            auditHouse:0,
            sellingHouse:0,
            message:{}
         }
      },
      mounted(){
         setTimeout(res=>{
            this.init();
         },500)
      },
      methods:{
         init(){
            this.getUserCount();
            this.getSellingHouseCount();
            this.getAuditHouseCount();
         },
         getUserCount(){
            sender('/api/user/getUserCount').then(res=>{
               this.userCount = res.data;
            })
         },
         getSellingHouseCount(){
            sender('/api/house/getSellingCount').then(res=>{
               this.sellingHouse = res.data;
            })
         },
         getAuditHouseCount(){
            sender('/api/house/getAuditCount').then(res=>{
               this.auditHouse = res.data;
            })
         },
         send(){
            sender('/api/adminMessage/send',this.message)
            .then(res=>{
               this.$notify({
                  message:'发送成功',
                  type:'success'
               })
               this.message = {};
            })
         }
      },
      computed:{

      }
   }
</script>

<style scoped>
   .link-card .am-u-sm-4{
      cursor: pointer;
   }
   .am-input-group-label{
      border:none;
      background: transparent;
   }
   .content{
      padding: 1.2em;
   }
   textarea{
      border-color:#d0d0d0;
      display: block;
      width: 100%;
   }
</style>
