import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import AddHouseData from '@/components/AddHouseData'
import HouseAddData from '@/components/HouseAddData'
import page404 from '@/components/404'
import userTemplate from '@/components/UserTemplate'
import userHome from '@/components/UserHome'
import selfInfo from '@/components/UserSelfInfo'
import userCommissioned from '@/components/UserCommissioneds'
import transactionLog from '@/components/UserTransactionLog'
import SystemMessage from '@/components/SystemMessage'
import UserMessage from '@/components/UserMessage'

/**
 *   Houses
 */
import SellHouse from '@/components/SellHouse'
import houseInfo from '@/components/house/info'

/**
 *   admin
 *
 */

import adminTemplate from '@/components/Admin/AdminTemplate'
import adminHome from '@/components/Admin/adminHome'
import adminUserList from '@/components/Admin/UserList'
import adminUserInfo from '@/components/Admin/Admin-User-Info'
import adminUserAdd from '@/components/Admin/Admin-user-add'
import adminHouseList from '@/components/Admin/admin-house-list'
import adminHouseInfo from '@/components/Admin/admin-house-info'
import adminHouseAdd from '@/components/Admin/admin-house-add'


/**
 *  search page
 */
import searchPage from '@/components/search/search-page'


Vue.use(Router)

const router = new Router({
  routes: [
   {
      path:'/test',
      name:'test',
      component:HelloWorld
   },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path:'/yezhu/maifang',
      name:'maifang',
      component:AddHouseData,
    },
    {
      path:'/login',
      name:'login',
      component:Login,
    },
    {
      path:'/login/:status',
      props:true,
      name:'pleaseLogin',
      component:Login,
      },
    {
      path:'/signup',
      name:'signup',
      component:Signup
    },
    {
      path:'/yezhu/addData/:id',
      props:true,
      name:'AddHouseData',
      component:HouseAddData,
    },
    {
      path:'/404',
      name:'404',
      component:page404
    },
    {
      path:'/user',
      component:userTemplate,
      children:[
         {
            path:'',
            name:'userHome',
            name:'user',
            component:userHome
         },
         {
            path:'self',
            name:'selfInfo',
            component:selfInfo
         },
         {
            path:'commissioneds',
            name:'UserCommissioneds',
            component:userCommissioned
         },
         {
            path:'transactionLog',
            name:'UserTransactionLog',
            component:transactionLog
         },
         {
            path:'message/system',
            name:'SystemMessage',
            component:SystemMessage
         },
         {
            path:'message/user',
            name:'UserMessage',
            component:UserMessage
         }
      ]
    },
    {
      path:'/house/:id',
      component:houseInfo,
      props:true
    },
    {
      path:'/admin',
      component:adminTemplate,
      children:[
         {
            path:'',
            name:'adminHome',
            component:adminHome,
         },
         {
            path:'user/list',
            name:'adminUserList',
            component:adminUserList,adminUserInfo
         },
         {
            path:'user/info/:id',
            props:true,
            name:'adminUserInfo',
            component:adminUserInfo
         },
         {
            path:'user/add',
            name:'adminUserAdd',
            component:adminUserAdd
         },
         {
            path:'house/:status',
            props:true,
            name:'adminHouse',
            component:adminHouseList,
         },
         {
            path:'addhouse',
            name:'adminAddHouse',
            component:adminHouseAdd,
         },
         {
            path:'house/info/:id',
            props:true,
            name:'adminHouseInfo',
            component:adminHouseInfo
         },
      ]
    },
    {
      path:'/search',
      component:searchPage,
      props:true
    },
  ]
})
router.afterEach((to, from) => {

   router.app.$store.dispatch('progress','done');

})
router.beforeEach((to, from, next) => {
   router.app.$store.dispatch('progress','start');

   // let path = to.path;
   // if(!$v.user && !(path == '/' || path == '/login' || path  == '/signup' || path =='/pleaseLogin' || path=='/readHouses')){
   //       return next('/pleaseLogin');
   // }
   return next();
})

export default router
