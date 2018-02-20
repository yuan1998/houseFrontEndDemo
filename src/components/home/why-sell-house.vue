<template>
   <div class="middle-bar">
      <div class="am-container">
         <div class="content">
            <div class="hd">
               <div class="title">
                  海纳百川,精选全球的高品质房源与服务
               </div>
               <div class="sub-title">
                  发布房源,查找房源.......
               </div>
            </div>
            <div class="bd">
               <div class="am-u-sm-12 am-u-md-4 am-text-center">
                  <div class="icon">
                     <div class="icon-home center-img contain-img">

                     </div>
                     <!-- <i class="am-icon-home"></i> -->
                  </div>
                  <div class="text">
                     <div class="title">房源</div>
                     <div class="item-list">
                        <div class="item">
                           发布房源
                        </div>
                        <div class="item">
                           查找房源
                        </div>
                     </div>

                  </div>
               </div>
               <div class="am-u-sm-12 am-u-md-4 am-text-center">
                  <div class="icon">
                     <div class="icon-bell center-img contain-img">

                     </div>
                  </div>
                  <div class="text">
                     <div class="title">
                        服务
                     </div>
                     <div class="item-list">
                        <div class="item-b">
                           24小时中文客服
                        </div>
                        <div class="item-b">
                           +86 10086
                        </div>
                     </div>
                  </div>
               </div>
               <div class="am-u-sm-12 am-u-md-4 am-text-center">
                  <div class="icon">
                     <div class="icon-info center-img contain-img">

                     </div>
                  </div>
                  <div class="text">
                     <div class="title">
                        合作
                     </div>
                     <div class="item-list">
                        <div class="item">
                           职业机会
                        </div>
                        <div class="item">
                           联系我们
                        </div>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </div>
   </div>
</template>

<script>
   export default{
      name:'whySellHouse',
   }
</script>


<style scoped>

   .content{
      margin-top: 60px !important;
   }

   .hd .title{
      font-size: 27px;
      font-weight: 400;
      line-height: 32px;
      color:#333;
      padding-left: 5px !important;
   }

   .hd .sub-title{
      padding-top: 10px;
      font-size: 18px;
      font-weight: 400;
      line-height: 32px;
      color:#666;
      padding-left: 11px;
   }


   .item-list{
      padding-top: 10px;
   }

   .item-list .item-b,
   .item-list .item{

      padding-left: 5px;
      padding-right: 8px;
      font-size: 14px;
      color:#999;
   }

   .item-list .item{
      border-right: 1px solid #e8e8e8;
      display: inline-block;
      cursor:pointer;

   }

   .item-list .item:last-child{
      border-right: none;
   }

   .text .title{
      padding-top: 5px;
      font-size: 17px;
      font-weight: 500;
      color:#555;
   }

   .icon i{
      font-size: 60px;
      color:#b1366f;
   }
   .icon-home{

      background-image: url('../../../storage/icon/小区.png');
   }
   .icon-bell{

      background-image: url('../../../storage/icon/客服.png');
   }
   .icon-info{

      background-image: url('../../../storage/icon/团队.png');
   }

   .bd{
      padding-top: 20px;
   }


   .icon [class^=icon-]{
      filter:hue-rotate(380deg);
      width: 86px;
      height: 86px;
   }
</style>
