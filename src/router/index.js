import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import SellHouse from '@/components/SellHouse'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import AddHouseData from '@/components/AddHouseData'
import page404 from '@/components/404'

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
      component:SellHouse
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/signup',
      name:'signup',
      component:Signup
    },
    {
      path:'/yezhu/addhousedata/:id',
      props:true,
      name:'AddHouseData',
      component:AddHouseData,
    },
    {
      path:'/404',
      name:'404',
      component:page404
    }
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
