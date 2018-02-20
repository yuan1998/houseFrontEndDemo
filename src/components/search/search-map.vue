<template>
   <transition>
      <div class="map">
         <div class="map-b">
            <el-amap
               :scrollWheel="false"
               ref="map"
               :center="center"
               :zoom="zoom"
               :events="events"
               :doubleClickZoom="false"
               :keyboardEnable="false"
               :resizeEnable="true">
               <template v-for="item in houseLL">
                  <el-amap-marker :offset="[-47,-36]" :zIndex="hover == item.id ? 9000 : 100"   :data-position="item.center" :data-hid="item.id" :events="clickEvents"   :position="item.center">
                     <map-marker :hover="hover" :item="item"></map-marker>
                  </el-amap-marker>
               </template>
               <template v-if="current > 0" >
                  <el-amap-info-window data-v-tag :offset="[-15,-18]" :position="currentPosition">
                     <card :slider="true" :data="findHouse"></card>
                 </el-amap-info-window>
               </template>
            </el-amap>
            <div class="zoom-bar">
               <button :disabled="(zoom >= 18)" class="am-block" @click="_zoom('+')">+</button>
               <button :disabled="(zoom <= 3)" class="am-block" @click="_zoom('-')">-</button>
            </div>
            <div class="move-search">
               <label>
                  <input type="checkbox" v-model="moveSearch">
                  <span>移动时搜索</span>
               </label>
            </div>
            <div class="click-search" v-show="clickSearch" @click='search'>
               <div>点击重新搜索<i class="am-icon-refresh"></i></div>
            </div>
         </div>
      </div>
   </transition>
</template>

<script>
import card from '@/components/home/cardTemp'
import mapMarker from './map-marker-template'
import unity from '@/mixin/unity'

import { AMapManager } from 'vue-amap';

   export default {
      name:'search-page-map',
      props:['keyword','houses','hover'],
      components:{
         card,
         mapMarker
      },
      mixins:[unity],
      data(){
         let that = this;
         return {
            zoom:11,
            current:0,
            moveSearch:true,
            clickSearch:false,
            lng:108.940174,
            lat:34.341568,
            center:[0,0],
            events:{
               click:(e)=>{
                  that.current = 0;
               },
               dragend:(e)=>{

                  if(!that.moveSearch){
                     that.clickSearch = true;
                     return;
                  }

                  that.emitCenter();
               },
               zoomchange:(e)=>{
                  that.getNWHouse();
               },
               complete:(e)=>{
                  setTimeout(res=>{
                     that.getLngLat();
                  },0);
               }
            },
            clickEvents:{
               click:(e)=>{
                  let data = e.target.G.content.dataset;
                  let hid = data.hid;
                  let position = data.position;

                  that.current = hid;

                  that.currentPosition = this.parsePosition(position);

                  this.saveLog(hid);

               }
            }
         }
      },
      mounted(){



      },
      methods:{
         _zoom(type){

            if(type == '+')
               this.$refs.map.$$getInstance().zoomIn();
            else this.$refs.map.$$getInstance().zoomOut();



         },
         parsePosition(str){
            let strArr = str.split(',');
            return [parseFloat(strArr[0]),parseFloat(strArr[1])];
         },
         emitCenter(){
            let {lng,lat} = this.$refs.map.$$getInstance().getCenter();

            this.current = 0;

            this.saveCenter(lng,lat);

            this.getNWHouse();
         },
         search(){
            this.clickSearch=false;
            this.emitCenter();
         },
         saveLog(hid){

            let str = this.$storage;
            if(!str.enabled)
               return;

            let logs = str.get('_TTMD_HOUSES_LOG') || [];

            if(logs.findIndex(e=> e == hid) == -1){
               logs.push(hid);
               str.set('_TTMD_HOUSES_LOG',logs);
            }
         },
         getNWHouse(){
            let url = '/api/house/getLngLat?lng='+this.lng+ '&lat='+this.lat;
            let bounds = this.$refs.map.$$getInstance().getBounds();

            this.$emit('getData',{url,bounds});
         },
         getLngLat(){
            let city  = this.keyword;
            $.get(`http://restapi.amap.com/v3/geocode/geo?city=${this._getCity}&address=${city}&output=json&key=bf5b356d3ffaab642c974983267b1ce8`).then(res=>{
               let location = res.geocodes[0];

               this.$emit('started');

               if(!location || location == false){
                  return;
               }

               let arr =location.location.split(',');
               // this.cen = arr;
               this.saveCenter(arr[0],arr[1]);
               this.getNWHouse();
            })
         },
         saveCenter(lng,lat){
            this.lng = parseFloat(lng);
            this.lat = parseFloat(lat);
            this.center= [this.lng,this.lat];
         }

      },
      computed:{
         houseLL(){
            let arr = [];

            for(let item of this.houses){
               let content = {price:item.price};

               let cen =item.location_info;
               let id = item.id;

               let center = [parseFloat(cen.lng),parseFloat(cen.lat)];

               arr.push({content,center,id});

            }

            return arr;
         },
         findHouse(){
            if(!this.current)
               return;
            return this.houses.find(e=>e.id == this.current);
         }
      },
      watch:{
         keyword(){
            this.getLngLat();
         }
      }
   }
</script>

<style scoped>
   .map,
   .map-b{
      width: auto;
      height:100%;overflow: hidden;
   }

   .zoom-bar{
      position:absolute;
      top: 10px;
      left: 10px;
   }
   .zoom-bar button{
      width: 30px;
      height: 35px;
      background: #fff;
      border:1px solid #e1e1e1;
      border-radius:2px;
   }
   .zoom-bar button:first-child{
      border-bottom: none;
   }

   .zoom-bar button[disabled=disabled]{
      background: #f1f1f1;
   }

   .zoom-bar button:hover{
      background: #f0f0f0;
   }
   .click-search,
   .move-search{
      display: inline-block;
      position:absolute;
      top: 10px;
      left: 50px;
      background: #fff;
      padding-left: 9px;
      padding-right: 8px;
      padding-top: 3px;
      border: 1px solid #f1f1f1;
   }
   .move-search span{
      font-size: 12px;
      font-weight: 400;
   }
   .click-search{
      z-index: 120 !important;
      background: #ff5a5f;
      color:#f1f1f1;
      font-size: 16px;
      line-height: 28px;
      padding-top: 0;
      border-color:transparent;
      border-radius:3px;
      cursor:pointer;
   }
   .map-b >>> .amap-info-sharp{
      bottom: -9px !important;
       left: 50% !important;
       margin-left: -10px !important;
       /*box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.15) !important;*/
       width: 20px !important;
       height: 20px !important;
       -webkit-transform: rotate(45deg) !important;
       -ms-transform: rotate(45deg) !important;
       transform: rotate(45deg) !important;
       position: absolute !important;
       background: #fff;
       top: unset !important;
   }
   .map-b >>> .amap-info-content{
      margin-top: -10px;
      padding: 0;
   }
   .map-b >>> .card-item{
      margin-right: 0;
      margin-left: 0;
      margin-bottom: 10px;
      width: 250px;
   }
   .map-b >>> .card-item .text{
      margin-left: 5px;
      margin-right: 5px;
   }
</style>
