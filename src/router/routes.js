
/*
import Home from '@/pages/Home/index'
import Search from '@/pages/Search/index'
import Login from '@/pages/Login/index'
import Register from '@/pages/Register/index'
import Detail from '@/pages/Detail/index'
import AddCartSuccess from '@/pages/AddCartSuccess/index'
import ShopCart from '@/pages/ShopCart/index'
import Trade from '@/pages/Trade/index'
import Pay from '@/pages/Pay/index'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/myOrder'
import Group from '@/pages/Center/groupOrder'
*/
// 路由配置信息
export default [
  {path: '/', redirect: '/home',},
  {path: '/home', component: ()=> import('@/pages/Home'), meta: {show: true}},
  {path: '/search/:keyword?', component: ()=> import('@/pages/Search'), meta: {show: true}, name:'search'},
  {path: '/login', component: ()=> import('@/pages/Login'), meta: {show: false}},
  {path: '/register', component: ()=> import('@/pages/Register'), meta: {show: false}},
  {
    path: '/detail/:skuId',
    component: ()=> import('@/pages/Detail'), //路由懒加载  当访问这个路由时再加载相应的组件
    meta: {show: true}
  },
  {
    name:'addCartSuccess',
    path: '/addCartSuccess',
    component: ()=> import('@/pages/AddCartSuccess'),
    meta: {show: true}
  },
  {
    path: '/shopcart',
    component: ()=> import('@/pages/ShopCart'),
    meta: {show: true}
  },
  {
    path: '/trade',
    component: ()=> import('@/pages/Trade'),
    meta: {show: true},
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if(from.path == '/shopcart'){
        next()
      }else{
        next(false)
      }
    }
  },
  {
    path: '/pay',
    component: ()=> import('@/pages/Pay'),
    meta: {show: true},
    beforeEnter: (to, from, next) => {
      if(from.path == '/trade'){
        next()
      }else{
        next(false)
      }
    }
  },
  {
    path: '/paysuccess',
    component: ()=> import('@/pages/PaySuccess'),
    meta: {show: true}
  },
  {
    path:'/center',
    component: ()=> import('@/pages/Center'),
    meta: {show: true},
    children:[
      {
        path:'/center',
        redirect:'/center/myorder'
      },
      {
        path:'myorder',
        component:()=> import('@/pages/Center/myOrder')
      },
      {
        path:'group',
        component:()=> import('@/pages/Center/groupOrder')
      }
    ]
  }
]