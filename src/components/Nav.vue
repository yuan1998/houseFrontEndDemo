<template>
   <div id="head">
      <!-- 导航 -->
      <div class="nav am-g">
         <div class="am-topbar am-topbar-inverse" style="margin-bottom: 0px">
               <span class="am-topbar-brand">
                  <router-link  to="/" >
                      <a ><i class="am-icon-location-arrow"></i> {{getIpCity}}</a>
                  </router-link>
               </span>
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
                           <li v-on:mouseenter="downOpenEvent('.messageBarDown');downCloseEvent('.userBarDown');" class="am-dropdown messageBarDown">
                              <a :class="{ 'mark' : getUserMessage+getWebMessage >0}">消息<sup></sup></a>
                              <ul v-on:mouseleave="downCloseEvent('.messageBarDown')" class="am-dropdown-content" id="home-message">
                                 <router-link tag="li" to="/message/webMessage" active-class="am-active" exact>
                                    <a >
                                       站内消息
                                       <span v-show="getWebMessage >0 " class="am-badge am-badge-success am-fr am-margin-right am-text-middle">{{getWebMessage}}</span>
                                    </a>
                                 </router-link>
                                 <router-link tag="li" to="/message/userMessage" active-class="am-active" exact>
                                    <a >
                                       私信
                                       <span v-show="getUserMessage >0" class="am-badge am-badge-success am-fr am-margin-right am-text-middle">{{getUserMessage}}</span>
                                    </a>
                                 </router-link>
                              </ul>
                           </li>
                           <li  v-on:mouseenter="downOpenEvent('.userBarDown');downCloseEvent('.messageBarDown');"  class="am-dropdown userBarDown">
                              <a href="#" class="am-dropdown-toggle">{{getUser.username}}<i class="am-icon-caret-down"></i></a>
                              <ul v-on:mouseleave="downCloseEvent('.userBarDown')" class="am-dropdown-content">
                                 <li>
                                    <router-link to="/user/info">个人信息</router-link>
                                 </li>
                                 <li>
                                    <router-link to="/user/commissioned">我的委托</router-link>
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
   </div>
</template>

<script>

import sender from '@/Sender.js'


export default {
  name: 'App',
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
     getIpCity(){
        return this.$store.getters['getIpCity'];
     }
  }
}


</script>
