<template>
   <transition>
      <div class="content sm-map">
         <div class="am-g">
            <div class="am-panel am-panel-default">
               <div class="am-panel-bd">
                  <el-amap :events="events" :dragEnable="getDragEnable" :zoomEnable="getZoomEnable" :scrollWheel="getScroll" :doubleClickZoom="getDbClick" :center="cen" style="width: 100%;height: 300px;"  :zoom="getZoom" vid="ji">
                     <el-amap-circle :center="cen" :events="cEvents" :strokeColor="'#5085FF'" :strokeOpacity="0.5" :fillColor="'#5085FF'" :radius="400" :fillOpacity="0.5" :editable="getEdit">
                     </el-amap-circle>
                  </el-amap>
               </div>
            </div>
         </div>
      </div>
   </transition>
</template>

<script>
import { AMapManager } from 'vue-amap';

   export default{
      name:'name',
      props:['lng','lat','city','scroll','edit','zoomEnable','DbCilck','zoom','dragEnable','click'],
      data(){
         let self = this;
         return {
            cen:[0,0],
            events:{
               init:(o)=>{
                  let i = o.getCenter();
                  self.saveCenter(i);
               },
               click:e=>{
                  if(this.click)
                     return;
                  let i = e.lnglat;
                  self.saveCenter(i);
               }
            },
            cEvents:{
               move:(e)=>{
                  let i = e.lnglat;
                  self.saveCenter(i);

               }
            },
            to:null,
         }
      },
      methods:{
         saveCenter(i){

            if(i.lng == 0 || i.lat == 0)
               return;

            this.cen = [i.lng,i.lat];

            clearTimeout(this.to);

            this.to = setTimeout(res=>{
               this.getLocation(i.lng,i.lat);
            },500);

         },
         getLocation(lng,lat){
            $.get(`http://restapi.amap.com/v3/geocode/regeo?output=json&location=${lng},${lat}&key=bf5b356d3ffaab642c974983267b1ce8`).then(res=>{
               console.log(3);
               this.$emit('location',res);
            })
         },
         getCenter(){
            $.get(`http://restapi.amap.com/v3/geocode/geo?address=${this.city}&output=json&key=bf5b356d3ffaab642c974983267b1ce8`).then(res=>{
               if(res.geocodes == false)
                  return;

               let arr =res.geocodes[0].location.split(',');
               this.cen = [parseFloat(arr[0]),parseFloat(arr[1])] ;
            })
         }
      },
      mounted(){
         setTimeout(res=>{
            this.getCenter();

         },400);
      },
      watch:{
         lng(e){
            this.saveCenter({lng:this.lng,lat:this.lat});
         },
         city(){
            this.getCenter();
         }
      },
      computed:{
         getCity(){
          return this.$store.getters['getIpCity'];
          },
          getScroll(){

            return this.scroll !== undefined ? this.scroll : true;
          },
          getEdit(){
            return this.edit !== undefined ? this.edit : true;
          },
          getZoomEnable(){
            return this.zoomEnable !== undefined? this.zoomEnable : true;
          },
          getZoom(){
            return this.zoom || 15;
          },
          getDbClick(){
            return this.DbCilck !== undefined? this.DbCilck : true;
          },
          getDragEnable(){

            return this.dragEnable !== undefined? this.dragEnable : true;
          }
      }
   }
</script>

<style scoped>
  .sm-map >>> .amap-icon[title=拖拽修改半径]~.amap-marker-label,
  .sm-map >>> .amap-icon[title=拖拽修改半径]{
    display: none !important;
  }
</style>
