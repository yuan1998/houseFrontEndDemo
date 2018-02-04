<template>
   <transition>
         <div class="am-panel am-panel-default" :class="{'unread':!data.status || data.status == 'unread'}">
            <div class="am-panel-bd" v-if="!data.send_user">
               <div class="header">
                  <span class="title" >
                     {{data.title}}
                  </span>
                  <span class="at">
                     {{data.created_at}}
                  </span>
               </div>
               <div class="content">
                  <p v-html="data.message.content"></p>
               </div>
            </div>
            <div v-else class="am-panel-bd am-cf">
               <div class="am-u-sm-12 am-u-md-1 am-g">
                  <span class="avatar-bar center-img" :style="'background-image:url('+ getAvatar +')'">
                     <!-- <img class="avatar-img" :src="data.send_user.avatar_url.get" > -->
                  </span>
               </div>
               <div class="am-u-sm-12 am-u-md-11">
                  <div class="am-g">
                     <div class="header">
                         <span class="title">{{data.send_user.username}}</span>

                        <span class="at">
                           {{data.created_at}}
                        </span>
                     </div>
                     <div class="pcontent">

                           <p v-html="data.message.content"></p>

                     </div>
                     <div class="sendBack">
                        <div class="am-input-group" v-if="sendback">
                           <textarea v-model="message" class="am-form-field send-bar" ></textarea>
                           <span class="am-input-group-btn">
                              <button @click="send" class="am-btn am-btn-sm">回复</button>
                           </span>
                        </div>
                        <div v-else @click="sendback = true" class="am-text-right am-margin-right">
                           回复
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

   export default {
      name:'messageTemp',
      props:['data'],
      data(){
         return {
            sendback:false,
            message:'',
         }
      },
      mounted(){
         if(!this.data.status || this.data.status == 'unread')
            this.read();
      },
      methods:{
         send(){
            sender('/api/envelope/send',{msg:this.message,recipient:this.data.send_user.id}).then(res=>{
               this.message = "发送成功";
            })
         },
         read(){
            let url = this.data.send_id ? '/api/envelope/readStatus' : '/api/adminMessageStatus/readStatus';
            sender(url,{id:this.data.id}).then(res=>{
               this.$store.dispatch('message/less',!!this.data.send_id);
            })
         },

      },
      computed:{
         getAvatar(){
            if(!this.data.send_user.avatar_url)
               return require('@/../storage/notAvatar.png');
            return this.data.send_user.avatar_url.get;
         }
      }
   }
</script>

<style scoped>
   .header{
      display: block;
   }
   .header .title{
      color: #333;
    font-weight: 700;
        font-size: 14px;
   }
   .header .at{
      color: #999;
    font-size: 14px;
    line-height: 22px;
    margin: 0 10px;
   }
   .content{
      padding-left: 10px;
      padding-right: 10px;
      color: #666;
      word-break: break-all;
     line-height: 24px;
     font-size: 12px;
     display: block;
   }
   .am-panel-default{
      border-color:#5085ff5e;
      margin-bottom: 10px;
      border-radius:6px;
   }
   .unread{
      border-color:#5085ff;
   }
   .avatar-bar{
      height: 40px;
      width: 40px;
      display: inline-block;
      overflow: hidden;
      border-radius: 40px;

   }
   .avatar-img{
      height: 40px;
      display: inline-block;
   }
   .send-bar{
      resize: none;
   }
</style>
