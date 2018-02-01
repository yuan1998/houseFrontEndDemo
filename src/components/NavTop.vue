<template>
   <div id="nav-top">
      <!-- 导航 -->
      <div class="nav am-g">
         <div class="am-topbar am-topbar-inverse" style="margin-bottom: 0px">
               <span class="am-topbar-brand">
                  <router-link class="am-monospace" to="/" >
                     4n!o
                  </router-link>
                  <small ><i class="am-icon-location-arrow"></i>{{getIpCity}}</small>
               </span>

               <div class="am-topbar-btn am-topbar-toggle am-show-sm-only">
                  <ul class="am-nav am-nav-pills am-topbar-nav">
                     <li data-am-offcanvas="{target:'#user-side-menu-bar'}">
                        <a v-if="getUser" :class="{ 'mark' : getUserMessage+getWebMessage >0}">{{getUser.username}} <span class="am-icon-caret-down"></span><sup></sup></a>
                        <a v-else >菜单 <span class="am-icon-caret-down"></span></a>
                     </li>
                  </ul>
               </div>
               <div class="am-collapse am-topbar-collapse" id="my-nav">
                  <ul class="am-nav am-nav-pills am-topbar-nav">

                  </ul>
                  <div class="am-topbar-right">
                     <ul class="am-nav am-nav-pills am-topbar-nav">
                        <router-link tag="li" active-class="am-active" to="/" exact>
                           <a >首页</a>
                        </router-link>
                        <router-link tag="li" active-class="am-active" to="/readHouses" exact>
                           <a >看房</a>
                        </router-link>
                        <li class="">
                           <a href="">哩个</a>
                        </li>
                        <li>
                           <router-link to="/yezhu/maifang">我要卖房</router-link>
                        </li>
                        <template v-if="getUser">
                           <li v-on:mouseenter="downOpenEvent('.messageBarDown')" v-on:mouseleave="downCloseEvent('.messageBarDown')" class="am-dropdown messageBarDown">
                              <a :class="{ 'mark' : getUserMessage+getWebMessage >0}">消息<sup></sup></a>
                              <ul v-on:mouseleave="downCloseEvent('.messageBarDown')" class="am-dropdown-content" id="home-message">
                                 <router-link tag="li" to="/user/webMessage" active-class="am-active" exact>
                                    <a >
                                       站内消息
                                       <span v-show="getWebMessage >0 " class="am-badge am-badge-secondary am-round am-fr am-margin-right am-text-middle">{{getWebMessage}}</span>
                                    </a>
                                 </router-link>
                                 <router-link tag="li" to="/user/userMessage" active-class="am-active" exact>
                                    <a >
                                       私信
                                       <span v-show="getUserMessage >0" class="am-badge am-badge-secondary am-round am-fr am-margin-right am-text-middle">{{getUserMessage}}</span>
                                    </a>
                                 </router-link>
                              </ul>
                           </li>
                           <li  v-on:mouseenter="downOpenEvent('.userBarDown')" v-on:mouseleave="downCloseEvent('.userBarDown')" class="am-dropdown userBarDown">
                              <a href="#" class="am-dropdown-toggle">{{getUser.username}}<i class="am-icon-caret-down"></i></a>
                              <ul v-on:mouseleave="downCloseEvent('.userBarDown')" class="am-dropdown-content">
                                 <li>
                                    <router-link to="/user">个人信息</router-link>
                                 </li>
                                 <li>
                                    <router-link to="/user/commissioneds">我的委托</router-link>
                                 </li>
                                 <li>
                                    <router-link to="/user/transactionlog">交易记录</router-link>
                                 </li>
                                 <li v-if="getUser.permission > 3">
                                    <router-link to="/admin/house">后台管理</router-link>
                                 </li>
                                 <li>
                                    <a v-on:click="logoutEvent" href="#">登出</a>
                                 </li>
                              </ul>
                           </li>
                        </template>
                        <li v-else>
                           <router-link to="/login" title="登陆">登陆</router-link>
                        </li>
                     </ul>
                  </div>
               </div>
         </div>
      </div>
      <div id="side-bar">
         <div class="user-menu-btn am-hide">
            <a data-am-offcanvas="{target:'#user-side-menu-bar'}" :class="{ 'mark' : getUserMessage+getWebMessage >0}" class="am-icon-btn am-icon-bars"><sup></sup></a>
         </div>
         <div id="user-side-menu-bar" class="am-offcanvas">
            <div class="am-offcanvas-bar ">
               <div class="am-offcanvas-content" >
                  <div class="am-g am-g-collapse">
                     <ul class="am-nav">
                        <li class="am-nav-header">导航</li>
                        <router-link @click.native="sideBarHide" active-class="am-active" tag="li" to="/" exact>
                           <a><i class="am-icon-home"></i>首页</a>
                        </router-link>
                        <router-link @click.native="sideBarHide" active-class="am-active" tag="li" to="/readHouses" exact>
                           <a><i class="am-icon-building-o"></i>看房</a>
                        </router-link>
                        <router-link @click.native="sideBarHide" active-class="am-active" tag="li" to="/yezhu/maifang" exact>
                           <a ><i class="am-icon-money"></i>我要卖房</a>
                        </router-link>
                        <template v-if='getUser'>
                           <li class="am-nav-header">用户</li>
                           <router-link @click.native="sideBarHide" active-class="am-active" tag="li" to="/user/info" exact>
                              <a><i class="am-icon-user"></i>我的资料 </a>
                           </router-link>
                           <router-link @click.native="sideBarHide" active-class="am-active" tag="li" to="/user/commissioned" exact>
                              <a ><i class="am-icon-bell-o"></i>我的委托</a>
                           </router-link>
                           <router-link @click.native="sideBarHide" active-class="am-active" tag="li" to="/user/transactionlog" exact>
                              <a><i class="am-icon-align-left"></i>交易记录</a>
                           </router-link>
                           <li class="am-nav-header">消息</li>
                           <router-link @click.native="sideBarHide" active-class="am-active" tag="li" to="/message/webMessage" exact>
                              <a>站内消息
                                 <span v-show="getWebMessage > 0" class="am-badge am-badge-secondary am-round am-fr am-margin-right am-text-middle">{{getWebMessage}}</span>
                              </a>
                           </router-link>
                           <router-link @click.native="sideBarHide" active-class="am-active" tag="li" to="/message/userMessage" exact>
                              <a>私信
                                 <span v-show="getUserMessage >0" class="am-badge am-badge-secondary am-round am-fr am-margin-right am-text-middle">{{getUserMessage}}</span>
                              </a>
                           </router-link>
                           <li @click.native="sideBarHide,logoutEvent">
                              <a>
                                 登出
                              </a>
                           </li>
                        </template>
                        <template v-else>
                           <router-link @click.native="sideBarHide" active-class="am-active" tag="li" to="/login" exact>
                              <a>
                                  登录
                              </a>
                           </router-link>
                           <router-link @click.native="sideBarHide" active-class="am-active" tag="li" to="/signup" exact>
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
   </div>
</template>

<script>

import sender from '@/Sender.js'


export default {
  name: 'navtop',
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
     downOpenEvent($el)
     {
        $($el).dropdown('open');
     },
     downCloseEvent($el){
        $($el).dropdown('close');
     },
     logoutEvent()
     {
        sender('/api/user/logout').then(res=>{
           this.$store.dispatch('user/saveUser',null);
           this.$router.push({path:'/'});
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
     getIpCity(){
        return this.$store.getters['getIpCity'];
     }
  }
}


</script>

<style scoped>
.nav{
  position: absolute;
  z-index: 5;
}
.mark{
   position:relative;
}
.mark sup{
   position:absolute;
   top: 10px;
   border-radius: 50%;
   width: 6px;
   height: 6px;
   background: red;
}
.am-nav li .am-badge{
   margin-top: 4px;
}
.am-topbar-btn{
   cursor:pointer;
}

#side-bar .user-menu-btn{
   position:fixed;bottom: 50px;right: 25px;
}
#side-bar .user-menu-btn .am-icon-btn{
   cursor:pointer;

   background: #9dbaff;
   color:#fff;
}
#user-side-menu-bar .am-offcanvas-bar{
   background: rgba(0,0,0,0.6);
   border-right:none;
}
#user-side-menu-bar .am-offcanvas-content{
   padding-left:0px;padding-right:0px;
}

#user-side-menu-bar li:not(.am-active) a:hover{
   background: rgba(0,0,0,0.8);
   color:#fff;
}

#user-side-menu-bar .am-nav-header{
   color:#fff;
}
#user-side-menu-bar li:not(.am-active) a{
   color:#f0f0f0;
}
#user-side-menu-bar li.am-active a{
   background: rgba(0,0,0,0.7);
}

.nav li:not(.am-active) a:hover{
   background: rgba(0,0,0,0.4);
}
.nav li:not(.am-active) a:after{
   border-bottom-color:rgba(255,255,255,0.7);
}
.am-offcanvas-bar:after {
    width: 0px;
}

.nav .am-topbar{
  background: rgba(0,0,0,0.1);
  border-bottom: none;
  color:#fff;
  box-shadow: 0px 2px 5px rgba(0,0,0,0.2);
}
.am-dropdown-content{
  top: 80%;
}

</style>
