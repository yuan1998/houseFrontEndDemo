<template>
   <transition>
      <div id="page-404-bar" class="am-vertical-align am-text-center">
         <div class="am-vertical-align-middle ">
            <div class="header">
               <div class="am-animation-fade">
                  <span class="am-monospace error-title am-text-xxxl">ERROR 404</span>
               </div>
            </div>
            <div class="content">
               <div class="">
                  <span class="am-monospace am-animation-fade delay am-text-xxl">
                     Oops! The Page Is Not Define!
                  </span>
               </div>
               <div class="">
                  <span class="am-monospace am-animation-fade delay am-text-xl">
                     <router-link class="am-link am-muted" to="/">I So Sorry.But You Can Back To Home...</router-link>
                  </span>
               </div>
            </div>
         </div>
      </div>
   </transition>
</template>

<style scoped>
*{
   user-select: none;
}
#page-404-bar{
   display: block;
   position:fixed;
   top: 0;left: 0;right: 0;bottom: 0;
   background: #ffbfca;
   min-width: 410px;
}

#page-404-bar .header span{
   color:#fff;
   position:relative;
}

#page-404-bar .header span:before{
   content:'';
   width: 25px;
   height: 3px;
   background: rgba(255,255,255,1);
   position:absolute;
   bottom: 0;
   left: 3px;
   transition:width 0.5s ease-out;
}
#page-404-bar .header span:hover:before{
   width: 408px;
}
#page-404-bar .content span{
   color:#b02374;
}
.delay{
   -webkit-animation-delay: 0.5s;
  animation-delay: 0.5s;
}
.error-title{
       font-size: 13.2rem;
}
</style>
