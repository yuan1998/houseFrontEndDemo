<template>
   <transition>
      <div class="house-info-page" v-if="start === true">
         <div class="am-cf">
            <navTop position="absolute" input="home"></navTop>
            <div class="content">
               <div class="thumbnail-bar am-cf">
                  <span>
                     <div class="warp am-cf">
                        <div class="img-bar am-cf">
                           <div class="col-5 center-img" @click="openSlider" :style="'background-image:url(' +allImage[0] +')'">
                           </div>
                           <div class="col-5 center-img" @click="openSlider" :style="'background-image:url(' +allImage[1] +')'">
                           </div>
                           <div class="col-5 center-img" @click="openSlider" :style="'background-image:url(' + allImage[2]+')'">
                           </div>
                        </div>
                        <span class="all-btn-bar">
                           <button @click="openSlider" class="am-btn am-btn-default all-btn">查看照片</button>
                        </span>
                     </div>
                  </span>
               </div>
               <div class="main-info am-cf">
                  <div class="am-g">
                     <nav class="scrollspy-nav am-cf " :style="navFixed? navStyle : 'position:relative'">
                        <div class="am-container am-g-collapse">
                           <div class="am-u-lg-8 am-u-md-10 am-u-md-centered am-u-lg-uncentered ">
                              <ul class="">
                                 <li ><a :class="{'am-active':navActive == 'about'}" @click="scrollTo(aboutTop - 100,'aboutTop')">详细</a></li>
                                 <li><span>·</span></li>
                                 <li ><a :class="{'am-active':navActive == 'comment'}" @click="scrollTo(commentTop - 100,'commentTop')">评论</a></li>
                                 <li><span>·</span></li>
                                 <li><a :class="{'am-active':navActive == 'location'}" @click="scrollTo(locationTop - 100,'locationTop')">位置</a></li>
                             </ul>
                          </div>
                        </div>
                     </nav>
                     <div class="bottom-bar am-u-sm-12" v-show="!mdWidth">
                        <div class="am-container">
                           <div class="am-g">
                              <div class="am-u-sm-6 am-text-left">
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
                              </div>
                              <div class="visible am-u-sm-6 am-text-right">
                                 <button v-if="!reservationData" @click="reservationOpen = true" class="am-btn am-btn-default">预约看房</button>
                                 <template v-else>
                                    <div class="">
                                       <div class="bottom-bar-text am-text-center"><i class="am-icon-check"></i>已预约 {{parseDate(reservationData.date)}}</div>
                                       <div class="am-text-center bottom-bar-sub-text">请联系房主决定看房具体时间</div>
                                    </div>
                                 </template>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="am-container">
                     <div class="am-g am-cf">
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
                                 <div class="room_count" >
                                    <span v-if="data.room_count.hall > 0">
                                       {{data.room_count.hall}}个大厅
                                    </span>
                                    <span v-if="data.room_count.bedroom > 0">
                                       {{data.room_count.bedroom}}个卧室
                                    </span>
                                    <span v-if="data.room_count.batchroom > 0">
                                       {{data.room_count.batchroom}}个卫生间
                                    </span>
                                    <span v-if="data.room_count.belconry > 0">
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
                                 <div class="hall am-cf" v-if="data.huxing_map_info.hall != false">
                                    <span class="am-u-md-3 am-u-sm-6 am-u-end" v-for="(item,n) in parseObject(data.huxing_map_info.hall)">
                                       <span class="room-item">
                                          <span class="title">
                                             大厅{{n+1}}
                                          </span>
                                          <span class="info">
                                             {{item.arae}}平米
                                             <small>·</small>
                                             {{item.direction}}
                                          </span>
                                       </span>
                                    </span>
                                 </div>
                                 <div class="bedroom am-cf" v-if="data.huxing_map_info.bedroom != false">
                                    <span class=" am-u-md-3 am-u-sm-6 am-u-end" v-for="(item,n) in parseObject(data.huxing_map_info.bedroom)">
                                       <span class="room-item">
                                          <span class="title">
                                             卧室{{n+1}}
                                          </span>
                                          <span class="info">
                                             {{item.arae}}平米
                                             <small>·</small>
                                             {{item.direction}}
                                          </span>
                                       </span>
                                    </span>
                                 </div>
                                 <div class="bathroom am-cf" v-if="data.huxing_map_info.bathroom != false">
                                    <span class=" am-u-md-3 am-u-sm-6 am-u-end" v-for="(item,n) in parseObject(data.huxing_map_info.bathroom)">
                                       <span class="room-item">
                                          <span class="title">
                                             卫生间{{n+1}}
                                          </span>
                                          <span class="info">
                                             {{item.arae}}平米
                                             <small>·</small>
                                             {{item.direction}}
                                          </span>
                                       </span>
                                    </span>
                                 </div>
                                 <div class="balcony am-cf" v-if="data.huxing_map_info.balcony != false">
                                    <span class=" am-u-md-3 am-u-sm-6 am-u-end" v-for="(item,n) in parseObject(data.huxing_map_info.balcony)">
                                       <span class="room-item">
                                          <span class="title">
                                             阳台{{n+1}}
                                          </span>
                                          <span class="info">
                                             {{item.arae}}平米
                                             <small>·</small>
                                             {{item.direction}}
                                          </span>
                                       </span>
                                    </span>
                                 </div>
                                 <div class="kitchen am-cf" v-if="data.huxing_map_info.kitchen != false">
                                    <span class="am-u-md-3 am-u-sm-6 am-u-end" v-for="(item,n) in parseObject(data.huxing_map_info.kitchen)">
                                       <span class="room-item">
                                          <span class="title">
                                             厨房{{n+1}}
                                          </span>
                                          <span class="info">
                                             {{item.arae}}平米
                                             <small>·</small>
                                             {{item.direction}}
                                          </span>
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
                        <div class="am-u-lg-4" v-show="mdWidth" >
                           <div :style="sideFixed ? sideStyle : ''">
                              <div class="side-bar  side-bar-s" >
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
                                       <template v-if="!reservationData">
                                          <div class="">
                                             <div class="visible-date">看房日期</div>
                                             <button class="date-btn" @click.self="openDatePicker">
                                                {{ reservation ? parseDate() :'请选择日期' }}
                                             </button>
                                          </div>
                                          <div class="visible am-text-center">
                                             <button @click="reservationHouse" class="am-btn am-btn-block am-btn-default">预约看房</button>
                                             <small>您暂时不会被收费</small>
                                          </div>
                                       </template>
                                       <template v-else>
                                          <div class="reservation-success">
                                             <div class="am-text-center"><i class="am-icon-check"></i>已预约 {{parseDate(reservationData.date)}}</div>
                                             <div class="am-text-center">
                                                请联系房主决定看房具体时间
                                             </div>
                                          </div>
                                       </template>
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
         </div>
         <homefooter></homefooter>
         <slider ref="silderd" v-bind:data="allImage" @onclose="closeSilder" :style="{display:'none'}"></slider>
         <div class="reservation-bar" v-show="reservationOpen && !mdWidth">
            <div class="max">
                  <div class="side-wrap">
                     <div class="side-bar" >
                        <div class="am-panel am-panel-default">
                           <div class="am-panel-bd">
                              <button @click="reservationOpen = false" type="button" class="am-fr am-close">&times;</button>
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
                              <template v-if="!reservationResult">
                                 <div class="">
                                    <div class="visible-date">看房日期</div>
                                    <button class="date-btn" @click.self="openDatePicker">
                                       {{ reservation ? parseDate() :'请选择日期' }}
                                    </button>
                                 </div>
                                 <div class="visible am-text-center">
                                    <button @click="reservationHouse" class="am-btn am-btn-block am-btn-default">预约看房</button>
                                    <small>您暂时不会被收费</small>
                                 </div>
                              </template>
                              <template v-else>
                                 <div class="reservation-success">
                                    <div class="am-text-center"><i class="am-icon-check"></i>预约成功</div>

                                 </div>
                              </template>
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
   </transition>
</template>

<script>
import sender from '@/Sender.js'
// import navtop from '@/components/NavTop'
import mapa from '@/components/user/map'
import slider from '@/components/home/sliderTemp'
import homefooter from '@/components/Footer'
import navTop from '@/components/nav/search-nav'


import utils from '@/mixin/unity'
import mUser from '@/mixin/user.js'

   export default {
      name:'house-info',
      props:['id'],
      mixins:[utils,mUser],
      components:{
         navTop,
         mapa,
         slider,
         homefooter
      },
      data(){
         return {
            silderBtn:document.querySelector('.slider'),
            data:{},
            start:false,
            allImage:[],
            comment:[],
            lat:0,
            lng:0,
            scrollTop:0,
            navFixed:false,
            navStyle:{
               position:'fixed',
               top:0,
               background:'#fff',
               'padding-bottom':'5px',
               'border-bottom':'1px solid #e0e0e0'
            },
            sideFixed:false,
            sideStyle:{
               position:'fixed',
               top:'65px',
               width:'295px',
               // right:'1px',
            },
            navTop:0,
            sideTop:607,
            aboutTop:0,
            commentTop:0,
            locationTop:0,
            navActive:'about',
            reservation:'',
            reservationResult:false,
            mdReservationOpen:false,
            reservationOpen:false,
            reservationData:false,
         }
      },
      mounted(){
         setTimeout(res=>{
            this.init();
         },0);
         // this.$nextTick(res=>{
         //    this.getTop();
         // })
      },
      methods:{
         init(){
            this.validator();
         },
         validator(){
            sender('/api/house/sellingHouseInfo',{id:this.id}).then(res=>{
               this.data = res.data;
               this.start = true;
               this.$setDocumentTitle('看房 - ' +this.data.title);
               this.filterImg(res.data.house_img);
               this.getLngLat();
               this.checkIsReservation();
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
               this.$nextTick(_=>{
                  this.datePickerInit();
               })
            })
         },
         openSlider(){
            this.$refs.silderd.$el.style.display = 'block';
            this._bodyAddClass('slider-open');
         },
         closeSilder(){

            this.$refs.silderd.$el.style.display = 'none';
            this._bodyRemoveClass('slider-open');
         },
         getTop(){

            this.navTop = this._elToTopHeight('.scrollspy-nav');
            this.aboutTop = this._elToTopHeight('#about');
            this.commentTop = this._elToTopHeight('#comment');
            this.locationTop = this._elToTopHeight('#location');

         },
         navA(val){
            if(val+ 250 >this.locationTop )
               this.navActive = 'location';
            else if(val + 250 >this.commentTop)
               this.navActive = 'comment';
            else this.navActive = 'about';
         },
         scrollTo(val,type){
            if(!val || val == false || val < 0){
               this.getTop();
               val = this[type] - 100;
            }
            this._scrollToPage(val);
         },
         datePickerInit(){
            let nowTemp = new Date();
            let nowDay = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0).valueOf();
            let nowMoth = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), 1, 0, 0, 0, 0).valueOf();
            let nowYear = new Date(nowTemp.getFullYear(), 0, 1, 0, 0, 0, 0).valueOf();
            let reservationDate = this.data.has_reservation;

            $('.date-btn').datepicker({
               onRender:(date,viewMode)=>{
                  let viewDate = nowDay;

                  switch (viewMode) {
                      // moths 视图，与当前月份比较
                     case 1:
                        viewDate = nowMoth;
                        break;
                      // years 视图，与当前年份比较
                     case 2:
                        viewDate = nowYear;
                        break;
                  }

                  let a = reservationDate.find(item =>{
                     return date.valueOf() == parseInt(item.date);
                  });

                  return (date.valueOf() < viewDate || a) ? 'am-disabled' : '';
               }
            })
            .on('changeDate.datepicker.amui',e=>{
               this.reservation = new Date(e.date).getTime();
            });
         },
         openDatePicker(e){

            $(e.target).datepicker('open');
         },
         parseDate(val){
            let dateTime = parseInt(val || this.reservation);
            let time = new Date(dateTime);
            let date = time.getFullYear()+'-'+(time.getMonth()+ 1) +'-'+time.getDate();
            return date;
         },
         reservationHouse(){

            if(!this._isLogin)
               this.$router.push('/login/aa');

            if(this._getUser.id == this.data.id)
               return;

            let date = this.reservation;
            if(!date || date == false){
               document.querySelector('.date-btn').click();
               return;
            }

            sender('/api/reservation/create',{hid:this.data.id,date})
               .then(res=>{
                  this.checkIsReservation();
               })
         },
         checkIsReservation(){
            if(!this._isLogin)
               return;

            sender('/api/reservation/check',{hid:this.id})
               .then(res=>{
                  let data = res.data;
                  if(data && data != false)
                     this.reservationData = data;
               })
         }
      },
      computed:{
         getUnitPrice(){
            return Math.floor((this.data.price / this.data.area)*100)/100;
         },
         getScrollTop(){
            return this.$store.getters['getScrollTop'];
         },
         mdWidth(){
            let result = (this.$store.getters['getWindowWidth'] >1024);

            if(result && this.reservationOpen)
               this.reservationOpen = false;

            // if(result && this.sideTop == 0)
               // this.getTop();

            return result;
         }
      },
      watch:{
         mdWidth(val){
            this.getTop();
         },
         getScrollTop(val){

            if(!this.start)
               return;


            if(this.navTop == 0 || !this.aboutTop || !this.commentTop ||!this.locationTop)
               this.getTop();



            this.navA(val);

            this.navFixed = (val+10 > this.navTop);
            this.sideFixed = (val+50 > this.sideTop);
         },
         reservationOpen(val){
            val
            ? this._bodyAddClass('reservation-open')
            : this._bodyRemoveClass('reservation-open');

         }
      }
   }
</script>

<style scoped>
   .content{
      margin-top: 73px !important;
   }
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

   .col-5:not(:first-child){
      margin-left: 3px;
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
   }
   .all-btn-bar button{
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
      display: block;
      padding-top: 5px;
      padding-bottom: 3px;
      border:1px solid #e0e0e0;
      border-radius:5px;
      padding-left: 8px;
   }
   .room-item span{
      display: block;
   }

   .room-item .title{
      padding-top: 5px;
      font-size: 17px;
      font-weight: 400;
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
    cursor:pointer;
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
   .bottom-bar button,
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
   .bottom-bar .price span,
   .bottom-bar .unit_price span,
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
   .side-bar{
      /*width:inherit;*/
   }

   .bottom-bar{
      position:fixed;
      bottom: 0;
      background: #fff;
      z-index: 100;
      padding-bottom: 20px;
      padding-top: 20px;
      border-top:1px solid #e0e0e0;
      padding-right: 4%;
      padding-left: 4%;
      min-width: 360px;
   }
   .bottom-bar button{
      padding: 0.8em 2.1em;
   }
   .room-size .am-u-sm-6{
      padding-top: 9px;
      padding-left: 0!important;
   }

   .date-btn{
      width: 100%;
      padding-left: 10px;
      padding-right: 10px;
      height: 35px;
      background: #fff;
      border:1px solid #e1e1e1;
      border-radius:2px;
      text-align:left;
      box-shadow:0 0 1px #e1e1e1;
      color:#666;
      font-size: 16px;
      margin-top: 7px;
   }
   .visible-date{
      margin-top: 10px;
      font-size: 14px;
      font-weight: 400;
      color:#767676;
   }

   .reservation-success div{
      padding-top: 10px;
      font-size: 16px;
      color:#666;
   }
   .reservation-success i {
      color:#ff5a5f;
      font-size: 20px;
   }
   .max{
      position:fixed !important;
      left: 0!important;bottom: 0!important;top: 0!important;right: 0!important;
      background: rgba(255,255,255,0.75)!important;
      z-index: 100 !important;
   }
   .side-wrap{
      position:absolute!important;
      top: 50%!important;
      left: 50%!important;
      transform: translate(-50%,-50%) !important;
      width: 350px!important;
      z-index: 201!important;
   }
   .side-wrap .am-close {
      z-index: 202 !important;

      font-size: 25px !important;
   }
   .side-wrap .price{
      padding-top: 20px !important;
   }

   .bottom-bar-text{
      padding-top: 0px;
      color:#666;
   }
   .bottom-bar-text i{
      color:#df5a5f;
   }
   .bottom-bar-sub-text{
      padding-top: 2px;
      color:#696969;
   }

</style>
