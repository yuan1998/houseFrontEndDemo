<template>
   <transition>
      <div id="side-bar">
         <div class="user-menu-btn am-show-sm">
             <a data-am-offcanvas="{target:'#user-side-menu-bar'}" :class="{ 'mark' : getUserMessage+getWebMessage >0}" class="am-icon-btn am-icon-bars"><sup></sup></a>
          </div>
          <div id="user-side-menu-bar" class="am-offcanvas">
             <div class="am-offcanvas-bar ">
                <div class="am-offcanvas-content" >
                   <div class="am-g am-g-collapse">
                      <ul class="am-nav">
                         <router-link to="/user" tag="li" v-if="getUser" class="">
                            <div class=" am-block">
                               <span class="avatar-bar am-circle center-img" :style="'background-image:url('+getAvatar+')'">
                                  <!-- <img class="avatar-img " :src="getAvatar" > -->
                               </span>
                               <span style="position: absolute;top: 3px;padding-left: 7px;">{{getUser.username}}</span>
                            </div>
                         </router-link>
                         <li class="am-nav-header">导航</li>
                         <router-link class="am-active" @click.native="sideBarHide" active-Class="am-active" tag="li" to="/" exact>
                            <a>首页</a>
                         </router-link>
                         <router-link @click.native="sideBarHide" active-Class="am-active" tag="li" to="/readHouses" exact>
                            <a>看房</a>
                         </router-link>
                         <router-link @click.native="sideBarHide" active-Class="am-active" tag="li" to="/yezhu/maifang" exact>
                            <a >我要卖房</a>
                         </router-link>
                         <template v-if='getUser'>
                            <li class="am-nav-header">用户</li>
                            <router-link @click.native="sideBarHide" active-Class="am-active" tag="li" to="/user/info" exact>
                               <a>我的资料 </a>
                            </router-link>
                            <router-link @click.native="sideBarHide" active-Class="am-active" tag="li" to="/user/commissioned" exact>
                                <a >我的委托</a>
                            </router-link>
                            <router-link @click.native="sideBarHide" active-Class="am-active" tag="li" to="/user/transactionlog" exact>
                               <a>交易记录</a>
                            </router-link>
                            <li class="am-nav-header">消息</li>
                            <router-link @click.native="sideBarHide" active-Class="am-active" tag="li" to="/message/webMessage" exact>
                               <a>站内消息
                                  <span v-show="getWebMessage > 0" class="am-badge am-badge-secondary am-fr am-margin-right am-text-middle">{{getWebMessage}}</span>
                               </a>
                            </router-link>
                            <router-link @click.native="sideBarHide" active-Class="am-active" tag="li" to="/message/userMessage" exact>
                               <a>私信
                                  <span v-show="getUserMessage >0" class="am-badge am-badge-secondary am-fr am-margin-right am-text-middle">{{getUserMessage}}</span>
                               </a>
                            </router-link>
                            <li @click.native="sideBarHide,logoutEvent">
                               <a>
                                 登出
                               </a>
                            </li>
                            <template v-if="getUser.permission >3">
                                 <li class="am-nav-header">后台</li>

                                <router-link @click.native="sideBarHide" active-Class="am-active" tag="li" to="/user/commissioned" exact>
                                    <a >用户管理</a>
                                </router-link>
                                <router-link @click.native="sideBarHide" active-Class="am-active" tag="li" to="/user/commissioned" exact>
                                    <a >委托管理</a>
                                </router-link>
                                <router-link @click.native="sideBarHide" active-Class="am-active" tag="li" to="/user/commissioned" exact>
                                    <a >房屋管理</a>
                                </router-link>
                            </template>
                         </template>
                         <template v-else>
                            <router-link @click.native="sideBarHide" active-Class="am-active" tag="li" to="/login" exact>
                               <a>
                                  登录
                               </a>
                            </router-link>
                            <router-link @click.native="sideBarHide" active-Class="am-active" tag="li" to="/signup" exact>
                               <a>
                                  注册
                               </a>
                            </router-link>
                         </template>
                      </ul>
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
  name: 'offCanvas',
  data(){
     return {
       user:null,
       userMessage:0,
       webMessage:0,
     }
  },
  mounted:function()
  {

  },
  methods:
  {
     logoutEvent()
     {
        sender('/api/user/logout').then(res=>{
           store.dispatch('user/saveUser',null);
           router.push({path:'/'});
        })
     },
     sideBarHide(){
        $('#user-side-menu-bar').offCanvas('close');
     },
  },
  computed: {
     msg(){
        return this.$store.getters['msg'];
     },
     getUser(){
        return this.$store.getters['user/user'];
     },
     getUserMessage(){
        return this.$store.getters['message/userMessageCount'];
     },
     getWebMessage(){
        return this.$store.getters['message/webMessageCount'];
     },
     getAvatar(){
        if(this.getUser.avatar_url != false && 'name' in (this.getUser.avatar_url||{})) {
           return this.getUser.avatar_url.get;
        }
        return require('../../storage/notAvatar.png');
     }
  }
}
</script>

<style scoped>
.avatar-img{
   height: 32px;
}
.avatar-bar{
  height: 32px;
  width: 32px;
  /*overflow: hidden;*/
}
#user-side-menu-bar .am-offcanvas-bar{
   background: #fff;
   border-right:none;
}
#user-side-menu-bar .am-offcanvas-content{
   padding-left:0px;padding-right:0px;
}
#user-side-menu-bar li.am-active a{
   color: #5085FF;
    border-right: 2px solid #5085FF;
    background: #dce7ff;
     font-size: 14px;

}
#user-side-menu-bar li:not(.am-active) a:hover{
   color: #5085FF;
    border-right: 2px solid #5085FF;
    background: #dce7ff;
    cursor: pointer;
}
#user-side-menu-bar li:not(.am-active) a{
     font-size: 14px;
    display: inline-block;
    width: 100%;
    color: #666;
}
#user-side-menu-bar li.am-active{

}

#user-side-menu-bar .am-nav-header{
   color:#666;
}
.am-offcanvas-bar:after{
   background: #dce7ff;
}
.user-menu-btn{
   position:fixed;
   bottom: 80px;
   right: 20px;
   cursor:pointer;
  z-index: 10;
}
.user-menu-btn a{
   background: #fff;
   color:#056ea3;
   border:1px solid #dce7ff;
   transition:0.4s;
}
.user-menu-btn a:hover{
   color:#064768;
   background: #fff0ff;
}
</style>
