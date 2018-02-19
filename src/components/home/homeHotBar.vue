<template>
   <transition>
      <div class="HotBar">
         <div class="">
            <div class="header">
               <h2>{{getCity}}热门房源</h2>
            </div>
            <div class="body " v-if="data != false">
               <div class="left-btn am-show-md" @click="ar+=50" v-if="leftHide">
                  <i class=" am-icon-angle-left am-text-xxxl"></i>
               </div>
               <div class="horizontal-container">
                  <div class="horizontal-warp" :style="{transform:transformOff ? 'translateX('+ ar +'%)':'' }">
                     <div class="col-5 " v-for="item in data">
                        <card v-bind:data="item"></card>
                     </div>
                  </div>
               </div>
               <div class="right-btn am-show-md" v-if="rightHide" @click="ar-=50">
                  <i class="am-icon-angle-right"></i>
               </div>
            </div>
            <div class="more-btn">
               <router-link tag="button" :to="'/search?address='+getCity" class="am-btn am-btn-default am-radius">查看更多{{getCity}}的房源</router-link>
            </div>
         </div>
      </div>
   </transition>
</template>


<script>
import card from '@/components/home/cardTemp'

import sender from '@/Sender.js'

   export default{
      name:'homeHotBar',
      components:{
         card,
      },
      data(){
         return {
            data:[],
            ar:0,
            windowWidth:0
         }
      },
      computed:{
         getCity(){
            return this.$store.getters['getIpCity'];
         },
         leftHide(){
            return (this.ar <0);
         },
         rightHide(){
            return (this.ar > -200);
         },
         transformOff(){
            return (this.windowWidth >640 && this.windowWidth <1025);
         }
      },
      mounted(){
         setTimeout(res=>{
            this.getData()
            this.windowWidth = window.innerWidth;
         },100);

         this.$nextTick(res=> {
            window.addEventListener('resize', e=> {
              this.windowWidth = window.innerWidth;
              console.log('width',this.windowWidth)
            });
          })
      },
      methods:{
         getData(){
            sender('/api/house/getHotHouse').then(res=>{
               this.data = res.data.data;


               this.$emit('loadinged')
            })
         }
      }
   }
</script>

<style scoped>
   .header{
       font-weight: 700 !important;
       margin-bottom: 0px !important;
       font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif !important;
       font-size: 24px !important;
       line-height: 28px !important;
       letter-spacing: -0.6px !important;
       padding-top: 2px !important;
       padding-bottom: 5px !important;
       color: #484848 !important;
       border-bottom: 1px solid #f0f0f0;

   }
   .HotBar{
      padding-left: 15px;
      padding-right: 15px;
   }
   .body{
      padding-top: 30px;
   }

   .horizontal-container{
      /*overflow: sr;*/

       margin-left: -8px !important;
       margin-right: -8px !important;
       overflow: hidden !important;
       overflow-y: hidden !important;

   }
   .horizontal-warp{

       margin-bottom: 0px !important;
      padding: 0px !important;

      overflow: scroll !important;
      transition: -ms-transform 0.5s,-webkit-transform 0.5s,transform 0.5s !important;
      white-space: nowrap !important;
      transform: translateX(0%);
   }
   .col-5{
      width: 95%;
      display: inline-block;
   }

   .horizontal-warp::-webkit-scrollbar{
      display: none;
   }

   @media only screen and (min-width: 1025px){
      .col-5{
         width:33.333333%;
      }
      .horizontal-warp{
          white-space: normal !important;

      }
   }
   @media only screen and (min-width: 641px) and (max-width:1024px){
      .col-5{
         width:50%;
      }
      .horizontal-warp{
          white-space: nowrap !important;
         overflow: visible !important;
      }
   }

   .right-btn{
      position:absolute;
      right: -30px;
      top: 50%;
      z-index: 5;
      cursor: pointer;
      color:#666;
   }
   .left-btn{
      position:absolute;
      left: -30px;
      top: 50%;
      z-index: 5;
      cursor: pointer;
      color:#666;
   }
   .left-btn i,
   .right-btn i{
    font-size: 60px;
   }
   .more-btn button{
      font-size: 19px;
      line-height: 15px;
      color:#f0f0f0;
      background: #008489;
      border-radius:5px;
      padding: 0.6em 0.9em;
   }
</style>
