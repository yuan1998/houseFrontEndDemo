<template>
    <transition>
        <div class="user-home-page">
            <div class="content" v-if="getUser">
                <div class="user-bar">
                    <div class="user-info">
                        <avatar></avatar>
                        <div class="am-text-center user-info-bar">
                            <div class="info-username">
                                用户名:{{getUser.username}}
                            </div>
                            <div class="info-more">
                                <router-link to="/user/self" class="am-btn info-read-btn">
                                    <span class="am-block">查看详细</span>
                                    <i class="am-icon-angle-down"></i>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="user-commissioneds">
                        <div class="commissioned-header am-text-center">
                            <span class="">我的房源</span>
                        </div>
                        <div class="am-panel-group" v-if="houses != false" id="commisioned-bar">
                            <div class="am-cf">
                                <template v-for="(item,n) in houses">
                                    <div class="am-u-sm-12 am-u-md-6 am-g-collapse commissioned-item">
                                        <tempc v-bind:data="item" v-bind:index="n"></tempc>
                                    </div>
                                </template>
                            </div>

                            <div class="more-text" v-if="total > 2">
                                <div class="am-text-center am-margin-top">
                                    <span style="color:#5085ff">.....</span>
                                </div>
                                <div class="am-text-center">
                                    <div href="#" class="cimmissioned-read-btn">
                                        <router-link tag="span" to="/user/commissioneds" class="am-block">查看更多</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="am-text-center not-houses" v-else>
                            <span class="">没有发布任何房源</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import sender from '@/Sender.js'

import tempc from '@/components/user/homeCommissioned'

import avatar from '@/components/user/userAvatar'

   export default{
      components:{
         tempc,
         avatar,
      },
      name:'userHome',
      data(){
         return{
            user:null,
            newAvatar:[],
            houses:[],
            total:0,
         }
      },
      mounted(){
        this.getUserHouse();
      },
      methods:{
         getUserD(){
            let user = this.$store.getters['user/user'];
            this.user =  user ||'error';
         },
         getUserHouse(){
            sender('/api/house/getUserHouse',{page:1}).then(res=>{
              this.houses = res.data.data.filter((res,index)=> index <2);
              this.total = res.data.total;
              console.log(res.data);
            })
         }
      },
      computed:{
         getUser(){
            return this.$store.getters['user/user'];
         }
      }
   }
</script>

<style scoped>
    .user-info{
        margin-bottom: 50px;
    }
    .avatar-bar img{
        width:200px;
        height:200px;
        line-height: 0;
        /* remove line-height */
        display: inline-block;   /* circle wraps image */
        border-radius: 50%;  /* relative value */
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        transition: linear 0.25s;

    }
    .avatar-bar{
        display: inline-block;
        width: 200px;
        height: 200px;
        border-radius:200px;
        background: #ececec;
        box-shadow: 0px 0px 1px rgba(0,0,0,0.4);
    }
    .user-avatar{
        min-height: 270px;
    }
    .cimmissioned-read-btn,
    .info-read-btn{
        color:#5085FF;
        transition: 0.5s;
        padding:6px 10px 0px 10px;
        border-radius: 5px;
    }
    .info-read-btn:hover{
        /*background: #f0f0f0;*/
        color:#004dff;
    }

    .uploadSuccess,
    .avatar-btn{
        position:absolute;
        top: 50%;
        left: 50%;
        transform:translate(-50%,-50%);
        color:rgba(255,255,255,0.9);
        font-weight: 600;
        display: block;
    }

    .avatar-btn{

        opacity:0.2;
        transition:opacity 0.5s ease-out;
        border-radius:6px;

        font-size: 20px;
        background: rgba(0,0,0,0.3);
        border: 3px solid rgba(255,255,255,0.7);

    }

    .uploadSuccess{
        font-size: 75px;
    }

    .avatar-btn:hover,
    .user-avatar img:hover~.avatar-btn{
        opacity:1;
    }

    .am-panel-group{
        margin-bottom: 0.3rem;
    }

    .commissioned-header span{
        font-size: 32px;
        color:#464646;
        padding-bottom: 15px;
        display: block;
    }
    .more-text{
        margin-bottom: 30px;
    }
    .more-text span{
        font-size: 16px;
        line-height: 24px;
    }
    .info-more a,
    .info-username{
        font-size: 16px;
    }
    .info-username{
        color:#666;
        padding-bottom: 10px;
    }

    .commissioned-header span{
        color:#555;
    }
    .commissioned-item{
        padding-left: 1.2vw !important;
        padding-right: 1.2vw !important;
        margin-top: 12px;
    }

    .not-houses{
        color:#999;
        font-size: 22px;
    }

</style>
