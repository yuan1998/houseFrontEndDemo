<template>
        <div class="help-alert">
            <transition name="sale">
            <div class="help-alert-max" v-if="visible">
                    <div class="help-wrap" >

                            <div class="help-bar" >
                                <div class="am-panel">
                                    <div class="am-panel-bd">
                                        <div class="header am-text-center">
                                            体验帮助
                                        </div>
                                        <div class="close-btn">
                                            <button @click="hide" type="button" class="am-close">&times;</button>
                                        </div>
                                        <div class="content am-scrollable-vertical">
                                            <div class="content-item">
                                                <div class="title">
                                                    1.描述
                                                </div>
                                                <div class="post">
                                                    <p>(项目仍在开发中)</p>
                                                    <p>该项目为前后端分离.</p>
                                                    <p>该项目以 Mobile First 为理念,从小屏逐步扩展到大屏.</p>
                                                    <p>管理员用户:liubibi 密码:123456 (后台开发未完成,管理员功能不大.)</p>
                                                </div>
                                            </div>
                                            <div class="content-item">
                                                <div class="title">
                                                    1-1.前端
                                                </div>
                                                <div class="post">
                                                    <p>前端使用 <a href="https://cn.vuejs.org/v2/guide/index.html" class="am-link">Vue</a>和<a href="http://www.amazeui.org/" class="am-link">amazeui</a></p>
                                                    <p>组件:<a href="https://elemefe.github.io/vue-amap/#/">amap</a> </p>
                                                    <p>github地址: <a href="https://github.com/yuan1998/houseFrontEndDemo">https://github.com/yuan1998/houseFrontEndDemo</a></p>
                                                </div>
                                            </div>
                                            <div class="content-item">
                                                <div class="title">
                                                    1-2.后端
                                                </div>
                                                <div class="post">
                                                    <p>后端使用<a href="https://laravel.com/">laravel</a> 开发</p>
                                                    <p>github地址: <a href="https://github.com/yuan1998/housesDemo">https://github.com/yuan1998/housesDemo</a></p>
                                                </div>
                                            </div>
                                            <div class="content-item">
                                                <div class="title">
                                                    2.搜索
                                                </div>
                                                <div class="post">
                                                    <p>只有西安的数据,故只能搜索西安地区.</p>
                                                </div>
                                            </div>
                                            <div class="content-item">
                                                <div class="title">
                                                    3.切换城市
                                                </div>
                                                <div class="post">
                                                    <p>开发阶段,城市固定为西安,无法切换...</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="comfirm-btn am-text-center">
                                            <button class="am-btn" @click="hide">朕知道了.</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                    </div>
            </div>
            </transition>
        </div>
</template>

<script>
import unity from '@/mixin/unity'

    export default{
        name:'helpAlert',
        mixins:[ unity ],
        data(){
            return{
                visible:false,
            }
        },
        mounted(){
            console.log('231');
            this.$storage.set("_READ_HELP",true);
        },
        methods:{
            hide(){
                this.visible = false;
            },
            show(){
                this.visible = true;
            }
        },
        watch:{
            visible(val){
                val
                ? this._bodyAddClass('help-open')
                : this._bodyRemoveClass('help-open');
            }
        }
    }
</script>

<style scoped>
    .close-btn{
        position:absolute;
        top: 10px;
        right: 30px;
        display: inline-block;display: none;
    }
    .help-alert-max{
        z-index: 10;
        position:fixed !important;
        top: 0;left: 0;bottom: 0;right: 0;
        background: rgba(255,255,255,0.75) !important;
    }
    .help-wrap{
        position: absolute;
        top: 50%;
        left: 50%;
        width: 89%;
        transform: translate(-50%,-50%);
    }
    @media only screen and (min-width: 900px){
        .help-wrap{
            width: 800px;
        }
        .close-btn{
            display: block !important;
        }
    }
    .comfirm-btn button{
        background: #ff5a5f;
        color:#fff;
        font-size: 18px;
        font-weight: 500;
        border-radius: 5px;
    }
    .header{
        font-size: 22px;
        color:#666;
        user-select: none;
    }
    .close-btn button{
        opacity: 1 !important;
        color:#ff5a5f !important;
        font-size: 70px !important;
        font-weight: 300 !important;
        display: block !important;
        user-select: none !important;

    }
    .am-panel{
        border:1px solid #e1e1e1;
        box-shadow: 2px 3px 15px #e1e1e1;
    }
    .am-panel-bd{
        background: #fff;
    }

    .content{
        margin-top: 13px;
        padding-left: 10px;
        padding-right: 10px;
        margin-bottom: 15px;
        height: 100%;
        resize: none;
        max-height: 500px;
        box-shadow: 0 -2px 8px #e1e1e1 inset;
    }

    .content::-webkit-scrollbar{
        width: 5px;
        height: 8px;
        background-color: #f1f1f1;
    }
    .content::-webkit-scrollbar-thumb{
        background: #ff5a5f;
        border-radius:2px;
    }
    .content .title{
        font-size: 18px;
        line-height: 28px;
        padding-bottom: 5px;
    }
    .content .post{
        padding-left: 8px;
    }
    .content .content-item{
        padding-bottom: 15px;
    }

    .sale-leave-to,
    .sale-enter{
        transform:scale(0);
        opacity: 0;
    }
    .sale-leave,
    .sale-enter-to{
        opacity: 1;
        transition:scale(10);
    }
    .sale-leave-active,
    .sale-enter-active{
        transition: transform 0.4s ease-in,opacity 0.5s ease-out;
        /*transition-delay: 0.5s*/
    }

</style>
