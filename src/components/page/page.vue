<template>
   <transition>
      <div class="page-bar">
         <div class="am-u-sm-12 ">
            <ul class="am-pagination am-pagination-centered">
              <li @click="lessPage" :class="{'am-disabled':current <=1}"><a href="#">&laquo;</a></li>
              <template v-if="last >5 && current>3">
                 <li><a href="#" @click="changePage(1)">1</a></li>
                 <li><a href="#">...</a></li>
              </template>
              <li v-for="n in renderPage()" @click="changePage(n)" :class="{'am-active':current == n}">
                 <a href="#">{{n}}</a>
              </li>
              <template v-if="last >5 && (last - current)>2 ">
                 <li><a href="#">...</a></li>
                 <li><a href="#" @click="chnagePage(last)">{{last}}</a></li>
              </template>
              <li :class="{'am-disabled':current >= last}" @click="addPage"><a href="#">&raquo;</a></li>
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
            if(l >5){
               if((c - 3)<=0)
                  arr=[1,2,3,4,5];
               else if((c+2) >l)
                  arr = [l-4,l-3,l-2,l-1,l];
               else arr = [c-2,c-1,c,c+1,c+2];

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
