<template>
    <transition>
        <div id="home-search-bar " class="am-cf">
            <div class="content am-u-sm-11 am-u-sm-centered am-cf">
                <form @submit.prevent="search" class="am-form am-g am-g-collapse">
                    <div class="am-u-md-6">
                        <div class="am-form-group">
                            <label>目标</label>
                            <input type="text" v-model="destination" placeholder="请输入你的目标">
                        </div>
                    </div>
                    <div class="am-u-md-6">
                        <div class="am-form-group am-u-md-8">
                            <label>路段</label>
                            <input type="text" v-model="road" placeholder="或者输入路段">
                        </div>
                        <div class="am-u-md-4 am-text-center">
                            <button class=" search-btn am-btn am-btn-lg am-btn-default">搜索</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </transition>
</template>

<script>
import unity from '@/mixin/unity'

    export default{
        mixins:[unity],
        name:'homeSearch',
        data(){
            return {
                destination:'',
                road:'',
            }
        },
        methods:{
            search(){
                let d = this.destination;
                let r = this.road;

                if(!r && !d)
                    this.$router.push({path:'/search?address='+this._getCity});
                else this.$router.push({path:'/search?address='+ (r || d)});

            }
        }
    }
</script>

<style scoped>
   .content{
      border:1px solid #e0e0e0;
      border-radius:8px;
      box-shadow: 0px 2px 3px #f0f0f0;
   }
   .am-form-group input{
       font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif !important;
       font-size: 19px !important;
       line-height: 24px !important;
       padding-bottom: 5px !important;
       color: #484848 !important;
       background-color: transparent !important;
       border: 0px !important;
       padding: 11px !important;
       width: 100% !important;
       font-weight: normal !important;
       text-overflow: ellipsis !important;
       /*transition:border 0.2s ease-out;*/
   }
   .am-form-group{
      padding-top: 15px;
      margin-bottom: 5px;
      padding-right: 20px;
      padding-left: 5px;
   }

   @media only screen and (min-width: 640px) {
      .am-form .am-u-md-6:first-child{
         border-right:1px solid #e0e0e0;
      }
      .search-btn{
         margin-bottom: 0px !important;
      }
   }

   @media only screen and (min-width: 0px) and (max-width: 639px){
      .search-btn{
         padding: 0.9em 1.9em !important;
      }
   }

   .am-form-group input:focus{
      outline: none ;
      box-shadow: none;
      padding-bottom: 8px!important;
      border-bottom: 3px solid #ff5a5f !important;
   }
   .am-form-group label{
      padding-left: 10px;
      color:#707070;
      font-weight: 400;
      line-height: 22px;
      font-size: 17px;
   }
   .search-btn{
      margin-top: 26px;
      background: #ff5a5f;
      border-radius:7px;
      color:#f0f0f0;
      font-size: 19px;
      line-height: 15px;
      padding: 0.8em 1em;
      margin-bottom: 10px;
   }
</style>
