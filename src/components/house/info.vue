<template>
   <transition>
      <div class="house-info-page" v-show="start">
         <div class="">
            <navtop class="am-cf"></navtop>
            <div class="content">
               <div class="thumbnail-bar">
                  <span>
                     <div class="warp">
                        <div class="img-bar">
                           <div class="col-5 center-img" @click="openSlider" :style="'background-image:url(' +allImage[0] +')'">
                           </div>
                           <div class="col-5 center-img" @click="openSlider" :style="'background-image:url(' +allImage[1] +')'">
                           </div>
                           <div class="col-5 center-img" @click="openSlider" :style="'background-image:url(' + allImage[1]+')'">
                           </div>
                        </div>
                        <span class="all-btn-bar">
                           <button @click="openSlider" class="am-btn am-btn-default all-btn">查看照片</button>
                        </span>
                     </div>
                  </span>
               </div>
               <div class="main-info">
                  <div class="am-container">
                     <div class="am-g">
                        <div class="am-u-sm-12">
                           <nav class="scrollspy-nav" data-am-sticky>
                                <ul>
                                  <li><a href="#about">详细</a></li>
                                  <li><span>·</span></li>
                                  <li><a href="#comment">评论</a></li>
                                  <li><span>·</span></li>
                                  <li><a href="#location">位置</a></li>
                                  <li><span>·</span></li>
                                  <li><a href="#">再见王子</a></li>
                                  <li><span>·</span></li>
                                  <li><a href="#">第三张</a></li>
                                </ul>
                           </nav>
                        </div>
                        <div class="am-u-lg-8 am-u-md-10 am-u-md-centered am-u-lg-uncentered">
                           <div id="about">
                              <div class="house-title">
                                 <div class="am-text-xxl">{{data.title}}</div >
                                 <small class="subtitle">{{data.sub_title}}</small>
                              </div>
                              <div class="area_rooms">
                                 <div class="area">
                                    <span class="floor">
                                       {{data.floor}}层(共{{data.floors}}层)
                                    </span>
                                    <span>·</span>
                                    <span class="a">
                                       {{data.area}}平米
                                    </span>
                                 </div>
                                 <div class="room_count">
                                    <span v-if="data.room_count.hall >0">
                                       {{data.room_count.hall}}个大厅
                                    </span>
                                    <span v-if="data.room_count.bedroom >0">
                                       {{data.room_count.bedroom}}个卧室
                                    </span>
                                    <span v-if="data.room_count.batchroom >0">
                                       {{data.room_count.batchroom}}个卫生间
                                    </span>
                                    <span v-if="data.room_count.belconry >0">
                                       {{data.room_count.belconry}}个阳台
                                    </span>
                                 </div>
                              </div>
                              <div class="desc">
                                 <div class="homeowner am-vertical-align am-text-middle">
                                    <span class="avatar-bar center-img" :style="'background-image:url('+getAvatar(data.user.avatar_url.get)+')'">
                                    </span>
                                    <span class="name am-inline-block">
                                       房主：{{data.user.username}}
                                       <a href="#" class="am-link">联系房主</a>
                                    </span>
                                 </div>
                                 <div class="info">
                                    {{data.product_info}}
                                 </div>
                              </div>
                              <div class="room-size am-cf">
                                 <div class="hall" v-if="data.huxing_map_info.hall != false">
                                    <span class="room-item am-u-md-3 am-u-sm-6" v-for="(item,b) in parseObject(data.huxing_map_info.hall)">
                                       <span class="title">
                                          大厅{{n}}
                                       </span>
                                       <span class="info">
                                          {{item.area}}平米
                                       </span>
                                    </span>
                                 </div>
                                 <div class="bedroom" v-if="data.huxing_map_info.bedroom != false">
                                    <span class="room-item am-u-md-3 am-u-sm-6" v-for="(item,n) in parseObject(data.huxing_map_info.bedroom)">
                                       <span class="title">
                                          卧室{{n+1}}
                                       </span>
                                       <span class="info">
                                          {{item.arae}}平米
                                          <small>·</small>
                                          {{item.direction}}
                                       </span>
                                    </span>
                                 </div>
                                 <div class="batchroom" v-if="data.huxing_map_info.batchroom != false">
                                    <span class="room-item am-u-md-3 am-u-sm-6" v-for="(item,n) in parseObject(data.huxing_map_info.batchroom)">
                                       <span class="title">
                                          卫生间{{n+1}}
                                       </span>
                                       <span class="info">
                                          {{item.arae}}平米
                                          <small>·</small>
                                          {{item.direction}}
                                       </span>
                                    </span>
                                 </div>
                                 <div class="belconry" v-if="data.huxing_map_info.belconry != false">
                                    <span class="room-item am-u-md-3 am-u-sm-6" v-for="(item,n) in parseObject(data.huxing_map_info.belconry)">
                                       <span class="title">
                                          阳台{{n+1}}
                                       </span>
                                       <span class="info">
                                          {{item.arae}}平米
                                          <small>·</small>
                                          {{item.direction}}
                                       </span>

                                    </span>
                                 </div>
                                 <div class="kitchen" v-if="data.huxing_map_info.kitchen != false">
                                    <span class="room-item am-u-md-3 am-u-sm-6" v-for="(item,n) in parseObject(data.huxing_map_info.kitchen)">
                                       <span class="title">
                                          厨房{{n+1}}
                                       </span>
                                       <span class="info">
                                          {{item.arae}}平米
                                          <small>·</small>
                                          {{item.direction}}
                                       </span>
                                    </span>
                                 </div>
                              </div>
                              <div class="other">
                                 <div class="am-g">
                                    <div class="am-u-sm-12 am-u-md-3">
                                       装修
                                    </div>
                                    <div class="am-u-sm-12 am-u-md-9">
                                       {{data.Decoration}}
                                    </div>
                                 </div>
                                 <div class="am-g">
                                    <div class="am-u-sm-12 am-u-md-3">
                                       朝向
                                    </div>
                                    <div class="am-u-sm-12 am-u-md-9">
                                       {{data.direction}}
                                    </div>
                                 </div>
                                 <div class="am-g">
                                    <div class="am-u-sm-12 am-u-md-3">
                                       地下楼层
                                    </div>
                                    <div class="am-u-sm-12 am-u-md-9">
                                       {{data.negative_floor==0 ? '无地下' : data.negative_floor+'层'}}
                                    </div>
                                 </div>
                                 <div class="am-g">
                                    <div class="am-u-sm-12 am-u-md-3">
                                       供暖
                                    </div>
                                    <div class="am-u-sm-12 am-u-md-9">
                                       {{data.supply_heating}}
                                    </div>
                                 </div>
                                 <div class="am-g">
                                    <div class="am-u-sm-12 am-u-md-3">
                                       电梯
                                    </div>
                                    <div class="am-u-sm-12 am-u-md-9">
                                       {{data.elevator}}
                                    </div>
                                 </div>
                                 <div class="am-g">
                                    <div class="am-u-sm-12 am-u-md-3">
                                       房屋年龄
                                    </div>
                                    <div class="am-u-sm-12 am-u-md-9">
                                       {{data.floor_age}}年
                                    </div>
                                 </div>
                                 <div class="am-g">
                                    <div class="am-u-sm-12 am-u-md-3">
                                       房屋年限
                                    </div>
                                    <div class="am-u-sm-12 am-u-md-9">
                                       {{data.house_age_limit}}年
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div id="comment">
                              <div class="header">
                                 <div>评论</div>
                              </div>
                              <div class="body">
                                 <div v-if="comment == false">
                                    <div class="am-text-center not-comment">
                                       <i class="am-icon-comments"></i>
                                       <div>还没有人评论...</div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div id="location" class=" am-cf">
                              <div class="header">
                                 <div>位置</div>
                              </div>
                              <div class="">
                                 <div class="title">
                                    {{data.location}},{{data.community}}
                                 </div>
                                 <div class="body">
                                    <span>
                                       {{data.building_number}}号楼
                                    </span>
                                    <span>·</span>
                                    <span>
                                       {{data.unit_number}}单元
                                    </span>
                                    <span>·</span>
                                    <span>
                                       {{data.house_number}}号(门牌号)
                                    </span>
                                 </div>
                              </div>
                              <div class="">
                                 <div class="title">
                                    小区信息
                                 </div>
                                 <div class="body">
                                    <p>
                                       • {{data.community_info}}
                                    </p>
                                 </div>
                              </div>
                              <div class="">
                                 <div class="title">
                                    出行交通
                                 </div>
                                 <div class="body">
                                    <p>
                                       • {{data.traffic}}
                                    </p>
                                 </div>
                              </div>
                              <div class="">
                                 <div class="title">
                                    周边环境
                                 </div>
                                 <div class="body">
                                    <p>
                                       • {{data.surroundings}}
                                    </p>
                                 </div>
                              </div>
                              <div class="">
                                 <div class="map">
                                    <mapa :click="true" :DbCilck="false"  :zoom='14' :scroll="false" :edit="false" :lng="lng" :lat="lat"></mapa>
                                    <div class="title">
                                       <i class="am-icon-map-marker"></i>
                                       地图位置可以会与实际位置有偏差
                                    </div>
                                 </div>

                              </div>
                           </div>
                        </div>
                        <div class="am-u-lg-4 am-show-lg">
                           <div>
                              <div class="am-panel am-panel-default">
                                 <div class="am-panel-bd">
                                    <div class="price">
                                       <span>
                                          ¥{{data.price}}
                                       </span>
                                       万元
                                    </div>
                                    <div class="unit_price">
                                       <span>
                                          ¥{{getUnitPrice}}
                                       </span>
                                       万元/平米
                                    </div>
                                    <div class="visible am-text-center">
                                       <button class="am-btn am-btn-block am-btn-default">预约看房</button>
                                       <small>您暂时不会被收费</small>
                                    </div>
                                 </div>
                              </div>
                              <div class="am-text-center report">
                                 <i class="am-icon-flag-o"></i>
                                 <span>举报此房源</span>
                              </div>
                           </div>
                        </div>
                     </div>

                  </div>
               </div>

            </div>
         </div>
         <slider ref="silderd" v-bind:data="allImage" @onclose="closeSilder" :style="{display:'none'}"></slider>

      </div>
   </transition>
</template>

<script>
import sender from '@/Sender.js'
import navtop from '@/components/NavTop'
import mapa from '@/components/user/map'
import slider from '@/components/home/sliderTemp'


   export default {
      name:'house-info',
      props:['id'],
      components:{
         navtop,
         mapa,
         slider
      },
      data(){
         return {
            silderBtn:document.querySelector('.slider'),
            data:{},
            start:false,
            allImage:[],
            comment:[],
            lat:0,
            lng:0
         }
      },
      mounted(){
         setTimeout(res=>{
            this.init();
         },300);

      },
      methods:{
         init(){
            this.validator();
         },
         validator(){
            sender('/api/house/sellingHouseInfo',{id:this.id}).then(res=>{
               this.data = res.data;
               this.start = true;
               this.filterImg(res.data.house_img);
               this.getLngLat();
            })
         },
         filterImg(imgs){
            for(let key in imgs){
               let item = imgs[key];

               for(let i of item){
                  this.allImage.push(i.get);
               }
            }
         },
         getAvatar(i){
            return i || require('@/../storage/notAvatar.png');
         },
         parseObject(obj){
            let arr =[];
            for(let key in obj){
               arr.push(obj[key]);
            }
            return arr;
         },
         getLngLat(){
            $.get(`http://restapi.amap.com/v3/geocode/geo?address=${this.data.location}&output=json&key=bf5b356d3ffaab642c974983267b1ce8`).then(res=>{
               if(res.geocodes[0] == false)
                  return;
               let arr =res.geocodes[0].location.split(',');
               this.lng = parseFloat(arr[0]);
               this.lat = parseFloat(arr[1]);
            })
         },
         openSlider(){
            this.$refs.silderd.$el.style.display = 'block';
         },
         closeSilder(){

            this.$refs.silderd.$el.style.display = 'none';
            console.log(this.$refs.silderd.$el.style);
         }
      },
      computed:{
         getUnitPrice(){
            return Math.floor((this.data.price / this.data.area)*100)/100;
         }
      }
   }
</script>

<style scoped>

   .thumbnail-bar{
      width: 100%;
   }
   .warp{
      overflow: hidden;
      white-space: nowrap !important;
      cursor: pointer;
      position: relative;
   }
   .col-5{

   }
   .col-5{
       width: 100%;
       display: inline-block !important;
      height: 390px;
       -webkit-animation-duration: 500ms !important;
       animation-duration: 500ms !important;
       -webkit-animation-timing-function: ease-out !important;
       animation-timing-function: ease-out !important;
   }
   .col-5:not(.col-5:first-child){
      margin-left: 9px;
   }

   @media only screen and (min-width: 1025px){
      .col-5{
         width: 770px !important;
         height: 512px !important;
      }
   }

   @media only screen and (min-width:640px) and (max-width: 1024px) {
      .col-5{
         width: 710px !important;
         height: 473px !important;
      }
   }
   .all-btn{
      cursor: pointer !important;
       -webkit-transition: background 0.3s, border-color 0.3s !important;
       -moz-transition: background 0.3s, border-color 0.3s !important;
       transition: background 0.3s, border-color 0.3s !important;
       position: relative !important;
       display: inline-block !important;
       text-align: center !important;
       text-decoration: none !important;
       border-radius: 4px !important;
       width: auto !important;
       font-size: 15px !important;
       line-height: 18px !important;
       padding-top: 8px !important;
       padding-bottom: 8px !important;
       color: #484848 !important;
       font-weight: normal !important;
       border: 1px solid transparent !important;
       padding-right: 16px !important;
       padding-left: 16px !important;
       min-width: 51.77708763999664px !important;
       background: #ffffff !important;
       box-shadow: 0 0 2px #808080;
   }

   .all-btn-bar{
       position: absolute !important;
       right: 20px!important;
       bottom: 30px !important;
       box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.14) !important;
   }

   @media only screen and (min-width:640px) {
      .all-btn-bar{
        left: 20px;
      }
   }

   .other,
   .room-size,
   .desc,
   .area_rooms,
   .house-title{
       border-bottom:1px solid #dbdbdb;

   }

   .house-title{
      border-top:1px solid #dbdbdb;
   }

   .house-title div{
      padding-left: 3px;
      font-weight: bold;
      font-size: 30px;
      padding-top: 5px;
   }
   .house-title small{
      display: block;
      color:#606060;
      padding-left: 3px;
      margin-bottom: 9px;
   }

   .area_rooms{
      padding-top: 15px;
      padding-bottom: 13px;
   }
   .area_rooms .floor{
       font-weight: normal !important;
       color: #484848 !important;
       margin: 0px !important;
       word-wrap: break-word !important;
       font-size: 17px !important;
       line-height: 31px !important;
       letter-spacing: 0.2px !important;
       display: inline !important;
   }
   .area_rooms .room_count span{

      color:#666;
      word-wrap: break-word !important;
       font-size: 16px !important;
       line-height: 27px !important;
       letter-spacing: 0.2px !important;
       display: inline !important;
   }

   .area_rooms .area{
      color: #808080 !important;
       margin: 0px !important;
       word-wrap: break-word !important;
       font-size: 17px !important;
       line-height: 22px !important;
       letter-spacing: 0.2px !important;
       font-weight: 300 !important;
       display: inline !important;

   }

   .desc .homeowner{
      padding-top: 18px;
      font-weight: 500;
      font-size: 19px;
      line-height: 28px;
      color:#484848;
   }
   .desc .avatar-bar:after{
      position: absolute;
       left: 50%;
       margin-left: -7px;
       bottom: -15px;
       content: "";
       display: inline-block;
       width: 0;
       height: 0;
       vertical-align: middle;
       border-bottom: 10px solid #f8f8f8;
       border-right: 10px solid transparent;
       border-left: 10px solid transparent;
       border-top: 0 dotted;
       -webkit-transform: rotate(360deg);
       transform: rotate(360deg);
   }
   .desc .avatar-bar{
      margin-right: 13px;
      display: inline-block;
      margin-bottom: 8px;
   }
   .desc .homeowner .name{
      padding-top: 5px;
      vertical-align: top;

   }
   .desc .info{
      background: #f8f8f8;
      margin-left: 9px;
      margin-right: 9px;
      padding: 8px;
      border-radius:5px;

      font-size: 17px;
      font-weight: 300;
      color:#606060;
   }
   .desc{
      padding-left: 3px;
      padding-bottom: 20px;
   }


   .room-size{
      padding-left: 5px;
      padding-top: 25px;
      padding-bottom: 25px;
   }

   .room-item{
      padding-top: 5px;
      padding-bottom: 3px;
      border:1px solid #e0e0e0;
      border-radius:5px;
   }
   .room-item span{
      display: block;
   }

   .room-item .title{
      padding-top: 5px;
      font-size: 18px;
      font-weight: 500;
      line-height: 28px;
   }

   .room-item .info{
      font-size: 16px;
      color:#606060;
      line-height: 30px;
   }

  .scrollspy-nav {
   min-width: 360px;
    top: 0;
    z-index: 2;
    width: 100%;
    /*padding: 0 10px;*/
    padding-right: 10px;
  }

  .scrollspy-nav ul {
    margin: 0;
    padding: 0;
  }

  .scrollspy-nav li {
    display: inline-block;
    list-style: none;
  }

  .scrollspy-nav a {
   font-size: 15px;
    color: #008489;
    padding: 10px 5px;
    display: inline-block;
  }

  .scrollspy-nav a.am-active {
    color: #666;
    font-weight: bold;
  }

  .avatar-bar{
   width: 62px;
   height: 62px;
   display: inline-block;
   border-radius:62px;
  }

  .other .am-u-md-3{
          font-weight: normal !important;
       color: #484848 !important;
       margin: 0px !important;
       word-wrap: break-word !important;
       font-size: 17px !important;
       line-height: 22px !important;
       letter-spacing: 0.2px !important;

  }
  .other{
   margin-left: 9px;
  }
  .other .am-u-md-9{
       color: #484848 !important;
       margin: 0px !important;
       word-wrap: break-word !important;
       font-size: 17px !important;
       line-height: 22px !important;
       letter-spacing: 0.2px !important;
       font-weight: 300 !important;
  }
  .other .am-g{
      margin-top: 20px;
      margin-bottom: 20px;
  }
   #location,
   #comment{
      margin-top: 40px;
      margin-left: 9px;

   }
   #location .header,
  #comment .header{
      font-size: 28px;
      font-weight: bold;
  }
  .not-comment i{
      font-size: 98px;
      color:#e0e0e0;
  }
  .not-comment div{
      font-size: 22px;
      font-weight: 400;
      color:#606060;
  }
   #location .header{
      margin-top: 20px;
      margin-bottom: 35px;
   }
  #location .title{
      margin-top: 20px;
      line-height: 28px;
      font-weight: 700;
  }

  #location .body{
      padding-left: 5px;
      font-weight: 300;
  }
  .map .title,
  #location .body,
  #location .title{
      font-size: 17px;
      color:#484848;
      margin-left: 6px;
  }
   .map >>> .am-panel.am-panel-default{
      border-color: transparent!important;
      box-shadow: none!important;
      margin-bottom: 0!important;
   }
   .map .title{
      font-weight: 400 !important;
      margin-top: 0 !important;
   }
   .am-panel .visible button{
      background: #ff5a5f;
      color:#fefefe;
      font-size: 17px;
      font-weight: 500;
      border-radius:5px;
      padding-top: 0.6em;
      padding-bottom: 0.6em;
   }
   .am-panel .visible{
      padding-top: 18px;
   }
   .am-panel .visible small{
      font-size: 14px;
      color:#464646;
      line-height: 29px;
   }
   .am-panel .unit_price span,
   .am-panel .price span{
      font-size: 22px !important;
      line-height: 25px !important;
      font-weight: 600 !important;
      color:#666 !important;
   }
   .am-panel .unit_price,
   .am-panel .price{
      line-height: 40px;
   }

   .am-panel .unit_price{
      padding-bottom: 10px;
      border-bottom: 1px solid #e0e0e0;
   }
   .report span{
      font-size: 14px;
      font-weight: normal;

   }
   .report:hover span{
      color: inherit;
      text-decoration: underline;
   }
   .report *{
      user-select: none;
      cursor:pointer;
   }
</style>
