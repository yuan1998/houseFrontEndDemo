<template>
   <transition>
      <div class="search-page" v-show="start">
         <search-nav></search-nav>
         <div class="wrapper">
            <div class="am-g">
               <div class="houses-wrap am-u-sm-12 am-u-md-8"
                  :class="{'map-open-house-bar':openMap}">

                  <div class="houses-bar am-cf">

                     <div class="" v-if="$data._list == false">
                        <div class="not-search-house">
                           <div class="text">
                              <ul>
                                 试着调整您的搜索。以下是一些建议：
                                 <li>更改日期筛选条件</li>
                                 <li>缩小地图</li>
                                 <li>搜索具体的城市、地址或地标</li>
                              </ul>
                           </div>
                        </div>
                     </div>
                     <div class="am-g am-g-collapse am-cf" v-else>
                        <template v-for="item in $data._list">
                           <div class="am-u-sm-12 am-u-end"

                                 @mouseenter="setHoverId(item.id)"
                                 @mouseleave="resetHoverId"
                                 :class="openMap? 'map-open' :'am-u-md-6 am-u-lg-4'">

                              <card :slider="true" :data="item"></card>
                           </div>
                        </template>
                        <div class="am-u-sm-12">
                           <div class="count am-text-center">{{(($data._page-1)*18) + 1}} - {{(($data._page-1)*18)+ $data._list.length}} 共{{$data._total}}个房源 </div>
                        </div>
                        <div class="am-u-sm-12">
                           <div class="paginate" v-show="$data._lastPage >1">
                              <paginate :current="$data._page" :last="$data._lastPage" @onpagechange="_changePage"></paginate>
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
                  :style="{width: openMap && smSize ? mapWidth : ''}">
                  <transition name="scale-up">
                     <div class="map-bar" v-show="openMap || smSize">
                        <amap :keyword="$route.query.address"
                           :hover="hoverId"
                           :houses="$data._list"
                           @started="renderStart"
                           @getData="saveData">
                        </amap>
                     </div>
                  </transition>
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
import paegList from '@/mixin/paginate'


export default {
   name:'searchPage',
   mixins:[unity,paegList],
   components:{
      searchNav,
      card,
      amap,
      paginate
   },
  data(){
      return {
          start:false,
          hoverId:0,
          overlayOpen:false,
          openMap:false,
          _map:false,
      }
  },
  mounted(){


  },
  methods:{
      setHoverId(id){
         this.hoverId = id;
      },
      resetHoverId(){
         this.hoverId = 0;
      },
      async saveData({url,bounds}){
         this.overlayOpen = true;
         this._changePage(1);
         bounds = JSON.parse(JSON.stringify(bounds));

         let params = (bounds.northeast.M == 0 && bounds.southwest.M == 0 )
                     ? {}
                     :{
                        max:{lng:bounds.northeast.M,lat:bounds.northeast.O},
                        min:{lng:bounds.southwest.M,lat:bounds.southwest.O}
                      };


         await this._getPageData(url,{bounds:params});

         this.overlayOpen = false;
      },
      renderStart(){
         this.$data._list = [];
         this.start = true;
      }
  },
  computed:{
      smSize(){
         let result = (this.$store.getters['getWindowWidth'] > 640);
         return result;
      },
      mapWidth(){
         return (this.$store.getters['getWindowWidth'] - 415) + 'px';
      }
   },
   watch:{
      ['$route.query.address'](val){
         this.getLngLat()
      },
      smSize(val){
         if(!val && this.openMap)
            this._bodyAddClass('sm-map-open');
         else if(val && !this.openMap)
            this._bodyRemoveClass('sm-map-open');
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
      border-bottom: 1px solid #e8e8e8;
   }

   .wrapper{

      margin-top: 73px;

   }


   .houses-wrap:before{
      content:'';
      position:absolute !important;
      right: 0;
      top: 0;
      bottom: 0;
      width: 1px !important;
      background: #e8e8e8;
   }
   .map-wrap{
      border-left: 1px solid #e8e8e8;
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
      margin-top: 125px !important;
      margin-bottom: 80px !important;
   }
   .not-search-house .text ul{
      font-size: 20px;
      line-height: 32px;
      font-weight: 400;
      display: inline-block;
      color:#555;
   }
   .not-search-house .text li{
      font-size: 17px;
      font-weight: 400;
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
      box-shadow: 2px 3px 10px #919191 !important;
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
         width: 415px !important;
         padding-left: 0;
         padding-right: 0;
      }
      .houses-wrap{
         padding-bottom: 30px !important;
         border-right: 15px solid #fbfbfb !important;
         /*border-right:1px solid #e1e1e1;*/
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
      bottom: 30px;z-index: 1 !important;
   }

   .control-btn button{
      background: #f1f1f1;
      color:#555 ;
      font-size: 14px !important;
      padding: 5px 10px  !important;
      line-height: 20px !important;
      height: 30px !important;
      font-weight: 500 !important;
      border-radius: 30px !important;
      border: 1px solid #d8d8d8 !important;
      box-shadow: 0 2px 5px #e8e8e8 !important;
      transition:color 0.2s ease-out,background 0.2s ease-out;
   }
   .control-btn button:hover{
      background: #888 !important;
      color:#f1f1f1 !important;
   }

   .dividing-line{

      display: block;
      margin-top: 5px;
      padding-bottom: 10px;


   }
   .houses-bar{

      /*border-bottom: 1px solid #d8d8d8 !important;*/
   }

   .houses-bar .count{
      color:#616161;
      font-size: 14px;
      padding-top: 10px;
   }

   .sale-up-leave-to,
    .sale-up-enter{
        transform:scale(0);

    }

    .sale-up-leave,
    .sale-up-enter-to{

        transition:scale(25);
    }
    .sale-up-leave-active,
    .sale-up-enter-active{
        transition: transform 0.4s ease-out;
        /*transition-delay: 0.5s*/
    }


</style>
