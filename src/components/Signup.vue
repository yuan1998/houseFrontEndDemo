<template>
   <transition name="fade" mode="out-in">
      <div class="content">
         <navTop></navTop>
         <div id="signup-login-bar">
            <div class="am-container am-animation-fade container">
               <div class="header am-text-center">
                  <span>注册</span>
               </div>
               <div class="am-g signup-bar ">
                  <div class="am-panel am-radius am-u-sm-9 am-u-md-7 am-u-lg-5 am-u-sm-centered">
                     <div class="am-panel-bd am-g">
                        <div>
                           <form @submit.prevent="signupEvent" class="am-form">
                              <div class="am-form-group am-form-icon am-form-feedback"
                                 :class="{
                                    'am-form-error':username && username !== 'a',
                                    'am-form-success':username === 'a'
                                 }">
                                 <div>
                                    <div>
                                       <input
                                          @keyup="username ? usernameValidator() : ''"
                                          @blur="usernameValidator" class="am-form-field am-radius" type="text" placeholder="用户名:最少6位，不能包含特殊字符" v-model="signupFormData.username">
                                       <i v-show='username'
                                          :class="{
                                             'am-icon-check':username === 'a',
                                             'am-icon-times':username && username !== 'a'
                                          }">
                                       </i>
                                    </div>
                                    <small class='am-form-label'>
                                       <span v-if="username && username != 'a'">
                                          {{username}}
                                       </span>
                                    </small>
                                 </div>
                              </div>
                              <div class="am-form-group am-form-icon am-form-feedback"
                                 :class="{
                                    'am-form-error':email && email !== 'a',
                                    'am-form-success':email === 'a'
                                 }">
                                 <div>
                                    <div>
                                       <input
                                          @keyup="email ? emailValidator() : ''"
                                          @blur="emailValidator" class="am-form-field am-radius" type="text" placeholder="邮箱" v-model="signupFormData.email">
                                       <i v-show='email'
                                          :class="{
                                             'am-icon-check':email === 'a',
                                             'am-icon-times':email && email !== 'a'
                                          }">
                                       </i>
                                    </div>
                                    <small class='am-form-label'>
                                       <span v-if="email && email != 'a'">
                                          {{email}}
                                       </span>
                                    </small>
                                 </div>
                              </div>
                              <div class="am-form-group am-form-icon am-form-feedback"
                                 :class="{
                                    'am-form-error':tel && tel !== 'a',
                                    'am-form-success':tel === 'a'
                                 }">
                                 <div>
                                    <div>
                                       <input
                                          @keyup="tel ? telValidator() : ''"
                                          @blur="telValidator" class="am-form-field am-radius" type="text" placeholder="手机号码" v-model="signupFormData.tel">
                                       <i v-show='tel'
                                          :class="{
                                             'am-icon-check':tel === 'a',
                                             'am-icon-times':tel && tel !== 'a'
                                          }">
                                       </i>
                                    </div>
                                    <small class='am-form-label'>
                                       <span v-if="tel && tel != 'a'">
                                          {{tel}}
                                       </span>
                                    </small>
                                 </div>
                              </div>
                              <div class="am-form-group am-form-icon am-form-feedback"
                                 :class="{
                                    'am-form-error':password && password !== 'a',
                                    'am-form-success':password === 'a'
                                 }">
                                 <div>

                                    <div>
                                       <input
                                          @keyup="password ? passwordValidator() : ''"
                                          @blur="passwordValidator" class="am-form-field am-radius" placeholder="密码" type="password" v-model="signupFormData.password">
                                       <i v-show='password'
                                          :class="{
                                             'am-icon-check':password === 'a',
                                             'am-icon-times':password && password !== 'a'
                                          }">
                                       </i>
                                    </div>
                                    <small class='am-form-label'>
                                       <span v-if="password && password != 'a'">
                                          {{password}}
                                       </span>
                                    </small>
                                 </div>

                              </div>
                              <div class="am-form-group am-form-icon am-form-feedback"
                                 :class="{
                                    'am-form-error':confirmPassword && confirmPassword !== 'a',
                                    'am-form-success':confirmPassword === 'a'
                                 }">
                                 <div>
                                    <div>
                                       <input
                                          @keyup="confirmPassword ? confirmPasswordValidator() : ''"
                                          @blur="confirmPasswordValidator" class="am-form-field am-radius" placeholder="确认密码" type="password" v-model="signupFormData.confirmPassword">
                                       <i v-show='confirmPassword'
                                          :class="{
                                             'am-icon-check':confirmPassword === 'a',
                                             'am-icon-times':confirmPassword && confirmPassword !== 'a'
                                          }">
                                       </i>
                                    </div>

                                    <small class='am-form-label'>
                                       <span v-if="confirmPassword && confirmPassword != 'a'">
                                          {{confirmPassword}}
                                       </span>
                                    </small>
                                 </div>
                              </div>
                              <div class="am-form-group">
                                 <router-link to="/login">
                                    已经有账号了？？去登录.
                                 </router-link>
                              </div>
                              <div class="am-form-group">
                                 <div class="am-u-sm-6 am-u-sm-centered">
                                    <button class="signup-btn am-btn am-radius am-btn-primary am-btn-block" type="submit">注册</button>
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


export default {
   components:{
      navTop:navTop,
   },
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
         emailRegex:
            /^[a-z0-9]+([\.\_\-\\]*[a-z0-9])*@([a-z0-9]+[\-a-z0-9]+\.){1,63}[a-z0-9]+$/,
         telRegex:
            /^1(3[0-9]|4[579]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/,
         usernameTimeout:false,
         emailTimeout:false,
         telTimeout:false,
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
            if(item !== 'a')
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

         this.password = (!value ||value.length <6) ? '密码长度最少6位' : 'a';
      },
      confirmPasswordValidator(){
         let value = this.signupFormData.confirmPassword;
         let cp = this.signupFormData.password;

         if(!value || value.length < 6)
            this.confirmPassword = '密码长度最少6位.';
         else if(value != cp)
            this.confirmPassword = '密码不一致.';
         else this.confirmPassword = 'a';
      },
      usernameExists(value){

         clearTimeout(this.usernameTimeout);

         this.usernameTimeout = setTimeout(res=>{

            sender('/api/user/usernameExists',{username:value}).then(res=>{
               this.username = res.data ? '用户名已存在.':'a';
            })
         },300);

      },
      emailExists(value){
         clearTimeout(this.emailTimeout);

         this.emailTimeout = setTimeout(res=>{
            sender('/api/user/emailExists',{email:value}).then(res=>{
               this.email = res.data ? '邮箱已注册.':'a';
            })
         },300);

      },
      telExists(value){
         clearTimeout(this.telTimeout);

         this.telTimeout = setTimeout(res=>{
            sender('/api/user/telExists',{tel:value}).then(res=>{
               this.tel = res.data ? '手机已注册.':'a';
            })
         },300);
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
   opacity:0.95;
}

.signup-bar .am-form-group:first-child{
   padding-top: 20px;
}

.signup-bar .am-panel{
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

.am-form-group{
   margin-bottom: 10px !important;
}
.am-form-group small{
   display: inline-block;
   height: 15px !important;
}

.signup-btn{
   font-size: 16px;
   line-height: 25px;
   border-radius: 5px;
   background-color:#d4159b !important;

   border-color:#d4159b !important;
}


.content >>> #nav-top-2 .am-topbar-brand a,
.content >>> #nav-top-2 li:not(.am-active) a{
   color: #f0f0f0;
}

.content >>> #nav-top-2 li.am-active a:after{
   border-bottom-color: #ffffff;
}
.content >>> #nav-top-2 li.am-active a{
   color:#fff;
   background: rgba(14,144,210,0.5);
}

.content >>> #nav-top-2 .am-topbar-btn{
   color:#87d2eb;
}
</style>
