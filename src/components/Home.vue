<template>
    <div id="home" v-show='start'>
        <div id="head" class="am-cf">
            <nav-top position="absolute" input="home"></nav-top>
            <template v-if="alertShow">
                <alert :content="message" @close="alertClose"></alert>
            </template>
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
                    <hot @loadinged="startRender"></hot>
                </div>
            </div>
            <div id="home-info-bar">
                <middleInfo></middleInfo>
            </div>
        </div>
        <homefooter ></homefooter>

        <!--  alert  -->
    </div>
</template>

<script>

/**
 *  components
 */
import navTop from '@/components/nav/search-nav'
import search from '@/components/home/homeSearchBar'
import hot from '@/components/home/homeHotBar'
import top from '@/components/ToPageTop'
import homefooter from '@/components/Footer'
import alert from '@/components/utils/alert'
import middleInfo from '@/components/home/why-sell-house'

/**
 *  ajax
 */
import sender from '@/Sender.js'

/**
 *  mixins
 */
import user from '@/mixin/user'


/**
 *  model
 */
export default {
    name:'Home',
    mixins:[user],
    components:{
        navTop,
        hot,
        search,
        top,
        homefooter,
        alert,
        middleInfo
    },
    mounted(){

    },
    data:function(){
        return {
            result:null,
            searchStart:false,
            welcome:['让你在繁华的闹市中，有一间属于自己的庇护所','与家人一起，在新居中迎接新年','随波逐流的你也需要休息','好几个星期了，我都想着她','最后已事过境迁 长街风景已变','千万不要因为走得太久，而忘记了我们为什么出发'],
            start:false,
            message:'',
            alertShow:false,
        }
    },
    methods:{
        startRender(){
            this.start = true;
        },
        randWelcome(){
            let lth = this.welcome.length;
            let r = Math.floor(Math.random()*lth);

            return this.welcome[r];
        },
        alertClose(){
            this.alertShow = false;
        }
    },
    computed:{

    },
    watch:{
        _unreadSystemCount(val){
            if(!val || val == false){
                this.alertShow = false;
                return;
            }

            this.message = '你有' + val + '条未读通知,<a class="am-link" href="#/user/message/system">请前往查看<a> ';

            this.alertShow = true;
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
#head >>> .search-nav{
    border-bottom: 1px solid #e1e1e1;
    box-shadow: 0 2px 2px #f1f1f1;
}

</style>
