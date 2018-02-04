<template>
   <transition>
      <div id="NavTop-3" style="min-width: 300px;">
         <div class="am-topbar" style="margin-bottom: 0px" v-if="getUser">
            <router-link tag="span" to="/" class="am-topbar-brand">
               <a class="am-monospace"  >
                  4n!o
               </a>
            </router-link>
            <button class="am-topbar-btn am-topbar-toggle am-btn am-btn-link am-btn-sm am-show-sm-only" data-am-collapse="{target: '#doc-topbar-collapse'}">
               <span class="am-sr-only">{{getUser.username}}</span> <span class="am-icon-bars"></span>
            </button>
            <div class="am-collapse am-topbar-collapse" id="doc-topbar-collapse">
               <div class="am-topbar-right">
                  <ul class="am-nav am-nav-pills am-topbar-nav">
                     <router-link tag="li" active-class="am-active" to="/" exact>
                        <a >首页</a>
                     </router-link>
                     <router-link tag="li" class="am-active" to="/user"  exact>
                        <div class="avatar-bar am-hide-sm center-img" :style="'background-image:url('+ getAvatar+');'">
                          <!-- <img class="avatar-img"  :src="getAvatar"> -->
                        </div>
                        <a class="am-show-sm-only">
                           <span class="am-inline-block center-img am-text-middle" :style="'background-image:url('+ getAvatar+');width: 35px;height: 35px;border-radius:35px;'">
                            <!-- <img class="" style="height: 35px;vertical-align: top;" :src="getAvatar"> -->
                          </span>
                          <span class="am-text-middle">
                            {{getUser.username}}
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
   export default {
      name:'navTop3',
      computed:{
         getUser(){
            return this.$store.getters['user/user'];
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
  *{
    user-select: none;
  }
 .avatar-bar{

  width: 42px;
  height: 42px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 1px;
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
 }
 .am-topbar-nav > li > img,
 .am-topbar-nav > li > a {
    position: relative;
    line-height: 64px;
    padding: 0 10px;
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
  height: 64px;
  line-height: 64px;
}
.am-nav > li {
    position: relative;
    display: block;
}
.am-topbar-btn {
    margin-top: 16px;
}
</style>
