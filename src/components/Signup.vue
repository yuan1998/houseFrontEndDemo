<template>
   <transition name="fade" mode="out-in">
            <div id="signup-login-bar">
         <div class="am-container am-animation-fade">
            <div class="header am-text-center">
               <span>注册</span>
            </div>
            <div class="am-g signup-bar ">
               <div class="am-panel am-radius am-u-sm-11 am-u-md-5 am-u-sm-centered">
                  <div class="am-panel-bd am-g">
                     <div>
                        <form @submit.prevent="signupEvent" class="am-form">
                           <div class="am-form-group" :class="{'am-form-error':username}">
                              <div>
                                 <input @blur="usernameValidator" class="am-form-field am-radius" type="text" placeholder="用户名" v-model="signupFormData.username">
                              <small class='am-form-label' v-show="username">{{username}}</small>
                              </div>
                           </div>
                           <div class="am-form-group" :class="{'am-form-error':email}">
                              <div>
                                 <input @blur="emailValidator" class="am-form-field am-radius" type="text" placeholder="邮箱" v-model="signupFormData.email">
                                 <small class='am-form-label' v-show="email">{{email}}</small>
                              </div>
                           </div>
                           <div class="am-form-group" :class="{'am-form-error':tel}">
                              <div>
                                 <input @blur="telValidator" class="am-form-field am-radius" type="text" placeholder="手机号码" v-model="signupFormData.tel">
                                 <small class='am-form-label' v-show="tel">{{tel}}</small>
                              </div>
                           </div>
                           <div class="am-form-group"  :class="{'am-form-error':password}">
                              <div>
                                 <input @blur="passwordValidator" class="am-form-field am-radius" placeholder="密码" type="password" v-model="signupFormData.password">
                                 <small class='am-form-label' v-show="password">{{password}}</small>
                              </div>

                           </div>
                           <div class="am-form-group" :class="{'am-form-error':confirmPassword}">
                              <div>
                                 <input @blur="confirmPasswordValidator" class="am-form-field am-radius" placeholder="确认密码" type="password" v-model="signupFormData.confirmPassword">
                                 <small class='am-form-label' v-show="confirmPassword">{{confirmPassword}}</small>
                              </div>
                           </div>
                           <div class="am-form-group">
                              <router-link to="/login">
                                 已经有账号了？？去登录.
                              </router-link>
                           </div>
                           <div class="am-form-group">
                              <div class="am-u-sm-6 am-u-sm-centered">
                                 <button class="am-btn am-radius am-btn-primary am-btn-block" type="submit">注册</button>
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
import sender from '@/Sender.js'

export default {
   mounted: function() {
      console.log('now is signup page.');
   },
   data:function(){
      return {
         signupFormData:{},
         username:'',
         password:'',
         confirmPassword:'',
         email:'',
         tel:'',
         emailRegex:/^[\w\d\.\-\_]+[@][\w\d]+(\.[0-9a-zA-Z]+)+$/,
         telRegex:/^1((3|5|8){1}\d{1}|70)\d{8}$/
      }
   },
   methods:{
      signupEvent(){
         if(!this.submitValidator())
            return;

         sender('/api/user/signup',this.signupFormData).then(res=>{
            this.$router.push({path:'/login'});
         })
      },
      submitValidator(){
         this.usernameValidator();
         this.emailValidator();
         this.telValidator();
         this.passwordValidator();
         this.confirmPasswordValidator();

         let arr = [this.username,this.password,this.tel,this.email,this.confirmPassword];
         for(let item of arr){
            if(item !== false)
               return false;
         }
         return true;

      },
      usernameValidator(){
         let value = this.signupFormData.username;

         if(!value || value.length < 6)
            this.username = '用户名不能小于6位';
         else this.usernameExists(value);
      },
      emailValidator(){
         let value = this.signupFormData.email;

         if(!value || !this.emailRegex.test(value))
            this.email = '邮箱格式有误.'
         else this.emailExists();
      },
      telValidator(){
         let value = this.signupFormData.tel;

         if(!value || !this.telRegex.test(value))
            this.tel = '手机格式有误.'
         else this.telExists();
      },
      passwordValidator(){

         let value = this.signupFormData.password;

         this.password = (!value ||value.length <6) ? '密码长度最少6位' : false;
      },
      confirmPasswordValidator(){
         let value = this.signupFormData.confirmPassword;
         let cp = this.signupFormData.password;

         if(!value || value.length < 6)
            this.confirmPassword = '密码长度最少6位.';
         else if(value != cp)
            this.confirmPassword = '密码不一致.';
         else this.confirmPassword = false;
      },
      usernameExists(value){
         sender('/api/user/usernameExists',{username:value}).then(res=>{
               this.username = res.data ? '用户名已存在.':false;
         })
      },
      emailExists(value){
         sender('/api/user/emailExists',{email:value}).then(res=>{
               this.email = res.data ? '邮箱已注册.':false;
         })
      },
      telExists(value){
         sender('/api/user/telExists',{tel:value}).then(res=>{
               this.tel = res.data ? '手机已注册.':false;
         })
      },
   }
}
</script>
<style scoped>

#signup-login-bar{
   background: url('../../storage/house1.jpg');
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
.signup-bar{
   opacity:0.9;
}
.signup-bar .am-form-group:first-child{
   padding-top: 20px;
}
</style>
