<template>
   <transition>
      <div class="add-data-page" v-show="data !=false">
         <navtop></navtop>
         <div class="content">
            <div class="am-container">
               <form class="am-form">
                  <div v-if="page == 1" class='page-1'>
                     <div class="header am-margin-top-lg">
                        <h1 class="am-text-xxl">确认你的房源</h1>
                     </div>
                     <div class="body">
                        <div class="map">
                           <mapa v-bind:lng="lng" v-bind:lat="lat"></mapa>
                        </div>
                        <div class="am-u-lg-8 am-u-sm-12 am-u-end ">
                           <div class="am-g am-text-middle">
                              <div class="am-u-sm-12 am-u-md-3 am-text-center am-sm-only-text-left">
                                 <div class="am-g">
                                    <span class="am-text-xl">
                                       地址:
                                    </span>
                                 </div>
                              </div>
                              <div class="am-u-md-9">
                                 <div class="am-g">
                                    <span class="am-text-lg">{{data.location}}</span>
                                 </div>
                              </div>
                           </div>
                           <div class="am-g am-text-middle">
                              <div class="am-u-sm-12 am-u-md-3 am-text-center am-sm-only-text-left">
                                 <div class="am-g">
                                    <span class="am-text-xl">
                                       小区名称:
                                    </span>
                                 </div>
                              </div>
                              <div class="am-u-md-9">
                                 <div class="am-g">
                                    <span class="am-text-lg">{{data.community}}</span>
                                 </div>
                              </div>
                           </div>
                           <div class="am-g am-text-middle">
                              <div class="am-u-sm-12 am-u-md-3 am-text-center am-sm-only-text-left">
                                 <div class="am-g">
                                    <span class="am-text-xl">
                                       房屋地址:
                                    </span>
                                 </div>
                              </div>
                              <div class="am-u-md-9">
                                 <div class="am-g">
                                    <span class="am-text-lg">{{data.building_number}}号楼  {{data.unit_number}}单元 {{data.house_number}}号</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="am-u-sm-12 am-text-center am-margin-top-lg">
                           <div class=" am-text-right">
                              <button type="button" @click="page++" class="am-text-xl am-btn am-btn-default next-btn">是的，下一步<i class="am-icon-angle-right"></i></button>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="page-2" v-else-if="page == 2">
                    <div class="header am-margin-top-lg">
                        <h3 class="am-text-xxl">为你的房子贴上标签</h3>
                     </div>
                     <div class="body">
                        <div class="am-u-sm-12">
                          <div class="select-tags">
                            <div class="title">选择的标签</div>
                            <div class="select-tags-bar">
                                <div class="am-panel am-panel-default">
                                  <div class="am-panel-bd">
                                    <div class="not-tag" v-if="formData.tags == false">
                                      请在下方选择标签
                                    </div>
                                    <span class="tag-item" v-else v-for="(item,index) in formData.tags" >
                                      <span class="tag-title">{{item}}</span>
                                      <span @click="removeTag(index)" class="tag-close">x</span>
                                    </span>
                                  </div>
                                </div>
                            </div>
                          </div>
                        </div>
                        <div class="am-u-sm-12">
                          <div class="all-tags">
                            <div class="title">标签</div>
                            <div class="all-tags-bar">
                              <div class="am-panel am-panel-default">
                                <div class="am-panel-bd">
                                  <div v-if="lengthEqual()" class='not-tag'>
                                    你的房子真棒.
                                  </div>
                                  <template v-else>
                                    <span v-for="item in tags" v-if="inArray(item)" class="tag-item">
                                      <span class="tag-title">{{item}}</span>
                                      <span @click="addTag(item)" class="tag-add">+</span>
                                    </span>
                                  </template>

                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="am-u-sm-12">
                          <div class="commissioned">
                            <label >
                              <input @click.self="commissioned" class="am-inline-block" type="checkbox">
                              <span >委托售卖(我们将有专业的人士帮你出售，不过我们将收取成交价的98%作为委托金)</span>
                            </label>
                          </div>
                        </div>
                     </div>
                     <div class="am-u-sm-12 am-text-center am-margin-top-lg">
                         <div class="am-u-sm-6 am-text-left">
                            <button type="button" @click="page--" class="am-btn am-btn-link am-link-muted pre-btn"><i class="am-icon-angle-left"></i>回去，我再看看.</button>
                         </div>
                         <div class="am-u-sm-6 am-text-right">
                            <button type="button" @click="page++" class="am-text-xl am-btn am-btn-default next-btn">{{ formData.tags == false ? '没什么好说的下一步' : '下一步' }}<i class=" am-icon-angle-right"></i></button>
                         </div>
                      </div>
                  </div>
                  <div class="page-3" v-else-if='page==3'>
                     <div class="header am-margin-top-lg">
                        <h3 class="am-text-xxl">做好上架的准备</h3>
                     </div>
                     <div class="body">
                        <div class="am-u-md-5 am-u-md-push-7 am-u-lg-push-7 am-u-lg-reset-order am-margin-top-lg">
                           <div class="am-panel-default am-panel">
                              <div class="am-panel-bd">
                                 <h2>这是我们为您估计的价格</h2>
                                 <div class="am-text-center am-text-xl am-text-danger ">
                                    {{data.expect_price}}万元
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="am-u-md-7 am-u-md-pull-5 am-u-lg-pull-5 am-u-lg-reset-order">
                           <div class="am-g">
                                 <div class="am-form-group ">
                                    <label>想一个标题</label>
                                    <input type="text" placeholder="让别人眼前一亮" v-model="formData.title">
                                 </div>
                           </div>
                           <div class="am-g">
                                 <div class="am-form-group">
                                    <label>想一个副标题</label>
                                    <input type="text" placeholder="让别人欲罢不能" v-model="formData.sub_title">
                                 </div>
                           </div>
                           <div class="am-g">
                              <div class="am-form-group">
                                 <label>最终的售价</label>
                                 <span class="am-block">
                                   <input class="" placeholder="你最终决定的售价，不用写单位，单位为万元"
                                   type="text" v-model="formData.price">
                                   <span class="tag">万元</span>
                                 </span>

                              </div>
                           </div>
                           <div class="">
                              <div class="am-form-group">
                                 <label>描述你的房子</label>
                                 <textarea v-model="formData.product_info" placeholder="让别人想入非非" rows="5"></textarea>
                              </div>
                           </div>
                        </div>
                        <div class="am-u-sm-12 am-text-center am-margin-top-lg">
                           <div class="am-u-sm-6 am-text-left">
                              <button type="button" @click="page--" class="am-btn am-btn-link am-link-muted pre-btn"><i class="am-icon-angle-left"></i>回去，我再看看.</button>
                           </div>
                           <div class="am-u-sm-6 am-text-right">
                              <button :disabled="!nextValidator" type="button" @click="submit" class="am-text-xl am-btn am-btn-default next-btn">我准备好收钱了<i class=" am-icon-angle-right"></i></button>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div v-else-if="page == 4" class="page-4">
                        <div class="content">
                           <div class="am-text-center" style="margin-top:250px;">
                              <div class="am-text-xxxl">
                                 <i class="am-icon-check"></i>
                              </div>
                              <div class="am-text-xl">
                                 资料已提交，请您再次等待我们的审核.预计3小时后你就能看到你的房子.
                              </div>
                              <div class="am-text-xxxl">
                                 <i class="am-icon-clock-o"></i>
                              </div>
                              <div class="">
                                 <router-link to="/" class="am-text-xl am-link-muted">
                                    回到首页
                                 </router-link>
                              </div>
                           </div>
                        </div>
                     </div>
               </form>
            </div>
         </div>
      </div>
   </transition>
</template>

<script>
import sender from '@/Sender.js'
import navtop from '@/components/NavTop3'
import mapa from '@/components/user/map'



   export default{
      name:'houseAddData',
      props:['id'],
      components:{
         navtop,
         mapa
      },
      data(){
         let that = this;
         return {
            start:false,
            data:[],
            lng:0,
            lat:0,
            page:1,
            formData:{
               title:'',
               sub_title:'',
               price:'',
               product_info:'',
               id:that.id,
               tags:[],
            },
            tags:['新房','学区房','市中心','随时看房','地铁房'],
            next:false,
         }
      },
      mounted(){
         this.validator();
      },
      methods:{
         validator(){
            sender('/api/house/addDataValidator',{id:this.id}).then(res=>{
               this.data = res.data;
               this.init();
            },res=>{
               this.$router.push({path:'/404'});
            })
         },
         init(){
            this.getLngLat();
         },
         getLngLat(){
            $.get(`http://restapi.amap.com/v3/geocode/geo?&address=${this.data.location}&output=json&key=bf5b356d3ffaab642c974983267b1ce8`).then(res=>{
                  if(res.geocodes ==false)
                     return;
                  console.log('1');
                  let arr =res.geocodes[0].location.split(',');
                  this.lng = parseFloat(arr[0]);
                  this.lat = parseFloat(arr[1]);
            })
         },
         submit(){
            sender('/api/house/additional',this.formData).then(res=>{
               this.page++;
            })
         },
         inArray(val){
          let r =this.formData.tags.findIndex(e=> e ==val);
          return (r == -1);
         },
         addTag(val){
           this.formData.tags.push(val);
         },
         removeTag(index){
            this.formData.tags.splice(index,1);
         },
         lengthEqual(){
          console.log(this.tags.length == this.formData.tags.length);
            return this.tags.length == this.formData.tags.length;
         },
         commissioned(event){
          let checked =event.target.checked;

          if(checked){
            this.inArray('随时看房') ? this.addTag('随时看房') : '';
          }else this.removeTag('随时看房');
         }
      },
      computed:{
         nextValidator(){
            console.log('1');
            for(let item in this.formData){
               item = this.formData[item];
               console.log(item);
               if(!item || item == false)
                  return false;
            }
            return true;
         }
      }
   }
</script>

<style scoped>
   .add-data-page{
      min-width: 500px;
   }

   .add-data-page .page-1 span{
      line-height: 55px;
   }

   .am-input-group-label{
      background: #fff;
   }

   .title,
   .am-form-group label{
      word-wrap: break-word !important;
      font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif !important;
      font-size: 19px !important;
      line-height: 24px !important;
      font-weight: normal !important;
   }
   .am-form-group .am-input-group-label{
       /*width: 100% !important;*/
       padding: 11px !important;
       padding-top: undefined !important;
       padding-bottom: undefined !important;
       line-height: 24px !important;
       font-size: 19px !important;
       border: 1px solid #aaa;
   }

   .am-btn-default.next-btn{
      cursor: pointer !important;
       -webkit-transition: background 0.3s, border-color 0.3s !important;
       -moz-transition: background 0.3s, border-color 0.3s !important;
       transition: background 0.3s, border-color 0.3s !important;
       position: relative !important;
       display: inline-block !important;
       text-align: center !important;
       text-decoration: none !important;
       border-radius: 4px !important;
       width: auto !important;
       font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif !important;
       font-size: 19px !important;
       line-height: 22px !important;
       letter-spacing: undefined !important;
       padding-top: 12px !important;
       padding-bottom: 12px !important;
       color: #484848 !important;
       font-weight: 700 !important;
       border: 2px solid transparent !important;
       padding-right: 24px !important;
       padding-left: 24px !important;
       min-width: 77.66563145999496px !important;
       background: #008489 !important;
       color: #ffffff !important;
       transition:0.5s;
   }

   .am-btn-default.next-btn:hover{
      box-shadow: 0 0 1px #666;
      color:#f0f0f0;
   }


   .am-form-group textarea,
   .am-form-group input{
      outline: none;
       font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif !important;
       font-size: 19px !important;
       line-height: 24px !important;
       letter-spacing: undefined !important;
       padding-top: undefined !important;
       padding-bottom: undefined !important;
       color: #484848 !important;
       font-weight: 300 !important;
       background-color: transparent !important;
       border-color:#dbdbdb;
       padding: 11px !important;
       width: 100% !important;
       border: 1px solid #aaa;
       -webkit-border-radius: 2px;
       -moz-border-radius: 2px;
       border-radius: 2px;
       background-color: #fff;
       color: #484848;
   }

   .pre-btn{
       width: auto !important;
       font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif !important;
       font-size: 19px !important;
       line-height: 22px !important;
       letter-spacing: undefined !important;
       padding-top: 12px !important;
       padding-bottom: 12px !important;
       font-weight: 700 !important;
       border: 2px solid transparent !important;
       padding-right: 24px !important;
       padding-left: 24px !important;
       min-width: 77.66563145999496px !important;
   }

   .pre-btn:focus{
      color:#666;
      outline: none;
       border-color: none;
   }

   .am-form-group textarea:focus,
   .am-form-group input:focus{
      outline: none;
      border-color:#666;
   }

   .tag{
     position:absolute;
     right: 10px;
     top: 25%;
     user-select: none;
     font-size: 14px;
     font-weight: 400;
   }

   .all-tags-bar,
   .select-tags-bar{
    margin-top: 20px;

   }
  .select-tags-bar .am-panel-bd,
   .all-tags-bar .am-panel-bd{
     height: 65px;
   }

   .tag-item{
      border:1px solid #e0e0e0;
      padding: 0.3em 0.3em;
      font-size: 16px;
      margin-right: 15px;
      font-weight: 400;
      color:#484848;
      border-radius:5px;
      line-height: 28px;
   }
    .tag-add,
    .tag-close{
      font-size: 17px;
      font-weight: 300;
      padding: 2px;

    }
    .not-tag{
      padding: 6px;
    }

    .commissioned input{
      font-size: 20px;
      font-weight: 500;
    }

    .commissioned span{
      font-size: 16px;
      font-weight: 400;
    }
</style>
