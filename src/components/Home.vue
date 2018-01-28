<template>
   <transition>
      <div class="content">
         <div id="home-bg"></div>
         <div class="home-search-bar">
            <div class="am-container">
               <div class="am-g">
                  <div class="am-u-sm-12 am-u-md-8 am-u-md-offset-2">
                     <form class="am-form am-g" v-on:submit.prevent="search">
                        <div class="am-form-group am-form-group-lg ">
                           <input id="home-search-input" class=" am-form-field am-radius" v-model="keyword" type="text" placeholder="试试输入地段" />
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
         <div id="home-hot-house-bar">
            <div class="am-container">
               <h1>{{getLocation}}热门楼盘</h1>
            </div>

         </div>
      </div>
   </transition>
</template>

<script>
export default {
   mounted: function() {
      console.log('now page is home');
   },
   data:function(){
      return {
         keyword:'',
         result:null,
         searchStart:false,
      }
   },
   methods:{
      search(){
         if(!this.searchValidator())
            return;
         $.post('/api/house/titleSearch',{keyword:this.keyword}).then(res=>{
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
   },
   computed:{
      getLocation(){
         this.$store.getters['getIpCity'];
      }
   }
}


</script>

<style>

.home-search-bar{
   background-image: url('../../storage/city1.jpg');
   background-color: transparent;
   background-size: cover;
   background-position: center center;
   background-repeat: no-repeat;
   height: 500px;
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
