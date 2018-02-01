<template>
    <transition>
         <div>
            <div class="head">
               <nav-top></nav-top>
            </div>
            <div class="content">
               <div c id="sell-house-bg">
                  <div class="am-container am-text-center">
                     <div class="am-g top">
                        <div class="title">
                           <div class="">发布出售房源</div>
                        </div>
                        <div class="subtitle">
                           <h3 class='am-link-muted'>大数据专业估价·每天超过30000次估价请求量</h3>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="main">
                  <div class="am-container">
                     <div class="am-g">
                        <div class="am-u-lg-8 am-u-sm-12 am-form">
                           <form v-on:submit.prevent="add" class="am-sm-text-center am-g-collapse" id="sell-house-form">
                              <div class="am-hide-sm">
                                 <dl class='am-g am-padding-vertical am-text-center'>
                                    <dt class="am-u-md-3 am-text-middle">城市位置</dt>
                                    <dd class="am-u-md-9 am-text-middle">
                                       <input class="input-border-hide am-form-field am-u-lg-12" placeholder="请输入城市位置" type="text" v-model="getCity">
                                    </dd>
                                 </dl>

                                 <dl class='am-g am-padding-vertical am-text-center'>
                                    <dt class="am-u-md-3 am-text-middle">小区</dt>
                                    <dd class="am-u-md-9 am-text-middle">
                                       <input class="input-border-hide am-form-field am-u-lg-12" placeholder="请输入小区的名称，方便我们审核" type="text" v-model="row.community">
                                    </dd>
                                 </dl>

                                 <dl class='am-g am-padding-vertical am-text-center' >
                                    <dt class="am-text-middle am-u-md-3">房屋地址</dt>
                                    <dd class="am-u-md-9 am-text-middle">
                                       <div class="am-u-md-3">
                                          <input placeholder="楼栋号" class="am-form-field am-u-sm-6 am-text-right" type="text" v-model="row.building_number">
                                       </div>
                                       <div class="am-u-md-3 am-u-md-offset-1">
                                          <input placeholder="单元号" class="am-form-field am-u-sm-6 am-text-right"  type="text" v-model="row.unit_number">
                                       </div>
                                       <div class="am-u-md-3 am-u-md-offset-1 am-u-end">
                                          <input placeholder="门牌号" class="am-form-field am-u-sm-6 am-text-right" type="text" v-model="row.house_number">
                                       </div>
                                    </dd>
                                 </dl>

                                 <dl class='am-g am-padding-vertical am-text-center'>
                                    <dt class="am-u-md-3 am-text-middle">期望售价</dt>
                                    <dd class="am-u-md-9 am-text-middle">
                                       <div class="am-u-md-4">
                                          <input class="am-form-field am-u-sm-12 am-text-right" placeholder="请输入你期望的价格" type="text" v-model="row.expect_price">
                                       </div>
                                       <div class="am-u-md-2">
                                          <span class="am-text-">万元</span>
                                       </div>
                                       <div class="am-u-md-6">
                                          <a href="">不太清楚如何定价? 先估个价</a>
                                       </div>
                                    </dd>
                                 </dl>

                                 <dl class='am-g am-padding-vertical am-text-center'>
                                    <dt class="am-u-md-3 am-text-middle">称呼</dt>
                                    <dd class="am-u-md-9 am-text-middle">
                                       <input class="am-form-field am-u-sm-12" placeholder="我们应该如何称呼您" type="text" v-model="row.contact">
                                    </dd>
                                 </dl>

                                 <dl class='am-g am-padding-vertical am-text-center'>
                                    <dt class="am-u-md-3 am-text-middle">手机号码</dt>
                                    <dd class="am-u-md-9 am-text-middle">
                                       <input class="am-form-field am-u-sm-12" placeholder="您的联系方式，方便我们联系您" type="text" v-model="row.tel">
                                    </dd>
                                 </dl>
                              </div>
                              <div class="am-show-sm">
                                 <div class="am-form-group">
                                    <label class="">所在城市</label>
                                    <input type="text" class="am-form-field" placeholder="请输入城市位置" v-model="getCity">
                                 </div>
                                 <div class="am-form-group">
                                    <label class="">小区</label>
                                    <input type="text" class="am-form-field" placeholder="请输入小区的名称，方便我们审核" v-model="row.community">
                                 </div>
                                 <div class="am-form-group">
                                    <label class="">楼栋号</label>
                                    <input placeholder="楼栋号" class="am-form-field" type="text" v-model="row.building_number">
                                 </div>
                                 <div class="am-form-group">
                                    <label class="">单元号</label>
                                    <input placeholder="单元号" class="am-form-field" type="text" v-model="row.unit_number">
                                 </div>
                                 <div class="am-form-group">
                                    <label class="">门牌号</label>
                                    <input placeholder="门牌号" class="am-form-field" type="text" v-model="row.house_number">
                                 </div>
                                 <div class="am-form-group">
                                    <label class="">期望价格</label>
                                    <input class="am-form-field" placeholder="请输入你期望的价格" type="text" v-model="row.expect_price">
                                    <a href="">不太清楚如何定价? 先估个价</a>
                                 </div>
                                 <div class="am-form-group">
                                    <label class="">称呼</label>
                                       <input class="am-form-field" placeholder="我们应该如何称呼您" type="text" v-model="row.contact">
                                 </div>
                                 <div class="am-form-group">
                                    <label class="">手机号码</label>
                                       <input class="am-form-field" placeholder="您的联系方式，方便我们联系您" type="text" v-model="row.tel">
                                 </div>
                              </div>
                              <div class="am-text-center am-lg-text-right am-margin-vertical-lg">
                                 <button type="submit" class="am-btn am-btn-lg am-btn-success am-btn-hollow btn-loading-example am-radius" data-am-loading="{spinner: 'circle-o-notch', loadingText: '提交中',resetText: '提交完成'}">提交委托</button>
                              </div>
                           </form>
                        </div>
                        <div class="sibeBar am-u-lg-4 am-u-sm-12 ">
                           <div class="am-show-lg" style="margin-top: 120px;">
                           </div>
                           <div class="am-panel am-panel-default am-radius">
                              <div class="am-panel-bd">
                                 <div>
                                    <span style="font-weight: 600;font-size:25px;">{{getCity}}房价</span>
                                    <div class="am-fr" style="color:red;font-weight: 600;font-size:18px;margin-top: 8px;">998万/平方</div>
                                 </div>
                                 <blockquote class="">
                                    <p>有人住的房子才是好房子</p>
                                    <small>鲁迅 ----《房》</small>
                                 </blockquote>
                              </div>
                           </div>

                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
    </transition>
</template>

<script>
import sender from '@/Sender.js'
import navTop from '@/components/NavTop'



export default ({
   components:{
      navTop:navTop,
   },
   methods:
   {
      add(event)
      {
         let $btn = $(event.target).find('[type=submit]');
         $btn.button('loading');
         this.$store.dispatch('progress','start');
         // response
         sender('/api/commissioned/create',this.row).then(res=>{
            this.$store.dispatch('progress','done');
            $btn.button('reset');
            this.$store.dispatch('_alert',{'title':'添加成功～','content':'请耐心等待审核'});
            this.row = {};
         },r=>{
            console.log(r);
         })
      },
   },
   mounted:function()
   {

   },
   computed:{
      getCity(){
         this.row.city = this.$store.getters['getIpCity'];
         return this.row.city;
      }
   },
   data:function()
   {
      return {
         row:{city:''},// city:undefine
      }
   }
})
</script>

<style>
#sell-house-bg{
   background: url('../../storage/nigth_house.png');
   background-color: transparent;
   background-size: cover;
   background-position: center center;
   background-repeat: no-repeat;
   height: 180px;
}
.top{
   margin-top: 70px!important;
}
.top .title{
   font-weight: 500;
   color: #fff;
   font-size: 35px;
}
.top .subtitle h3{
   color:#eee;
}
.main{
   margin-top: 30px;
}

#sell-house-form .am-hide-sm input{
   border:none;
   box-shadow: none;
}
#sell-house-form dl dt {
   margin-top: 12px;
}
#sell-house-form dl{
   border-bottom: 1px solid rgba(0,0,0,0.1)
}
#sell-house-form dl dd input{
   font-size: 14px;
}
#sell-house-form dl dd .am-u-md-3 input{
   background: #eee;
}
</style>
