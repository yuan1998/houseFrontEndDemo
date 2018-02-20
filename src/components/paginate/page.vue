<template>
   <transition>
      <div class="page-bar">
         <div class="am-u-sm-12 ">
            <ul class="am-pagination am-pagination-centered">
              <li class="addLess" @click="lessPage" v-show="current>1" ><a ><i class="am-icon-angle-left"></i></a></li>
              <template v-if="last >3 && current>2">
                 <li><a  @click="changePage(1)">1</a></li>
                 <li class="omitted"><a >...</a></li>
              </template>
              <li v-for="n in renderPage()" @click="changePage(n)" :class="{'am-active':current == n}">
                 <a >{{n}}</a>
              </li>
              <template v-if="last >3 && (last - current)>1 ">
                 <li class="omitted"><a >...</a></li>
                 <li><a  @click="changePage(last)">{{last}}</a></li>
              </template>
              <li class="addLess" v-show="current < last" @click="addPage">
                <a ><i class="am-icon-angle-right"></i></a>
              </li>
            </ul>
         </div>
      </div>
   </transition>
</template>


<script>
   export default {
      name:'page',
      props:['current','last'],
      mounted(){
      },
      methods:{
         renderPage(){
            let c = this.current, l = this.last,arr = [];
            if(l >3){
               if((c - 2)<=0)
                  arr=[1,2,3];
               else if((c+1) >l)
                  arr = [l-2,l-1,l];
               else arr = [c-1,c,c+1];

            }else {
               for(let i =1;i<=l;i++){
                  arr.push(i);
               }
            }

            return arr;
         },
         addPage(){
            let page =JSON.parse(this.current);
            if(page >=this.last)
               return;
            this.$emit('onpagechange',++page);

         },
         lessPage(){
            let page =JSON.parse(this.current);
            if(page <= 1)
               return;
            this.$emit('onpagechange',--page);
         },
         changePage(n){
            console.log(n);
            this.$emit('onpagechange',n);


         }
      },

   }
</script>

<style scoped>
  .am-pagination li:not(.am-active):not(.addLess) a,
  .omitted a{
    border: none !important;
    color:#666;
  }
  .am-pagination li:not(.am-active):not(.addLess) a:focus,
  .am-pagination li:not(.am-active):not(.addLess) a:hover,
  .omitted a:focus,
  .omitted a:hover{
    background: transparent;
    cursor: inherit;
    user-select: none;
  }
  .am-pagination li:not(.am-active):not(.addLess):not(.omitted) a:focus,
  .am-pagination li:not(.am-active):not(.addLess):not(.omitted) a:hover{
    text-decoration:underline;
    cursor:pointer;
  }

  .am-pagination li{
    height: 37px !important;
    width: 37px !important;
    user-select: none;

  }
  .am-pagination li a{
    padding: 0 !important;
    width: 100% !important;
    height: 100% !important;
    font-size: 14px;
    line-height: 34px;
    margin-bottom: 0;
    user-select: none;
  }
  .am-pagination li.addLess a,
  .am-pagination li.am-active a{
    border-radius: 50%;
  }
</style>
