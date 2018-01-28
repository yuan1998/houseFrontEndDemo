<template>
   <transition name="fade" mode="out-in">
      <div id="signup-login-bar">
         <div class="am-container am-animation-fade">
            <div class="header am-text-center">
               <span>登录</span>
            </div>
            <div class="am-g login-bar ">
               <div class="am-panel am-radius am-u-sm-11 am-u-md-5 am-u-sm-centered">
                  <div class="am-panel-bd am-g">
                     <div>
                        <form class="am-form" @submit.prevent="loginEvent">
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
                           <div>
                              <input class='' id="remenber-checkbox" type="checkbox" v-model="loginFormData.remenber">
                              <label for="remenber-checkbox">
                                 <span style="font-weight: 500;font-size: 16px;-webkit-user-select: none;">
                                    记住我一万年.
                                 </span>
                              </label>
                           </div>
                           <div class="am-form-group">
                              <div class="am-u-sm-6 am-u-sm-centered">
                                 <button class="am-btn am-radius am-btn-primary am-btn-block" type="submit">登录</button>
                              </div>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </transition>
</template>

<script>
import $ from 'jquery'

export default{
   mounted:function(){
      console.log('now is login page.');
   },
   data:function(){
      return {
         loginFormData:{remenber:false},
         username:'',
      }
   },
   methods:{
      loginEvent(){
         $.post('http://localhost:1234/api/user/login',this.loginFormData).then(res=>{
            if(res.success){
               this.$store.dispatch('isLogin',{want:['username','email','tel','id','permission']});
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
</style>
