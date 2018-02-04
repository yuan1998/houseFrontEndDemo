<template>
   <transition>
      <div class="content">
         <div class="am-u-sm-12">
            <div class="am-panel am-panel-default">
               <div class="am-panel-bd header">
                  系统消息
               </div>
            </div>
            <div class="am-panel-group">
               <template v-for="item in Message">
                  <message v-bind:data="item"></message>
               </template>
            </div>
         </div>
      </div>
   </transition>
</template>


<script>
import sender from '@/Sender.js'

import message from '@/components/user/message';

   export default{
      name:'SystemMessage',
      components:{
         message,
      },
      data(){
         return {
            page:1,
            Message:[],
            current:0,
            last:0
         }
      },
      mounted(){
         this.getMessage();
      },
      methods:{
         getMessage(){
            sender('/api/adminMessage/userGetMessage',{page:this.page}).then(res=>{
               this.Message = this.Message.concat(res.data.data);
               this.last = res.data.last_page;
               this.current = res.data.current_page;
            })
         },
         changePage(){
            if(this.page >= last)
               return;
            this.page++;
            this.getMessage();
         }
      }
   }
</script>

<style scoped>
   .am-panel{
    border-radius:6px;
    border-color:#5085ff5e;
   /*border:1px solid rgba(0,0,0,0.1);*/
   }
   .header{
      font-size: 15px;
    color: #666;
    font-weight: 600;
    background: #fff;
    line-height: 12px;
    border-radius:6px;
   /*border:1px solid rgba(0,0,0,0.1);*/
   }
</style>
