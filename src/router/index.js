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
            meta:{
                title:'首页 - xxx'
            },
            component:HelloWorld
        },
        {
            path: '/',
            name: 'home',
            meta:{
                title:'首页 - xxx'
            },
            component: Home
        },
        {
            path:'/yezhu/maifang',
            name:'maifang',
            meta:{
                title:'发布房源 - xxx'
            },
            component:AddHouseData,
        },
        {
            path:'/login',
            name:'login',
            meta:{
                title:'登录 - xxx'
            },
            component:Login,
        },
        {
            path:'/login/:status',
            props:true,
            name:'pleaseLogin',
            meta:{
                title:'登录 - xxx'
            },
            component:Login,
        },
        {
            path:'/signup',
            name:'signup',
            meta:{
                title:'注册 - xxx'
            },
            component:Signup
        },
        {
            path:'/yezhu/addData/:id',
            props:true,
            name:'addHouseData',
            meta:{
                title:'补充资料 - xxx'
            },
            component:HouseAddData,
        },
        {
            path:'/404',
            name:'404',
            meta:{
                title:''
            },
            component:page404
        },
        {
            path:'/user',
            component:userTemplate,
            children:[
                {
                    path:'',
                    name:'userHome',
                    meta:{
                        title:'个人主页 - xxx'
                    },
                    name:'user',
                    meta:{
                        title:''
                    },
                    component:userHome
                },
                {
                    path:'self',
                    name:'selfInfo',
                    meta:{
                        title:'编辑个人资料 - xxx'
                    },
                    component:selfInfo
                },
                {
                    path:'commissioneds',
                    name:'UserCommissioneds',
                    meta:{
                        title:'我的房源 - xxx'
                    },
                    component:userCommissioned
                },
                {
                    path:'transactionLog',
                    name:'UserTransactionLog',
                    meta:{
                        title:'交易记录 - xxx'
                    },
                    component:transactionLog
                },
                {
                    path:'message/system',
                    name:'SystemMessage',
                    meta:{
                        title:'系统通知 - xxx'
                    },
                    component:SystemMessage
                },
                {
                    path:'message/user',
                    name:'UserMessage',
                    meta:{
                        title:'私信 - xxx'
                    },
                    component:UserMessage
                }
            ]
        },
        {
            path:'/house/:id',
            name:'houseInfo',
            meta:{
                title:'看房 - xxx'
            },
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
                        meta:{
                            title:'后台管理 - xxx'
                        },
                        component:adminHome,
                    },
                    {
                        path:'user/list',
                        name:'adminUserList',
                        meta:{
                            title:'用户列表 - xxx'
                        },
                        component:adminUserList,adminUserInfo
                    },
                    {
                        path:'user/info/:id',
                        props:true,
                        name:'adminUserInfo',
                        meta:{
                            title:'用户资料 - xxx'
                        },
                        component:adminUserInfo
                    },
                    {
                        path:'user/add',
                        name:'adminUserAdd',
                        meta:{
                            title:'添加用户 - xxx'
                        },
                        component:adminUserAdd
                    },
                    {
                        path:'house/:status',
                        props:true,
                        name:'adminHouse',
                        meta:{
                            title:'房屋列表 - xxx'
                        },
                        component:adminHouseList,
                    },
                    {
                        path:'addhouse',
                        name:'adminAddHouse',
                        meta:{
                            title:'添加房屋 - xxx'
                        },
                        component:adminHouseAdd,
                    },
                    {
                        path:'house/info/:id',
                        props:true,
                        name:'adminHouseInfo',
                        meta:{
                            title:'房屋信息 - xxx'
                        },
                        component:adminHouseInfo
                    },
                ]
        },
        {
            path:'/search',
            name:'searchResult',
            meta:{
                title:'搜索结果 - xxx'
            },
            component:searchPage,
            props:true
        },
        {
            path:'*',
            name:'errorPage',
            meta:{
                title:'404 - xxx'
            },
            component:page404,
        }
    ]
})

router.afterEach((to, from) => {
    let {dispatch} = router.app.$store;

    dispatch('progress','done');

})

router.beforeEach(async (to, from, next) => {
    let {dispatch,getters} = router.app.$store;


    if(from.name && from.name != false)
        dispatch('progress','start');

    document.body.classList.remove('help-open','reservation-open','sm-map-open','menu-open','search-open','slider-open');
    document.documentElement.classList.remove('help-open','reservation-open','sm-map-open','menu-open','search-open','slider-open');
    let name = to.name;
    if(!name)
        next();

    if(!getters['isLoginStatus']){
        await dispatch('isLogin');
    }

    router.app.$setDocumentTitle(to.meta.title);

    let user = getters['user/user'];// 获取用户

    let result = ['home','houseInfo','errorPage','searchResult','login','signup','pleaseLogin','404'].includes(name);
    let LS = ['login','signup','pleaseLogin'].includes(name);

    if(user && LS)
        return next('/');
    else if(!user && !result)
        return next('/login/aa');
    else next();



    // let path = to.path;
    // if(!$v.user && !(path == '/' || path == '/login' || path  == '/signup' || path =='/pleaseLogin' || path=='/readHouses')){
    //       return next('/pleaseLogin');
    // }
    // return next();
})

export default router
