<template>
   <transition>
      <div if="admin-page-home" v-if='start'>
         <div class="am-g">
            <div class="am-u-sm-3">
               <div class="side am-g">
                  <div class="user-bar" >
                     <span class="avatar center-img" :style="'background-image:url(' + getAvatar + ')' ">
                     </span>
                     <span class="am-inline-block">
                        <div>{{user.username}}</div>
                        <div>权限等级：{{user.permission}}</div>
                     </span>
                  </div>
                  <div class="menu-list">
                     <ul class="am-list admin-sidebar-list" id="collapase-nav-1">
                        <li  class="am-panel">
                          <router-link active-class="am-active" exact data-am-collapse="{parent: '#collapase-nav-1'}" to="/"><i class="am-icon-home am-margin-left-sm"></i>首页</router-link>
                        </li>
                        <li  class="am-panel">
                          <router-link active-class="am-active" exact data-am-collapse="{parent: '#collapase-nav-1'}" to="/admin"><i class="am-icon-home am-margin-left-sm"></i>管理首页</router-link>
                        </li>
                        <li class="am-panel">
                           <a data-am-collapse="{parent: '#collapase-nav-1', target: '#user-nav'}">
                             <i class="am-icon-users am-margin-left-sm"></i> 用户管理 <i class="am-icon-angle-right am-fr am-margin-right"></i>
                           </a>
                           <ul class="am-list am-collapse admin-sidebar-sub" id="user-nav">
                             <li><router-link active-class="am-active" exact to="/admin/user/add"><i class="am-icon-user am-margin-left-sm"></i> 添加用户 </router-link></li>
                             <li><router-link active-class="am-active" exact to="/admin/user/list"><i class="am-icon-user am-margin-left-sm"></i> 用户列表 </router-link></li>
                           </ul>
                        </li>
                        <li class="am-panel">
                           <a data-am-collapse="{parent: '#collapase-nav-1', target: '#company-nav'}">
                              <i class="am-icon-table am-margin-left-sm"></i> 房屋管理 <i class="am-icon-angle-right am-fr am-margin-right"></i>
                           </a>
                           <ul class="am-list am-collapse admin-sidebar-sub" id="company-nav">
                              <li>
                                 <router-link active-class="am-active" exact to="/admin/addhouse">
                                    <span class="am-icon-table am-margin-left-sm"></span>
                                     添加房屋
                                 </router-link>
                              </li>
                              <li>
                                 <router-link active-class="am-active" exact to="/admin/house/all">
                                    <span class="am-icon-table am-margin-left-sm"></span>
                                     房屋列表
                                 </router-link>
                              </li>
                              <li>
                                 <router-link active-class="am-active" exact to="/admin/house/audit">
                                    <span class="am-icon-table am-margin-left-sm"></span>
                                     审核列表
                                 </router-link>
                              </li>
                              <li>
                                 <router-link active-class="am-active" exact to="/admin/house/sell">
                                    <span class="am-icon-table am-margin-left-sm"></span>
                                     在售列表
                                  </router-link>
                              </li>
                           </ul>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
            <div class="am-u-sm-9">
               <div class="main">
                  <router-view></router-view>
               </div>
            </div>
         </div>
      </div>
   </transition>
</template>


<script>
import sender from '@/Sender.js'

   export default {
      name:'adminTemporate',
      data(){
         return {
            start:false,
         }
      },
      mounted(){
         setTimeout(res=>{
            this.judgeUser();
         },300)
      },
      methods:{
         judgeUser(){
            sender('/api/user/isAdmin').then(res=>{
               this.start = true;
            })
         }
      },
      computed:{
         user(){
            return this.$store.getters['user/user'];
         },
         getAvatar(){
            return this.user.avatar_url
                   ? this.user.avatar_url.get
                   : require('@/../storage/notAvatar.png');
         }
      },


   }
</script>

<style scoped>
   .avatar{
      width: 40px;
      height: 40px;
      border-radius:40px;
      display: inline-block;
   }
</style>
