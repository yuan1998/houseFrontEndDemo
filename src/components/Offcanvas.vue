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
                         <li class="am-nav-header">导航</li>
                         <router-link @click.native="sideBarHide" active-Class="am-active" tag="li" to="/" exact>
                            <a><i class="am-icon-home"></i>首页</a>
                         </router-link>
                         <router-link @click.native="sideBarHide" active-Class="am-active" tag="li" to="/readHouses" exact>
                            <a><i class="am-icon-building-o"></i>看房</a>
                         </router-link>
                         <router-link @click.native="sideBarHide" active-Class="am-active" tag="li" to="/yezhu/maifang" exact>
                            <a ><i class="am-icon-money"></i>我要卖房</a>
                         </router-link>
                         <template v-if='getUser'>
                            <li class="am-nav-header">用户</li>
                            <router-link @click.native="sideBarHide" active-Class="am-active" tag="li" to="/user/info" exact>
                               <a><i class="am-icon-user"></i>我的资料 </a>
                            </router-link>
                            <router-link @click.native="sideBarHide" active-Class="am-active" tag="li" to="/user/commissioned" exact>
                                <a ><i class="am-icon-bell-o"></i>我的委托</a>
                            </router-link>
                            <router-link @click.native="sideBarHide" active-Class="am-active" tag="li" to="/user/transactionlog" exact>
                               <a><i class="am-icon-align-left"></i>交易记录</a>
                            </router-link>
                            <li class="am-nav-header">消息</li>
                            <router-link @click.native="sideBarHide" active-Class="am-active" tag="li" to="/message/webMessage" exact>
                               <a>站内消息
                                  <span v-show="getWebMessage > 0" class="am-badge am-badge-success am-fr am-margin-right am-text-middle">{{getWebMessage}}</span>
                               </a>
                            </router-link>
                            <router-link @click.native="sideBarHide" active-Class="am-active" tag="li" to="/message/userMessage" exact>
                               <a>私信
                                  <span v-show="getUserMessage >0" class="am-badge am-badge-success am-fr am-margin-right am-text-middle">{{getUserMessage}}</span>
                               </a>
                            </router-link>
                            <li @click.native="sideBarHide,logoutEvent">
                               <a>
                                 登出
                               </a>
                            </li>
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
     }
  }
}
</script>

<style scoped>


</style>
