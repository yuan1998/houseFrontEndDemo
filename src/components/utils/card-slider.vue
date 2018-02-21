<template>
    <div class="card-img-bar">
        <div class="cover-img center-img"
            :class="[(hover && !$IsMobile.isMobile) ? 'hover' : 'is-mobile']  "
            :style="{
                'background-image':'url('+ getImg + ')',
                cursor: link ? 'pointer' : 'auto'
            }"
            @click.self="linkEvent">
            <template v-if="hover">
                <div class="pre" @click="numLess">
                    <i class="am-icon-angle-left"></i>
                </div>
                <div class="index">
                    <span>{{num + '/' + arr.length}}</span>
                </div>
                <div class="next" @click="numAdd">
                    <i class="am-icon-angle-right"></i>
                </div>
            </template>

        </div>
    </div>
</template>

<script>
    export default{
        name:'cardImgBar',
        props:['link','hover','images'],
        data(){
            return {
                num:1,
                arr:[]
            }
        },
        mounted(){

            setTimeout(res=>{
                this.allImg();
            },0)

        },
        methods:{
            numAdd(){
                if(this.num == this.arr.length)
                    this.num = 1;
                else this.num++;
            },
            numLess(){

                if(this.num == 1)

                    this.num = this.arr.length;

                else this.num--;

            },
            linkEvent(){
                let link = this.link;
                if(!link || link == false)
                    return;

                this.$router.push({path:link});
            },
            allImg(){
                for(let key in this.images){
                    let item = this.images[key];

                    for(let i of item){
                         this.arr.push(i.get);
                    }
                }
            }
        },
        computed:{
            getImg(){
                let arr=[];
                for(let key in this.images){
                    let item = this.images[key];

                    for(let i of item){
                         arr.push(i.get);
                    }
                }
                return arr[this.num - 1];
            },
        }
    }
</script>

<style scoped>
    .card-img-bar{
        width: 100%;
        height: 100%;
        display: block;
        z-index: 1;
    }
    .cover-img{
        position:absolute;
        top: 0;left: 0;right: 0;bottom: 0;
    }


    .next,
    .pre{
        /*display: none;*/
        display: table !important;
        height: 100%;
        opacity: 0;
        transition:opacity 0.3s ease-out;
        text-align:center;
        width: 80px;
        cursor:pointer !important;
    }

    .next i,
    .pre i{
        vertical-align: middle !important;
        display: table-cell;
        font-size: 50px;
        color:#f1f1f1;
        text-shadow: 0 0 5px #ff5a5f;
    }

    .next{
        position:absolute;
        right: 0;
        top: 0;
        bottom: 0;
        background: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.25) 100%) !important;
    }
    .index{
        position:absolute;
        bottom: 0;
        right: 0;
        left: 0;
        text-align:center;
        opacity: 0;
        transition:opacity 0.3s ease-out;
    }

    .index span{
        font-size: 16px;
        font-weight: 400;
        color:#333;
        text-shadow:0 0 2px #f1f1f1;
    }


    .pre{
        position:absolute;
        left: 0;
        top: 0;
        bottom: 0;
        background: linear-gradient(to left, transparent 0%, rgba(0, 0, 0, 0.25) 100%) !important;
    }
    .hover:hover .index,
    .hover:hover .next,
    .hover:hover .pre{
        opacity: 1;
    }

    .is-mobile .index,
    .is-mobile .next,
    .is-mobile .pre{
        opacity: 1;

    }

</style>
