<template>
   <transition>
      <div id="h-footer" class="am-cf">
         <div class="am-container">
            <div class="warp am-cf">
               <div class="am-u-md-4  am-g-collapse">
                  <div class="am-u-sm-12 am-text-middle">
                     <span class="am-fl am-inline-block">
                        <i class="am-icon-phone"></i>
                     </span>
                     <div class='am-block'>
                        <div class="title">24小时中文客服</div>
                        +86 10086

                     </div>
                  </div>
               </div>
               <div class="am-u-md-2">
                  <div class="header">4n!o</div>
                  <div class="item"><a class="am-link" href="#">帮助</a></div>
                  <div class="item"><a class="am-link" href="#">政策</a></div>
                  <div class="item"><a class="am-link" href="#">条款</a></div>
                  <div class="item"><a class="am-link" href="#">隐私政策</a></div>
               </div>
               <div class="am-u-md-2">
                  <div class="header">发现</div>
                  <div class="item"><a class="am-link" href="#">信任与安全</a></div>
                  <div class="item"><a class="am-link" href="#">网站地图</a></div>
               </div>
               <div class="am-u-md-2 am-u-end">
                  <div class="header">卖房</div>
                  <div class="item"><a class="am-link" href="#">为什么卖房</a></div>
                  <div class="item"><a class="am-link" href="#">房主义务</a></div>
               </div>
            </div>
            <div class="about am-u-sm-12 am-text-center">
               <div>陕ICP备1600228号-4 • VERSION 1.2.1</div>
               <div>BIAOYANSU.COM © 2017-2018</div>
            </div>
         </div>
      </div>
   </transition>
</template>

<script>
   export default{
      name:"house_footer",

   }
</script>

<style scoped>
   #h-footer{
      padding-top: 60px;
      border-top:1px solid #e0e0e0;
      margin-top: 50px;
      padding-bottom: 50px;
   }
   .header{
      font-size: 16px;
      font-weight: 600;
      line-height: 28px;
      padding-bottom: 13px;
      color:#484848;
   }

   .am-u-md-3 .item:first-child{
      /*padding-top: 15px;*/
   }
   .item a{
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      color:#666;
   }
   .about{
      padding-top: 30px;
   }

   @media only screen and (min-width: 0px) and (max-width:639px){
      .am-u-md-2{
         padding-top: 15px;
      }
      .am-u-md-4{
         margin-bottom: 3px;
      }
   }

   .about{
      margin-top: 15px;
      color:#666;
   }
   .am-u-sm-12 i{
      font-size: 35px;
      margin-right: 25px;
      color:#484848;
   }
   .am-u-sm-12 .am-block{
      padding-top: 8px;
      font-size: 14px;
      font-weight: 400;
      line-height: 18px;
      color:#666;
   }

   .am-u-sm-12 .am-block .title{
      color:#484848;
      font-weight: 500;
   }
   .am-u-sm-12 button{
      font-size: 18px;
      font-weight: 400;
      color:#fff;
      border-radius:5px;
      background: #ff5a5f;
      padding: 0.5em 0.8em;
   }

</style>
