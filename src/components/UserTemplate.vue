<template>
   <transition>
      <div id="userTemplate">
         <navtop></navtop>
         <div class="am-container">
            <div class="am-g">
               <div class="am-u-md-2">
                  <div class="am-g">
                     <div class="side-bar am-hide-sm">
                        <div class="">
                           <div class="side-bar-content">
                              <ul class="side-bar-items">
                                 <li class="side-bar-content-header ">用户</li>
                                 <router-link tag="li" to="/user/" active-class="side-active" exact class="side-bar-item"><a>个人主页</a></router-link>
                                 <router-link tag="li" to="self" active-class="side-active" exact class="side-bar-item"><a>个人资料</a></router-link>
                                 <router-link tag="li" to="commissioneds" active-class="side-active" exact class="side-bar-item"><a>我的委托</a></router-link>
                                 <router-link tag="li" to="jiaoyi" active-class="side-active" exact class="side-bar-item"><a>交易记录</a></router-link>
                                 <li  class="side-bar-content-header">消息中心</li>
                                 <router-link to="webMessage" tag="li" active-class="side-active" exact class="side-bar-item"><a>公告</a></router-link>
                                 <router-link tag="li" to="userMessage" active-class="side-active" exact class="side-bar-item"><a>私信</a></router-link>
                                 <template v-if="getUser && getUser.permission > 3">
                                    <li  class="side-bar-content-header">后台管理</li>
                                    <router-link tag="li" to="/admin/user" active-class="side-active" exact class="side-bar-item"><a>用户管理</a></router-link>
                                    <router-link tag="li" to="/admin/commissioneds" active-class="side-active" exact class="side-bar-item"><a>委托管理</a></router-link>
                                    <router-link tag="li" to="/admin/houses" active-class="side-active" exact class="side-bar-item"><a>房屋管理</a></router-link>
                                 </template>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="am-u-md-10">
                  <div class="am-g">
                     <router-view></router-view>
                  </div>
               </div>
            </div>
         </div>
         <offcanvas></offcanvas>
      </div>
   </transition>
</template>

<script>
import navtop from '@/components/NavTop3'
import offcanvas from '@/components/Offcanvas'

   export default {
      name:'userTemplate',
      components:{
         navtop,
         offcanvas
      },
      mounted(){
        this.$store.dispatch('user/getCommissioned');
      },
      computed:{
        getUser(){
          return this.$store.getters['user/user'];
        },
      }
   }
</script>
<style scoped>
.am-container{
  margin-top: 60px;
}
   .side-bar-content-header{
      font-size: 16px;
      padding-top: 0.4rem;
      padding-left: 1.25rem;
      padding-bottom: 0.4rem;
   }
   .side-bar-items{
      padding-left: 0;
    list-style: none;
   }
   .side-bar-item a{
      font-size: 14px;
    display: inline-block;
    width: 100%;
    color: #666;
    padding: 0.3rem 0;

}
.side-active a,
.side-bar-item a:hover{
   color: #0350ff;
}

.side-active,
.side-bar-item:hover{
   color: #5085FF;
    border-right: 2px solid #5085FF;
    background: #dce7ff;
    cursor: pointer;
}
.side-bar-item{
   display: inline-block;
    width: 100%;
    padding-left: 2.5rem;
}
.side-bar-content{
   border-right: 1px solid rgba(0,0,0,0.1);
   height: 100%;
}

</style>
