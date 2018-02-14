<template>
    <transition>
        <div class="search-nav">
            <div class="logo am-vertical-align-middle am-vertical-align">
                <div class="back-home"><router-link class=" logo" to="/">4nn</router-link></div>
                <div class="menu-btn logo" @click="menuStatu">
                    4nn
                    <span>
                        <i class="am-icon-angle-down" style="transition-duration: 250ms;" :style="'transform : rotate('+ (menuOpen ? '180deg' : '0deg') +')'"></i>
                    </span>
                </div>
            </div>
            <div class="nav-search-bar am-vertical-align-middle" v-show="!input">
                <div class="search-input-bar">
                    <button @click="openSearch" class="input-btn am-btn am-text-left">
                        <i class="am-icon-search"></i>
                        {{getKeyword}} · 房源
                    </button>
                </div>
            </div>
            <div class="nav-wrap am-fr am-vertical-align-middle">
                <ul class="nav-list">
                    <router-link tag="li" to="/"><a >首页</a></router-link>
                    <router-link tag="li" to="/yezhu/maifang"><a >卖房</a></router-link>
                    <template v-if="_isLogin">
                        <li class="user-message"
                        @mouseenter="messageBar = true"
                        @mouseleave="messageBar = false">
                            <a >消息 <sub></sub></a>
                            <transition name="drop-down">
                                <ul class="user-message-bar" v-show="messageBar">
                                    <li class="message-title">
                                        通知({{_unreadSystemCount}})
                                        <span class="am-fr">查看全部</span>
                                    </li>
                                    <li class="item am-text-truncate">你的戏啊实打实大时代啊爽的啊爽的啊的啊大萨芬阿斯顿发阿斯顿发阿斯顿
                                    </li>
                                </ul>
                            </transition>
                        </li>
                    </template>

                    <router-link tag="li" to="/help"><a >帮助</a></router-link>
                    <template v-if="_isLogin">
                        <li class="nav-avatar-bar"
                        @mouseenter="userBar = true"
                        @mouseleave="userBar = false">
                            <a class="center-img nav-avatar am-text-middle"
                               :style="'background-image: url('+_getAvatar+')'">
                            </a>
                            <transition name="drop-down">
                                <ul class="nav-user-bar"
                                        v-show="userBar">
                                    <li><a >编辑个人资料</a></li>
                                    <li @click="_logout"><a>退出</a></li>
                                </ul>
                            </transition>
                        </li>
                    </template>
                    <template v-else>
                        <router-link tag="li" to="/login"><a >登录</a></router-link>
                        <router-link tag="li" to="/sign"><a >注册</a></router-link>
                    </template>
                </ul>
            </div>
            <div class="search-bar">
                <div class="top am-text-center">
                    <button @click="closeSearch" type="button" class="am-close">&times;</button>
                    <span>地点</span>
                    <button type="button" class="empty-btn" @click="keyword = '' ">清空</button>
                </div>
                <div class="search-input">
                    <div class="am-u-sm-12">
                        <input @keydown.enter="search" class="am-block" type="search" v-model="keyword">
                    </div>
                </div>
            </div>
            <transition name="slate" :duration="1000">
                <div class="menu-bar" v-show="menuOpen">
                    <div >
                        <ul class="menu-content">
                            <router-link tag="li" to="/"><a href="#">首页</a></router-link>
                            <li><hr></li>
                            <router-link tag="li" to="/yezhu/maifang"><a href="#">卖房</a></router-link>
                            <template v-if="!_isLogin">
                                <router-link tag="li" to="/login"><a href="#">注册</a></router-link>
                                <router-link tag="li" to="/sign"><a href="#">登录</a></router-link>
                            </template>
                            <template v-else>
                                <router-link tag="li" to="/user/home"><a href="#">个人主页</a></router-link>
                                <router-link tag="li" to="/user/info"><a href="#">个人资料</a></router-link>
                                <router-link tag="li" to="/user/commissioned"><a href="#">个人委托</a></router-link>
                                <li><hr></li>
                                <router-link tag="li" to="/user/message/user"><a href="#">私信</a></router-link>
                                <router-link tag="li" to="/user/message/system"><a href="#">系统通知</a></router-link>
                            </template>
                            <li><hr></li>
                            <router-link tag="li" to="/help"><a href="#">帮助</a></router-link>
                            <template v-if="_isLogin">
                                <li @click="_logout"><a>登出</a></li>
                            </template>
                        </ul>
                    </div>
                </div>
            </transition>

        </div>
    </transition>
</template>

<script>
import m_user from '@/mixin/user.js';

export default {
     name:"searchNav",
     mixins:[m_user],
     props:{
        input:{
            Type:Boolean,
            default:false,
        }
     },
     data(){
        return {
            menuOpen:false,
            keyword:'',
            userBar:false,
            messageBar:false,
        }
     },
     methods:{
        openSearch(){
            $('.search-bar').css("display",'block');
            $('body').addClass('search-open');
        },
        closeSearch(){
            $('.search-bar').css("display",'none');
            $('body').removeClass('search-open');
        },
        menuStatu(){
            this.menuOpen = !this.menuOpen;
            $('body').toggleClass('menu-open');
        },
        search(){
            if(!this.keyword || this.keyword == false)
                return;
            this.closeSearch();
            this.$router.push({path:'/search?address='+this.keyword});
        }
     },
     computed:{
        getKeyword(){
             let key = this.$route.query.address || this.getCity;
             this.keyword = key;
             return key;
          }
     }
}
</script>

<style scoped>
.search-nav{
    position:fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background: #fff;
    height: 70px;

}
.logo div{
    padding-left: 20px;
    font-size: 22px;
    color:#666;
    z-index: 3;
}

.nav-search-bar{
    position: absolute;
    left: 80px;
    right: 30px;
}
.nav-search-bar .search-input-bar{
    left: 9px;
    top: 15px;
}

.nav-search-bar .input-btn{
    padding-left: 8px;
    height: 40px;
    width: 100%;
    font-size: 16px;
    color:#666;
    border:1px solid #e0e0e0;
    border-radius:5px;
    box-shadow: 0 2px 2px #e0e0e0;
    z-index: 3;
}
.nav-wrap{
    height: 100%;
}
.nav-wrap,
.nav-search-bar,
.logo{
    display: inline-block;
}
.nav-list{
    margin: 0;
    display: block;
}
.nav-list > li {
    list-style-type: none;
    display: inline-block;
    padding-top: 25px;
    padding-bottom: 23px;
    font-size: 16px;
    padding-left: 8px;
    padding-right: 8px;
    margin-right: 8px;
    cursor:pointer;
}
.nav-list > li:hover{
    border-bottom:3px solid #999;
}
.am-icon-search{
    font-size: 16px;
    color:#e1e1e1;
}
li a {
    color:#666;
}

.menu-bar,
.search-bar{
    position:fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    z-index: 2;
}
.search-bar{
    z-index: 7 !important;
    display: none;

}

.search-bar .am-close{
    position: absolute;
    left: 9px;
    top: 9px;
    font-size: 45px;
    font-weight: 300;
    z-index: 9;
}
.empty-btn{
    position:absolute;
    right: 9px;
    top: 15px;
    font-size: 16px;
    font-weight: 400;
    color:#666;
    z-index: 8;
    border:none;
    background: #fff;
}
.search-bar .top span{
    font-size: 16px;
    margin-top: 10px;
    display: inline-block;
    z-index: 8;
}
.search-input input{
    z-index: 8;
    margin-top: 20px;
    width: 100%;
    height: 46px;
    border-radius:5px;
    border:1px solid #e1e1e1;
    padding-left: 9px;
    font-size: 19px !important;
    line-height: 24px !important;
    font-weight: 400;
    color:#666;
    font-family: "Hiragino Sans GB","华文细黑","STHeiti","微软雅黑","Microsoft YaHei",SimHei,"Helvetica Neue",Helvetica,Arial,sans-serif !important;
}

.menu-btn{
    display: none;
}

@media only screen and (max-width: 1000px) and (min-width: 0){
    .nav-wrap{
        display: none;
    }
    .back-home{
        display: none;
    }
    .menu-btn{
        display: block;
    }

}

@media only screen and (max-width: 700px) and (min-width: 0){
    .nav-search-bar .search-input-bar{

        right: 10px;
    }
}

@media only screen and (min-width: 701px){
    .nav-search-bar .search-input-bar{
        width: 400px;
    }
}


.menu-content{
    display: block;
    padding-top: 88px;
    padding-left: 20px;
    padding-right: 20px;
    list-style-type: none;
    height: 100%;
}
.menu-content hr{
    margin-top: 20px;
    margin-bottom: 20px;
}
.menu-content a{
    font-size: 19px;
    padding-top: 5px;
    padding-bottom: 5px;
    display: block;
    font-weight: 400;
}

.slate-leave-to,
.slate-enter{
    transform: translateY(-100%) !important;
}
.slate-leave-active,
.slate-enter-active{
    transition: transform 305ms ease-out;
}

.drop-down-leave-to,
.drop-down-enter{
    z-index: -1 !important;
    opacity: 0;
    transform:translateY(-1em);
}

.drop-down-enter-to{
    z-index: 1 !important;
    opacity: 1;
    transform: translateY(0%);
}

.drop-down-leave-active,
.drop-down-enter-active{
    transition: opacity 0.3s ease-in-out,transform 305ms ease-out;
}



.nav-avatar{
    width: 35px;
    height: 35px;
    border-radius: 35px;
}
.nav-avatar-bar{
    padding-top: 15px !important;
    padding-bottom: 15px !important;
}

.user-message-bar,
.nav-user-bar{
    display: block;
    z-index: -1;
    padding: 0;
    position:absolute;
    list-style-type: none;
    top: 90%;
    left: auto;
    right: 0;
    background: #fff;
    border:1px solid #f1f1f1;
    box-shadow: 0 0 3px rgba(0,0,0,0.1);
    border-radius: 2px;
    text-align: left;
    line-height: 1.4;
    background-clip: padding-box;
    animation-duration: .15s;
    margin-top: 10px;
}

.nav-user-bar{
    min-width: 270px;
}

.nav-user-bar > li{
    margin-right: 8px;
    margin-left: 8px;
    display: list-item;
    padding-left: 8px;
    color:#767676;
    font-size: 15px;
    font-weight: 400;
    line-height: 50px;
    border-bottom: 1px solid #e1e1e1;
    transition:border 0.2s ease-out;
}
.nav-user-bar > li:hover{
    /*background: #f1f1f1;*/
    border-bottom: 1px solid #919191;
}
.user-message-bar{
    max-width: 366px !important;
    padding-left: 5px;
    padding-right: 5px;
}


.message-title{
    border-bottom: 1px solid #c1c1c1;
    padding-top: 10px;
    padding-bottom: 7px;
    font-weight: 500;
    font-size: 17px;
    line-height: 28px;
    color:#666;
    margin-left: 9px;
    margin-right: 9px;
}
.message-title:hover{
    border-bottom: 1px solid #919191;
}
.message-title span{
    font-size: 15px;
    font-weight: 400;
}

.user-message-bar .item{
    font-weight: 400;
    font-size: 14px;
    line-height: 25px;
    color:#555;
    padding-left: 15px;
    padding-right: 10px;
    padding-top: 8px;
    padding-bottom: 8px;
}

.user-message sub{
    width: 5px;
    height: 5px;
    border-radius: 5px;
    position:absolute;
    top: -5px;
    right: -5px;
    background: #666;
}

.slate-enter-to{
    transform: translateY(0) !important;
}
.logo{
    color:#ff5a5f;
}
</style>

