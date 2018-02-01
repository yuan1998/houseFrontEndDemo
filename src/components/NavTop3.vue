<template>
   <transition>
      <div id="NavTop-3">
         <div class="am-topbar" style="margin-bottom: 0px" v-if="getUser">
            <span class="am-topbar-brand">
               <router-link class="am-monospace" to="/" >
                  4n!o
               </router-link>
            </span>

            <button class="am-topbar-btn am-topbar-toggle am-btn am-btn-link am-btn-sm am-show-sm-only" data-am-collapse="{target: '#doc-topbar-collapse'}">
               <span class="am-sr-only">{{getUser.username}}</span> <span class="am-icon-bars"></span>
            </button>
            <div class="am-collapse am-topbar-collapse" id="doc-topbar-collapse">
               <div class="am-topbar-right">
                  <ul class="am-nav am-nav-pills am-topbar-nav">
                     <router-link tag="li" active-class="am-active" to="/" exact>
                        <a >首页</a>
                     </router-link>
                     <router-link tag="li" active-class="am-active" to="/user"  exact>
                        <a class="avatar-bar am-hide-sm">
                           <img class="am-circle am-img-responsive avatar-img"  :src="getAvatar">
                        </a>
                        <a class="am-show-sm-only">
                           <span class="am-padding-right"><img class="am-circle" width="35" height="35"  :src="getAvatar"></span>{{getUser.username}}
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
               return "http://localhost:1234/storage/img/"+this.getUser.avatar_url.name
            }
            return require('../../storage/notAvatar.png');
         }
      }
   }
</script>

<style scoped>
   .avatar-bar{
      height: 64px;
      padding-top: 10px !important;
      /*padding-bottom: 10px;*/
   }
   .avatar-img{
      width: 40px;
      height: 40px;
      display: block;
      border: 2px solid rgba(255,255,255,0.7);
      background: rgba(255,255,255,0.7);
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
