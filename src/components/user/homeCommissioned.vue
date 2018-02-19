<template>

    <div class="am-panel am-cf am-panel-default" :class="'panel-'+index">
        <div class="am-panel-hd cover">
            <div class="cover-wrap" >
                <div class="cover-bar">
                    <div class="cover-img center-img" :style="'background-image:url('+ data.house_img.cover[0].get + ')' ">
                    </div>
                </div>
            </div>
        </div>
        <div class="wrap">
            <div style="position:absolute;top: 0;right: 0;left: 0;bottom: 0;">
                <div style="height:100%;width: 100%;">
                    <div class="am-text-left hd-text">
                        <span>{{data.city}} {{data.community}} {{data.building_number}}号楼 {{data.unit_number}}单元 {{data.house_number}}号</span>
                        <a v-if="getStatus != false" class="am-badge am-badge-secondary am-radius">{{getStatus[data.status]}}</a>
                    </div>
                    <transition name="liner-up">
                        <div class="content-wrap" v-show="open">
                            <div class="am-panel-bd am-scroll-vertical" style="height:100%;">
                                        <div>
                                            提交日期：{{data.created_at}}
                                        </div>
                                        <div>
                                            联系人 ：{{data.contact}}  联系人电话：{{data.tel}}
                                        </div>
                                        <div>
                                            地址：{{data.location}}
                                        </div>
                                        <div>
                                            小区：{{data.community}}
                                        </div>
                                        <div>
                                            户型 ：
                                            <span v-if="data.room_count.hall >0"> {{data.room_count.hall}}厅 </span>
                                            <span v-if="data.room_count.bedroom >0"> {{data.room_count.bedroom}}室 </span>
                                            <span v-if="data.room_count.bathroom >0"> {{data.room_count.bathroom}}卫     </span>
                                            <span v-if="data.room_count.belcony >0"> {{data.room_count.belcony}}阳台 </span>
                                            <span v-if="data.room_count.kitchen >0"> {{data.room_count.kitchen}}厨房 </span>
                                        </div>
                                        <div>
                                            <span>
                                                装修：{{data.Decoration}}
                                            </span>
                                            <span class="am-margin-horizontal-sm">
                                                暖气：{{data.supply_heating}}
                                            </span>
                                            <span class="am-margin-horizontal-sm">
                                                电梯：{{data.elevator}}
                                            </span>
                                            <span class="am-margin-horizontal-sm">
                                                朝向：{{data.direction}}
                                            </span>
                                        </div>
                                        <div>

                                        </div>
                                        <div v-if="data.status == 'audit'" class="status-tip am-text-center">
                                            请耐心等待审核,这将不会需要太久.
                                        </div>
                                        <div v-else-if="data.status == 'pass'" class="status-tip am-text-center">
                                            <router-link to="">
                                                请前往补充资料。
                                            </router-link>
                                        </div>
                                        <div v-else-if="data.status == 'sell'" class="status-tip am-text-center">
                                            <router-link :to="'/house/'+data.id">
                                                去看一看.
                                            </router-link>
                                        </div>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
        <div class="am-panel-hd pft am-text-center">
            <span class="am-panel-title am-collapsed" @click="open = !open">
                 <i :class="open ? 'am-icon-angle-up' : 'am-icon-angle-down'"></i>
            </span>
        </div>
    </div>

</template>

<script>
    export default {
        name:'temp-commissioned',
        props:['data','index'],
        data(){
            return {
                open:false,
                el:null,
            }
        },
        mounted(){
            this.el = $('#amdoc-'+this.index);
            this.el.on('open.collapse.amui', (e)=> {
                this.open = true;
            }).on('close.collapse.amui', ()=> {
                this.open = false;
            });
        },
        methods:{

        },
        computed:{
            getStatus(){
                return this.$store.getters['house/getStatus'];
            }
        }
    }
</script>

<style scoped>
    .wrap{
        padding-top: 70%;
        vertical-align: bottom;
        display: block;
    }

    .am-panel-default > .am-panel-hd{

        background: #fff;
    }
    .am-panel-hd,
    .am-panel-bd,
    .am-panel-default{
        border-color: #5085ff5e;
        border-radius:6px;
    }
    .am-panel-hd{
        padding-top: 0 !important;
        padding-left: 0 !important;
        padding-right: 0 !important;

    }
    .am-panel-title{
        display: block;
        cursor: pointer;
        padding: 0.5rem;
        transition:0.3s;

    }
    .am-panel-title:hover {
        color: #5085FF;
        background: #f0f0f0;
    }
    .am-panel-bd{
        border-top: 1px solid #5085ff1e !important;
        background: #ffffff;
    }
    .am-panel-hd.pft span:hover .am-icon-angle-up:after,
    .am-panel-hd.pft span:hover .am-icon-angle-down:after{

        color: #5085FF;
        padding-left: 5px;
    }
    .am-panel-hd.pft span:hover .am-icon-angle-down:after{
        content:"显示详细";
    }
    .am-panel-hd.pft span:hover .am-icon-angle-up:after{
        content:"隐藏";
    }

    .am-panel-hd.pft{
        color: #b5b5b5;
        background-color: #fff;
        padding: 0;
        text-align: center;
        border: 0;
        border-top: 1px solid #5085ff1f;
    }

    .cover-wrap{
        width: 100%;
        display: block;
        height: 100%;
    }
    .cover-bar{
        width: 100%;
        height: 100%;
    }
    .cover-img{
        position:absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
    }
    .hd-text{

        padding-left: 10px;
        padding-top: 3px;
        background: #000;
        height: 30px;
        font-size: 16px !important;
        /*line-height: 24px;*/
        color:#333;
        z-index: 5;
       /* position: absolute;
        bottom: 0;
        right: 0;
        left: 0;*/

        vertical-align: bottom;
    }
    .hd-text a{
        position:absolute;
        top: 5px;
        right: 10px;
        /*margin-top: 4px !important;*/
        /*margin-right: 10px !important;*/
    }
    .status-tip{
        padding-top: 10px;
    }
    .content-wrap{
        width: 100%;
        height: calc(100% - 30px);
    }
    .cover{
        position:absolute;
        top: 0;
        bottom: 250px;
        right: 0;
        left: 0;
    }
</style>
