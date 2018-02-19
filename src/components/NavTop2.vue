<template>
   <div id="nav-top-2">
      <div class="am-topbar" style="margin-bottom: 0px">
         <router-link tag="span" to="/" class="am-topbar-brand">
               4n!o
         </router-link>

         <button class="am-topbar-btn am-topbar-toggle am-btn am-btn-link am-btn-sm am-show-sm-only" data-am-collapse="{target: '#doc-topbar-collapse'}">
            <span class="am-sr-only">菜单</span> <span class="am-icon-bars"></span>
         </button>
         <div class="am-collapse am-topbar-collapse" id="doc-topbar-collapse">
            <div class="am-topbar-right">
               <ul class="am-nav am-nav-pills am-topbar-nav">
                  <router-link tag="li" active-class="am-active" to="/" exact>
                     <a >首页</a>
                  </router-link>
                  <router-link tag="li" active-class="am-active" to="/login" exact>
                     <a >登陆</a>
                  </router-link>
                  <router-link tag="li" active-class="am-active" to="/signup" exact>
                     <a >注册</a>
                  </router-link>
               </ul>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   export default {
      name:'navTop2',
   }
</script>

<style scoped>
#nav-top-2 .am-topbar{
   background: rgba(0,0,0,0.1);
   border-bottom: none;
  box-shadow: 0px 2px 5px rgba(0,0,0,0.2);

}

#nav-top-2 li:not(.am-active) a:hover{
   background: rgba(255,255,255,0.2);
}

.am-topbar-brand{
   z-index: 5;
   color:#f1f1f1;
   font-size: 18px;
   font-weight: 400;
   cursor:pointer;
}
</style>
