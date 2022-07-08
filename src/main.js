import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'
// 注册全局组件 三级联动
import TypeNav from '@/pages/Home/TypeNav'
// 注册全局组件 分页
import Pagination from '@/components/Pagination'
// 引入mock模拟数据
import '@/mock/mockServe'
import 'swiper/css/swiper.css'
import * as API from '@/api'
import { MessageBox,Button } from 'element-ui'
Vue.use(Button)
// 第一个参数：全局组件的名字，第二个参数：哪个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)
// 挂载在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  store
}).$mount('#app')
