<template>
   <div id="home">
      <div id="head">
         <nav-top></nav-top>
      </div>
      <div class="content">
         <div id="home-bg"></div>
         <div class="home-top-bar">
            <div class="am-container">
               <div class="am-g">
                  <div class="am-u-sm-12">
                     <div class="content am-cf">
                        <h1 class="am-u-md-12">
                           <span class="title">4n!o</span>
                        </h1>
                        <div class="subtitle am-u-md-8 am-u-end">{{randWelcome()}}</div>
                     </div>
                     <!-- <form class="am-form am-g" v-on:submit.prevent="search">
                        <div class="am-form-group am-form-group-lg ">
                           <input id="home-search-input" class=" am-form-field am-radius" v-model="keyword" type="text" placeholder="试试输入地段" />
                        </div>
                     </form> -->

                  </div>
               </div>
            </div>
         </div>
         <div class="home-search-bar am-cf">
            <div class="am-container">
               <search class="am-g"></search>
            </div>
         </div>
         <div id="home-hot-house-bar">
            <div class="am-container">
               <hot></hot>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import navTop from '@/components/NavTop'
import search from '@/components/home/homeSearchBar'
import hot from '@/components/home/homeHotBar'

import sender from '@/Sender.js'

export default {
   name:'Home',
   components:{
      navTop,
      hot,
      search
   },
   mounted: function() {
      console.log('now page is home');
   },
   data:function(){
      return {
         keyword:'',
         result:null,
         searchStart:false,
         welcome:['让你在繁华的闹市中，有一间属于自己的庇护所','与家人一起，在新居中迎接新年','随波逐流的你也需要休息','好几个星期了，我都想着她','最后已事过境迁 长街风景已变']
      }
   },
   methods:{
      search(){
         if(!this.searchValidator())
            return;
         sender('/api/house/titleSearch',{keyword:this.keyword}).then(res=>{
            this.result = res.data;
         })
      },
      searchValidator(){
         if(this.searchStart == false)
            this.searchStart = true;
         if(this.keyword == ''){
            this.result = [];
            return false;
         }
         return true;
      },
      randWelcome(){
         let lth = this.welcome.length;
         let r = Math.floor(Math.random()*lth);
         console.log(r);
         return this.welcome[r];
      }
   },
   computed:{
      getLocation(){
         this.$store.getters['getIpCity'];
      }
   }
}


</script>

<style scoped>

.home-search-bar{
   margin-top: 10px;
}

#home-hot-house-bar{
   margin-top: 60px;
}
.home-top-bar{
   /*background-image: url('../../storage/city6.png');
   background-color: transparent;
   background-size: cover;
   background-position: center center;
   background-repeat: no-repeat;*/
   /*color:#666;*/
   height: 500px;
  /*box-shadow: 0px 2px 5px rgba(0,0,0,0.2);*/

}
.home-top-bar .am-u-sm-12{
   margin-top: 200px;
}
.title{
       font-size: 44px !important;
    line-height: 1.2 !important;
    color: #FF5A5F !important;
    /*text-shadow: 0 0 1px #3A2D20 !important;*/
}
.subtitle{
   font-size: 44px !important;
    line-height: 1.2 !important;
    display: block !important;
    /*text-shadow: 0 0 20px #3A2D20 !important;*/
    font-weight: 700 !important;
    color: #666;
}
#home-search-input{
   position:absolute;
   top: 150px;
   opacity: 0.6;
   transition:opacity 0.5s ease-in-out;
}
#home-search-input:focus{
   opacity:1;
}

</style>
