<template>
  <div id="app" style="" class="am-cf">
    <transition class="am-cf" name="fade" mode="out-in">
       <router-view></router-view>
    </transition>
  </div>
</template>

<script>
</script>

<style>
[v-cloak]{
   display: none;
}
*{
  position:relative;
  font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif !important;
}
img {
  box-sizing: border-box;
  border: 0;
}
textarea{
  resize: none;
}
/*#appHome{
  background-image: url('https://farm4.staticflickr.com/3854/32764887833_7c91946505_k.jpg');
  height: 500px;
    background-color: transparent;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}*/

   .center-img{
    background-size: cover;
    background-position: center;
     display: inline-block;
     background-repeat: no-repeat;
   }
   .width-img{
      background-size: 100% 100%;
      background-position: center;
     display: inline-block;
     background-repeat: no-repeat;
   }
#nprogress .nprogress-bar{
  background: #8387d2;
}
#nprogress .nprogress-peg{

   -webkit-box-shadow: 0 0 10px #c91f63, 0 0 5px #c91f63;
   box-shadow: 0 0 10px #c91f63, 0 0 5px #c91f63;

}
#nprogress .nprogress-spinner-icon{
  border-top-color:#8387d2;
  border-right-color: #c91f63;
}
#signup-login-bar .box{
   padding-left: 0;
   padding-right: 0;
}
#signup-login-bar .am-container{
   padding-top: 200px;
}
#signup-login-bar .header{
   font-weight: 500;
   font-size: 50px;
   color:#fff;
   user-select: none;
   margin-bottom: 10px;
}

</style>
