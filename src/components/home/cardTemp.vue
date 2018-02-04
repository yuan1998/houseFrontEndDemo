<template>
   <transition>
      <div class="card-item" v-show="data != false">
         <div class="">
            <div class="am-cf">
               <div class="img-wrap">
                  <div class="img-bar">
                     <div class="cover-bar center-img" :style="'background-image:url('+data.house_img.cover[0].get+')'"></div>
                  </div>
               </div>

            </div>
            <div class="text">
               <div class="price">
                  ¥{{data.price}}万元
               </div>
               <div class="title">
                  {{data.city}} {{data.community}}
               </div>
               <div class="info">
                  <span>{{data.area}}平米</span>
                  <span>·</span>
                  <span v-if="data.room_count.hall >0">{{data.room_count.hall}}厅</span>
                  <span v-if="data.room_count.bedroom >0">{{data.room_count.bedroom}}卧</span>
                  <span v-if="data.room_count.bathroom >0">{{data.room_count.bathroom}}卫</span>
                  <span v-if="data.room_count.belcony >0">{{data.room_count.belcony}}阳台</span>
               </div>
            </div>
         </div>
      </div>
   </transition>
</template>

<script>
   export default{
      name:'cardTemp',
      props:['data'],
      methods:{

      }
   }
</script>


<style scoped>
   .cover-bar{
      height: 100%;
      width: 100%;
   }
   @media only screen and (min-width: 1025px){
      /*.cover-bar{
         max-height: 222px;
      }*/
   }
   @media only screen and (min-width: 641px) and (max-width: 1024px){
      /*.cover-bar{
         max-height: 333px;
      }*/
   }
   .card-item{
      margin-left: 7px;
      margin-right: 7px;
      margin-bottom: 18px;
   }
   .price{
       word-wrap: break-word !important;
       font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif !important;
       font-size: 19px !important;
       line-height: 24px !important;
       padding-top: 0px !important;
       padding-bottom: 0px !important;
       color: #484848 !important;
       font-weight: 700 !important;
   }
   .text{
      margin-top: 8px;
   }
   .title{
       word-wrap: break-word !important;
       font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif !important;
       font-size: 16px !important;
       font-weight: 400 !important;
       color:#6d6d6d !important;
       padding-top: 7px;
   }
   .info{
      word-wrap: break-word !important;
      font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif !important;
      font-size: 14px !important;
       font-weight: 400 !important;
       color:#6d6d6d !important;
   }
   .img-wrap{
      padding-top: 66.99%;
      position: relative !important;
       width: 100% !important;
       z-index: 0 !important;
   }
   .img-bar{
       position: absolute !important;
       top: 0px !important;
       bottom: 0px !important;
       left: 0px !important;
       right: 0px !important;
       height: 100% !important;
       width: 100% !important;
   }
</style>
