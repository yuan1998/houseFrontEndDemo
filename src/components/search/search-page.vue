<template>
   <transition>
      <div class="search-page" v-show="start">
         <search-nav></search-nav>
         <div class="wrapper">
            <div class="am-g">
               <div class="houses-wrap am-u-sm-12 am-u-md-8"
                  :class="{'map-open-house-bar':openMap}">
                  <div class="houses-bar am-cf">
                     <div class="" v-if="data == false">
                        <div class="am-text-center not-search-house">
                           <div class="text">没有找到房子....</div>
                           <div class="icon">
                              <i class="am-icon-home"></i>
                           </div>
                        </div>
                     </div>
                     <div class="am-g am-g-collapse am-cf" v-else>
                        <template v-for="item in data">
                           <div class="am-u-sm-12 am-u-end"
                                 @mouseenter="setHoverId(item.id)"
                                 @mouseleave="resetHoverId"
                                 :class="openMap? 'map-open' :'am-u-md-6 am-u-lg-4'">
                              <card :data="item"></card>
                           </div>
                        </template>
                        <div class="am-u-sm-12">
                           <div class="count am-text-center">{{((page-1)*18) + 1}} - {{((page-1)*18)+ data.length}} 共{{total}}个房源 </div>
                        </div>
                        <div class="am-u-sm-12">
                           <div class="paginate" v-show="last >1">
                              <paginate :current="page" :last="last" @onpagechange="changePage"></paginate>
                           </div>
                        </div>
                        <div class="am-u-sm-12">
                           <hr class="dividing-line">
                        </div>
                     </div>
                  </div>
                  <div class="overlay" v-show="overlayOpen">
                  </div>
               </div>
               <div class="map-wrap am-u-sm-12 am-u-md-4"
                  :style="{width: openMap && smSize ? mapWidth : ''}"
                  v-show="openMap || smSize">
                  <div class="map-bar">
                     <amap :center="[lng,lat]"
                        :hover="hoverId"
                        :houses="data"
                        @getHouses="saveLngLat">
                     </amap>
                  </div>
                  <div @click="openMap = !openMap"
                     class="md-openMap am-hide-sm-only"
                     :style="{
                        width:openMap?'120px': '',
                        opacity: openMap? '1 !important':'',
                     }">
                     <i class="am-icon-angle-left"
                        :style="{
                           transform:'rotate('+ (openMap ? '180deg' : '0deg') + ')',
                           'line-height': openMap ? '41px' :''
                        }" >
                     </i>
                     <span :style="openMap? 'opacity:1!important' :''">
                        {{openMap? '缩小地图' : '放大地图'}}
                     </span>
                  </div>
               </div>
               <div class="sm-map-control am-text-center am-show-sm-only">
                  <div class="control-btn">
                     <button @click="openMap = !openMap">
                        <template v-if="!openMap">
                           <i class="am-icon-map-o"></i>
                           <span>地图</span>
                        </template>
                        <template v-else>
                           <i class="am-icon-mail-reply"></i>
                           <span>列表</span>
                        </template>
                     </button>
                  </div>
               </div>
            </div>

         </div>
      </div>
   </transition>
</template>

<script>
import sender from '@/Sender.js'

import card from '@/components/home/cardTemp'
import paginate from '@/components/paginate/page'
import amap from '@/components/search/search-map'

import searchNav from '@/components/nav/search-nav'


import unity from '@/mixin/unity'


export default {
  name:'searchPage',
  mixins:[unity],
  components:{
   searchNav,
   card,
   amap,
   paginate
  },
  data(){
      return {
          data:[],
          page:1,
          last:0,
          total:0,
          lat:0,
          lng:0,
          start:false,
          hoverId:0,
          overlayOpen:false,
          openMap:false,
      }
  },
  mounted(){

      this.getLngLat();
      console.log(this.$data);
  },
  methods:{
      saveLngLat(center){
         this.lng = center.lng;
         this.lat = center.lat;

      },
      getKeywordHouse(){
         this.overlayOpen = true;
        sender('/api/house/getLngLat?lng='+this.lng+ '&lat='+this.lat,{page:this.page})
        .then(res=>{
            this.data = res.data.data;

            this.last = res.data.last_page;
            this.total = res.data.total;
            this.start = true;
            this.overlayOpen = false;
        })
      },
      getLngLat(){

         let city  = this.$route.query.address;

         $.get(`http://restapi.amap.com/v3/geocode/geo?city=${this._getCity}&address=${city}&output=json&key=bf5b356d3ffaab642c974983267b1ce8`).then(res=>{
            let location = res.geocodes[0];

            if(!location || location == false){
               this.data = [];
               this.start = true;
               return;
            }

            let arr =location.location.split(',');
            // this.cen = arr;
            this.lng = parseFloat(arr[0]);
            this.lat = parseFloat(arr[1]);
         })
      },
      setHoverId(id){
         this.hoverId = id;
      },
      resetHoverId(){
         this.hoverId = 0;
      },
      changePage(n){
         this.page = n;
         this._scrollToPage(0);
         this.getKeywordHouse();
      }
  },
  computed:{
      getCity(){
          return this.$store.getters['getIpCity'];
      },
      smSize(){
         let result =(this.$store.getters['getWindowWidth'] > 640);
         return result;
      },
      mapWidth(){

         return (this.$store.getters['getWindowWidth'] - 415) + 'px';
      }
  },
  watch:{
      lng(){
         this.getKeywordHouse();
      },
      ['$route.query.address'](val){
         this.getLngLat()
      },
      openMap(val){
         if(val && !this.smSize)
            this._bodyAddClass('sm-map-open');
         else this._bodyRemoveClass('sm-map-open');
      }
  }
}
</script>

<style scoped>

   .search-page >>> .search-nav{
      border-bottom: 1px solid #e1e1e1;

   }

   .wrapper{
      padding-top: 20px;
      margin-top: 73px;
   }

   .houses-wrap{
      /*border-right:1px solid #e1e1e1;*/
   }
   .map-wrap{
      position:fixed;
      top: 70px;
      bottom: 0;
      right: 0;
      padding-left: 0;
      padding-right: 0;
      transition: width 0.3s ease-in-out;
   }
   .map-wrap .map-bar{
      position: absolute;
      left: 0;
      right: 0;top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
   }

   .overlay{
      position:absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255,255,255,0.8);
      z-index: 3;
   }

   .not-search-house .text{
      font-size: 28px;
      line-height: 32px;
      font-weight: 300;
      display: inline-block;
   }

   .not-search-house{

   }

   .not-search-house i{
      color:#666;
      font-size: 100px;
   }
   .md-openMap{
      position: absolute;
      top: 50%;
      opacity:0;
      left: -10px;
      width: 40px;
      height: 40px;
      border:1px solid #f1f1f1;
      border-radius:40px;
      background: #fff;
      padding-left: 12px;
      cursor:pointer;

      user-select: none;
      box-shadow: 0 0 2px #f1f1f1;
      transition:all 0.2s ease-out;
   }
   .map-wrap:hover .md-openMap{
      opacity: 1;
   }
   .md-openMap i{
      display: inline-block;

      color:#666;
      line-height: 36px;
      font-size: 30px;
   }
   .md-openMap:hover{
      width: 120px;
   }
   .md-openMap i~span{
      min-width: 68px;
      position:absolute;
      left: 29px;
      top: 7px;
      color:#333;
      font-size: 16px;
      opacity:0;
   }
   .md-openMap:hover span{
      opacity:1;
   }

   @media only screen and (min-width: 641px){
      .map-open-house-bar{
         width: 409px !important;
         padding-right: 0;
      }
      .map-open >>> .cover{
         display: inline-block;
         height: 97px;
         width: 45%;
         padding-right: 2%;
         float:left;
      }
      .map-open >>> .cover~.text{
         display: inline-block;
         width: 53%;
         float:left;
      }
      .map-open{
         padding-bottom: 10px;
         padding-top: 10px;
         border-bottom: 1px solid #f1f1f1;
      }
   }

   .sm-map-control{
      position: fixed;
      left: 0;
      right: 0;
      bottom: 30px;z-index: 123;
   }

   .control-btn button{
      background: #fff;
      padding: 5px 10px;
      height: 30px;
      border-radius: 30px;
      border: 1px solid #666;
      box-shadow: 0 0 2px #f1f1f1;
   }

   .dividing-line{

      display: block;
      margin-top: 5px;
      padding-bottom: 10px;


   }

   .houses-bar .count{
      color:#616161;
      font-size: 14px;
      padding-top: 10px;
   }


</style>
