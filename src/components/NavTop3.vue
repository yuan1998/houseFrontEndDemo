<template>
   <transition>
      <div id="NavTop-3" style="min-width: 300px;">
         <div class="am-topbar" style="margin-bottom: 0px" v-if="_isLogin">
            <div class="am-topbar-brand">
               <router-link to="/" class="am-monospace"  >
                  4nn
               </router-link>
            </div>
            <button class="am-topbar-btn am-topbar-toggle am-btn am-btn-link am-btn-sm am-show-sm-only" data-am-collapse="{target: '#doc-topbar-collapse'}">
               <span class="am-sr-only">{{_getUsername}}</span> <span class="am-icon-bars"></span>
            </button>
            <div class="am-collapse am-topbar-collapse" id="doc-topbar-collapse">
               <div class="am-topbar-right">
                  <ul class="am-nav am-nav-pills am-topbar-nav">
                     <router-link tag="li" active-class="am-active" to="/" exact>
                        <a >首页</a>
                     </router-link>
                     <router-link tag="li" class="am-active" to="/user"  exact>
                        <div class="avatar-bar am-hide-sm center-img" :style="'background-image:url('+ _getAvatar+');'">
                          <!-- <img class="avatar-img"  :src="_getAvatar"> -->
                        </div>
                        <a class="am-show-sm-only">
                           <span class="am-inline-block center-img am-text-middle" :style="'background-image:url('+ _getAvatar+');width: 35px;height: 35px;border-radius:35px;'">
                            <!-- <img class="" style="height: 35px;vertical-align: top;" :src="getAvatar"> -->
                          </span>
                          <span class="am-text-middle">
                            {{_getUsername}}
                          </span>
                        </a>
                     </router-link>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   </transition>
</template>

<script>
import m_user from '@/mixin/user.js';

   export default {
      name:'navTop3',
      mixins:[m_user],
      computed:{

      }
   }
</script>

<style scoped>
  *{
    user-select: none;
  }
  .am-topbar-brand{
    z-index: 5 !important;
  }
 .avatar-bar{

  width: 42px;
  height: 42px;
  border:2px solid #f1f1f1;
  border-radius: 42px;
  margin: 11px;
 }

 .avatar-img{
        height: 42px;
  line-height: 0;
  display: inline-block;
  transition: 0.25s linear;
 }
 .am-topbar{
    background: #fff;
    box-shadow: 0px 2px 5px #f0f0f0;
    position: relative;
    min-height: 64px;
    margin-bottom: 1rem;
    background: #fff;
    border-width: 0 0 1px;
    border-style: solid;
    border-color: #f0f0f0;
    color: #666;
    z-index: 5;
 }
  .am-topbar-nav > li{
    height: 68px;
  }
 .am-topbar-nav > li > a {
    position: relative;
    line-height: 68px;
    height: 100% !important;
    padding: 0 15px;
 }
.am-topbar-nav > li:not(.am-active) > a:hover,
.am-topbar-nav > li.am-active{
   border-bottom: 2px solid #5085ff;
}
.am-nav li.am-active div,
.am-nav li.am-active a{
  color: #0350ff;
    background-color: #0e90d233;
}
.am-topbar-nav > li > a:after{
   opacity: 0;
}
.am-topbar-brand {
  padding-left: 0.625rem;
  float: left;
  font-size: 18px;
  height: 68px;
  line-height: 68px;
}
.am-nav > li {
    position: relative;
    display: block;
}
.am-topbar-btn {
    margin-top: 16px;
}
.am-topbar-brand a:hvoer,
.am-topbar-brand a:active,
.am-topbar-brand a:focus{
  color:#ff5a5f;
}
</style>
