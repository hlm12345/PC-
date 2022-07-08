import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import routes from './routes'
import store from '../store'
// 重写push和replace
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// location 往哪跳  reslove 成功回调  reject 失败回调
VueRouter.prototype.push = function(location,resolve,reject){
  if(resolve && reject){
    originPush.call(this, location, resolve, reject)
  }else{
    originPush.call(this,location,()=>{},()=>{})
  }
}

VueRouter.prototype.replace = function(location,resolve,reject){
  if(resolve && reject){
    originReplace.call(this, location, resolve, reject)
  }else{
    originReplace.call(this,location,()=>{},()=>{})
  }
}
const router = new VueRouter({
  // 配置路由
  routes,
  // 滚动行为
  scrollBehavior (to, from, savedPosition) {
    // 返回的这个y 代表滚动条在最上分
    return {y: 0}
  }
})

// 全局前置守卫  
router.beforeEach(async (to,from,next)=>{
  // 用户登录了才会有token  
  let token = store.state.user.token
  // 用户信息
  let name = store.state.user.userInfo.name
  if(token){
    // 登录进来
    if(to.path == '/login'){  
      next('/home')
    }else{
      if(name){
        next()
      }else{
        // 获取用户信息
        try {
          // 成功
          await store.dispatch('userInfo')
          next()
        } catch (error) {
          // token失效了
          store.dispatch('logOut')
          next('/login')
        }
        
      }
    }
  }else{
    // 未登录
    if(to.path == '/center/myorder'){
      next('/login')
    }else{
      next()
    }
    
  }

})

export default router