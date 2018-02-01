<template>
   <transition>
      <div class="user-home-page">
         <div class="content" v-if="getUser">
            <div class="user-bar">
               <div class="user-info">
                  <avatar></avatar>
                  <div class="am-text-center">
                     <div>
                        用户名:{{getUser.username}}
                     </div>
                     <div>
                        xxxx
                     </div>
                     <div>
                        xxxx
                     </div>
                     <div>
                        <button href="#" class="am-btn info-read-btn">
                           <span class="am-block">查看详细</span>
                           <i class="am-icon-angle-down"></i>
                        </button>
                     </div>
                  </div>
               </div>
               <div class="user-commissioneds">
                  <div class="commissioned-header am-text-center">
                     <span class="am-text-xl">我的委托</span>
                  </div>
                  <div class="am-panel-group" v-if="getCommissioned" id="commisioned-bar">
                     <template v-for="(item,n) in getCommissioned">
                        <tempc v-bind:data="item" v-bind:index="n"></tempc>
                     </template>
                     <div class="am-text-center am-margin-top">
                        <span style="color:#5085ff">.....</span>
                     </div>
                  </div>
                  <div class="am-text-center" v-else>
                     <span class="am-text-xxl">Epmty...</span>
                  </div>
                  <div class="am-text-center">
                     <button href="#" class="am-btn cimmissioned-read-btn">
                        <span class="am-block">查看更多</span>
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

import tempc from '@/components/user/homeCommissioned'

import avatar from '@/components/user/userAvatar'

   export default{
      components:{
         tempc,
         avatar,
      },
      name:'userHome',
      data(){
         return{
            user:null,
            newAvatar:[],
         }
      },
      methods:{
         getUserD(){
            let user = this.$store.getters['user/user'];
            this.user =  user ||'error';
         }
      },
      computed:{
         getUser(){
            return this.$store.getters['user/user'];
         },
         getCommissioned(){
            return this.$store.getters['user/getComM'];
         }
      }
   }
</script>

<style scoped>
.user-info{
   margin-bottom: 50px;
}
.avatar-bar img{
   width:200px;
    height:200px;
     line-height: 0;
    /* remove line-height */
    display: inline-block;   /* circle wraps image */
    border-radius: 50%;  /* relative value */
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    transition: linear 0.25s;

}
.avatar-bar{
   display: inline-block;
   width: 200px;
   height: 200px;
    border-radius:200px;
    background: #ececec;
   box-shadow: 0px 0px 1px rgba(0,0,0,0.4);
}
.user-avatar{
   min-height: 270px;
}
.cimmissioned-read-btn,
.info-read-btn{
   color:#5085FF;
   transition: 0.5s;
   padding:6px 10px 0px 10px;
   border-radius: 5px;
}
.info-read-btn:hover{
   /*background: #f0f0f0;*/
   color:#004dff;
}
.uploadSuccess,
.avatar-btn{
   position:absolute;
   top: 50%;
   left: 50%;
   transform:translate(-50%,-50%);
   color:rgba(255,255,255,0.9);
   font-weight: 600;
   display: block;
}

.avatar-btn{

   opacity:0.2;
   transition:opacity 0.5s ease-out;
   border-radius:6px;

   font-size: 20px;
   background: rgba(0,0,0,0.3);
   border: 3px solid rgba(255,255,255,0.7);

}

.uploadSuccess{
   font-size: 75px;
}

.avatar-btn:hover,
.user-avatar img:hover~.avatar-btn{
   opacity:1;
}
  .am-panel-group{
    margin-bottom: 0.3rem;
  }

</style>
