<template>
    <div id="app" style="" class="am-cf">
        <router-view></router-view>
    </div>
</template>

<script>
// import helpalert from '@/components/help/alert/'
    export default{
        name:'app',
        mounted(){

            if(this.$storage.enabled && !this.$storage.get("_READ_HELP"))
                this.openHelp();
        },
        methods:{
            openHelp(){
                setTimeout(res=>{
                    this.$_alert();
                },1500)
            }
        }
    }
</script>

<style>
    [v-cloak]{
        display: none;
    }
    *{
        position:relative;
        font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif !important;
    }
    img {
        box-sizing: border-box;
        border: 0;
    }
    textarea{
        resize: none;
    }

    input,
    input:focus,
    button,
    button:focus{
        outline:none !important;
        box-shadow: none !important;
    }


    .help-open,
    .reservation-open,
    .sm-map-open,
    .menu-open,
    .search-open,
    .slider-open{
        overflow: hidden !important;
        height: 100% !important;
    }
/*#appHome{
  background-image: url('https://farm4.staticflickr.com/3854/32764887833_7c91946505_k.jpg');
  height: 500px;
    background-color: transparent;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}*/

    .center-img{
        background-size: cover;
        background-position: center;
        display: inline-block;
        background-repeat: no-repeat;
    }

    .height-max-img{
        background-size:auto 100% !important;
    }

    .contain-img{
        -webkit-background-size: contain !important;
        background-size: contain !important;
    }

    .width-img{
        background-size: 100% 100%;
        background-position: center;
        display: inline-block;
        background-repeat: no-repeat;
    }
    #nprogress .nprogress-bar{
        background: #8387d2;
    }
    #nprogress .nprogress-peg{

        -webkit-box-shadow: 0 0 10px #c91f63, 0 0 5px #c91f63;
        box-shadow: 0 0 10px #c91f63, 0 0 5px #c91f63;

    }
    #nprogress .nprogress-spinner-icon{
        border-top-color:#8387d2;
        border-right-color: #c91f63;
    }
    #signup-login-bar .box{
        padding-left: 0;
        padding-right: 0;
    }
    #signup-login-bar .container{
        z-index: 55 !important;
        position:absolute !important;
        top: 50% !important;
        left: 50% !important;
        transform:translate(-50%,-50%) !important;
    }
    #signup-login-bar .header{
        font-weight: 500;
        font-size: 50px;
        color:#fff;
        user-select: none;
        margin-bottom: 10px;
    }

</style>
