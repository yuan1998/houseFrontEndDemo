<template>
   <transition>
      <div id="slider" v-show="data != false">
         <div class="back-max">
            <div class="table">
               <div class="cell">
                  <div class="content">
                     <div>
                        <div class="close-bar">
                           <button @click="close" class="close-btn">
                              <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
                               <!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ -->
                                  <g>
                                      <line stroke="#f0f0f0"  stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_2" y2="0" x2="30" y1="30" x1="0" stroke-opacity="null" stroke-width="2.5" fill="none"/>
                                      <line stroke="#f0f0f0" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_4" y2="30" x2="30" y1="0" x1="0" fill-opacity="null" stroke-opacity="null" stroke-width="2.5" fill="none"/>
                                  </g>
                              </svg>
                           </button>
                        </div>
                        <div class="padding-top"></div>
                        <div class="main-bar">
                           <button @click="numLess" class="pre-btn">
                              <i class="am-text-xxxl am-icon-angle-left"></i>
                           </button>
                           <button @click="numAdd" class="next-btn">
                              <i class="am-text-xxxl am-icon-angle-right"></i>
                           </button>
                           <div class="img-bar">
                              <div class="wrap">
                                 <div class="max">
                                    <div class="photo-bar" @click="numAdd">
                                      <transition name="fade">
                                        <span class="center-img" :style="'background-image:url(' +data[imgIndex] + ')' ">
                                        </span>
                                      </transition>

                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div>
                              <div class="am-container">
                                 <span class="number">{{this.num}}/{{this.data.length}}</span>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="top">
                     </div>
                     <div class="body">
                     </div>
                     <div class="footer">
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </transition>
</template>

<script>
   export default {
      name:'slider',
      props:['data'],
      data(){
         return {
            num:1,
            fade:true,

         }
      },
      mounted(){

      },
      methods:{
         numAdd(){
          let img = document.querySelector('.center-img');
          console.log(img);
          img.style.animationName = "fade";
          img.style.animationDuration = "0.3s";


            if(this.num == this.data.length)
               this.num = 1;
            else this.num++;

         },
         numLess(){
            this.fade = !this.fade;
            if(this.num == 1)
               this.num = this.data.length;
            else this.num--;
         },
         close(){
            this.$emit('onclose');
         }
      },
      computed:{
         imgIndex(){
            return this.num-1;
         },
      }
   }
</script>

<style scoped>
   #silider{
      display: none;
      direction: ltr;

   }

   .back-max{
      z-index: 999 !important;
      position: fixed !important;
      overflow-y: auto !important;
      left: 0;bottom: 0;top: 0;right: 0;
      max-height: calc(100%);
      background: rgba(0,0,0,0.83) ;
   }

   .table{
       display: table;
       table-layout: fixed;
       height: 100%;
       width: 100%;
   }
   .cell{
       display: table-cell;
       height: 100%;
       width: 100%;
       vertical-align: middle;
       padding: 0;
   }
   .content{
       position: relative;
       overflow: hidden;
       -webkit-border-radius: 2px;
       -moz-border-radius: 2px;
       border-radius: 2px;
       background-color: #fff;
       margin-left: auto;
       margin-right: auto;
       max-width: 520px;
        background-color: transparent;
       height: 100%;
       max-width: 100%;
   }

   .close-btn{
       position: absolute;
       right: 10px;
       top: 10px;
       padding: 16px 28px 8px;
       font-size: 2em;
       width: auto;
       height: auto;
       background: transparent;
       border: 0;
       outline: none;
       color: #fff;
       z-index: 1000;
   }

   .close-btn svg{

      /*font-family: Airglyphs, sans-serif;*/
      color:#f0f0f0;
   }


   .pre-btn{
      left: 0;


   }
   .next-btn{

      right: 0;
   }

   .next-btn,
   .pre-btn{
      position:absolute;
      bottom: 0;
      top: 0;
      z-index: 5;
      background: none;
      border-color: rgba(0,0,0,0);
      outline: none;
   }

   .pre-btn i,
   .next-btn i{
      font-size: 60px;
      color:#fff;
   }

   @media only screen and (min-width: 1025px){
      .next-btn,
      .pre-btn{
         width: 75px;
      }
      .pre-btn i,
       .next-btn i{
         font-size: 100px;
       }
   }

   .img-bar{
      width: 100% !important;
      max-width: 100vh !important;
      margin: 0 auto !important;
   }
   .img-bar .wrap{
      padding-top: 69%;
      position: relative !important;
      width: 100% !important;
      height: 0 !important;
   }
   .img-bar .wrap .max{
      position:absolute;
      top: 0;left: 0;bottom: 0;right: 0;
      width: 100%;
      height: 100%;
   }
   .photo{
      position:absolute;
      top: 0;left: 0;bottom: 0;right: 0;
      max-width: 100%;
      margin: 0 auto;
   }
   .photo-bar{
       position: absolute;
       width: 100%;
       height: 100%;
       opacity: 1;
       cursor:pointer;
   }
   .photo-bar span{
      position: absolute !important;
      width: 100%;
      height: 100%;
   }
   .padding-top{
      padding: 66px 15px 20px !important;
   }
   .number{
      color:#f0f0f0;
      font-size: 16px;
      line-height: 25px;
   }
</style>
