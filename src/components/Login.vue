<template>
   <transition name="fade" mode="out-in">
      <div class="content">
         <navTop></navTop>
         <div id="signup-login-bar" >
            <div class="am-container am-animation-fade am-cf">
               <div class="header am-text-center">
                  <span>登录</span>
               </div>
               <div class="am-g login-bar am-cf">
                  <div class="am-panel am-radius am-u-sm-11 am-u-md-5 am-u-sm-centered">
                     <div class="am-panel-bd am-g">
                        <div>
                           <form class="am-form" @submit.prevent="loginEvent">
                              <div v-if="$route.params.status" class="am-text-center am-text-danger am-margin-bottom-sm">
                                 <span class="am-text-lg"><i class="am-icon-warning"></i>请先登录在进行操作</span>
                              </div>
                              <div class="am-form-group" :class="{'am-form-error':username}">
                                 <div>
                                    <input @blur="username=''" class="am-form-field am-radius" type="text" placeholder="用户名/邮箱/手机号码" v-model="loginFormData.username">
                                    <small class="am-form-label" v-show="username">{{username}}</small>
                                 </div>
                              </div>
                              <div class="am-form-group">
                                 <div>
                                    <input class="am-radius" placeholder="密码" type="password" v-model="loginFormData.password">
                                 </div>
                              </div>

                              <div class="am-form-group">
                                 <router-link to="/signup">
                                    没有账号啊，快去注册.
                                 </router-link>
                              </div>
                              <div class="remenber-me">
                                 <input class='' id="remenber-checkbox" type="checkbox" v-model="loginFormData.remenber">
                                 <label for="remenber-checkbox">
                                    <span >
                                       记住我一万年.
                                    </span>
                                 </label>
                              </div>
                              <div class="am-form-group">
                                 <div class="am-u-sm-6 am-u-sm-centered">
                                    <button class="login-btn am-btn am-radius am-btn-primary am-btn-block" type="submit">登录</button>
                                 </div>
                              </div>
                           </form>
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
import navTop from '@/components/NavTop2'

export default{
   components:{
      navTop:navTop,
   },
   props:['status'],
   mounted:function(){
      console.log(this.$route.params);
   },
   data:function(){
      return {
         loginFormData:{remenber:false},
         username:'',
      }
   },
   methods:{
      loginEvent(){

         sender('/api/user/login',this.loginFormData).then(res=>{
            if(res.success){
               this.$store.dispatch('isLogin');
               this.$router.push({path:'/'});
            }
         },res=>{
            this.loginFormData.password='';
            this.username = '用户名或密码有误.';
         })
      }
   }
}
</script>

<style scoped>
#signup-login-bar{
   background: url('../../storage/house2.jpg');
   position: fixed;
   top: 0;
   right: 0;
   left: 0;
   bottom: 0;
   z-index: -1;
   background-color: transparent;
   background-size: cover;
   background-position: center center;
   background-repeat: no-repeat;
   transition:background 0.8 ease-out;
}

.login-bar{
   opacity:0.9;
}
.login-bar .am-form-group:first-child{
   padding-top: 20px;
}

.login-bar .am-panel{
   border-radius:5px !important;
   box-shadow: 1px 2px 4px #616161;
}

.am-form-group input:not([type=checkbox]){
   height: 42px;
   line-height: 33px;
   font-size: 17px;
   color:#666;
   border-radius: 5px !important;
}
.remenber-me{
   padding-left: 2px;
}
.remenber-me span{
   padding-top: 2px;
   font-weight: 400 !important;
   font-size: 14px;
   line-height: 20px;
   color:#666;
}
.remenber-me input{
   font-size: 50px;
}

.login-btn{
   font-size: 16px;
   line-height: 25px;
   border-radius: 5px;
   background-color: #ff5a5f;
   border-color: #ff5a5f;
}

.content >>> #nav-top-2 .am-topbar-btn{
   color:#666;
}
.content >>> #nav-top-2 li.am-active a{
   color:#f0f0f0;
   background: rgba(102,102,102,0.5);
}
.content >>> #nav-top-2 .am-topbar-brand a,
.content >>> #nav-top-2 li:not(.am-active) a{
   color:#f0f0f0;
}
</style>
