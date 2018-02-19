<template>
    <div class="custom-marker">
        <div>
            <div class="marker-wrap " :class="{hover:(item.id == hover),readed:isRead}">
                <div class="marker-content">
                    <div class="white">
                        <span class="am-inline-block current">¥</span>
                        <span class="am-inline-block price">{{item.content.price}}万</span>
                    </div>

                </div>
                <div class="marker-down-icon" :class="{'icon-hover':(item.id == hover)}"></div>
            </div>
        </div>

    </div>
</template>

<script>
    export default{
        name:'mapMarkerTemplate',
        props:['item',"hover"],
        computed:{
            isRead(){
                let hid = this.item.id;
                let str = this.$storage;
                let logs = str.get('_TTMD_HOUSES_LOG') || [];
                return (logs.findIndex(e=> e == hid) >= 0);
            }
        }
    }
</script>
<style scoped>
    .custom-marker{
        width: auto;
        height: auto;
    }
    .marker-wrap{
        /*margin-top: -8px;
        margin-left: -38px;*/
        position: relative !important;
        display: inline-block !important;
        background: #fff;
        border:1px solid #e1e1e1;
        box-shadow:1px 2px 5px #616161;

    }
    .marker-down-icon{
        /*bottom: -4px !important;*/
        top: 26px;
        left: 45% !important;
        /*margin-left: -4px !important;*/
        box-shadow: 1px 3px 4px 0 rgba(0, 0, 0, 0.15) !important;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid #fff;
        /*-webkit-transform: rotate(45deg) !important;*/
        /*-ms-transform: rotate(45deg) !important;*/
        /*transform: rotate(45deg) !important;*/
        position: absolute !important;

    }
    .marker-content{
        padding-left: 5px;
        padding-bottom: 1px;
        padding-top: 2px;
        padding-right: 5px;
        font-size: 17px;
        font-weight: 600;
    }
    .white{
        white-space:nowrap;
    }

    .hover{
        border-color:#888 !important;
        color:#fff!important;
        background: #888!important;
    }
    .icon-hover{
        border-top-color:#888 !important;
    }

    .readed{
        color: #757575;
    }
</style>
