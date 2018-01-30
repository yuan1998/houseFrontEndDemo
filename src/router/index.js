import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import SellHouse from '@/components/SellHouse'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import AddHouseData from '@/components/AddHouseData'

Vue.use(Router)

export default new Router({
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
    }
  ]
})
