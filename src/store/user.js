import { reqGetCode,reqLogOut,reqUserInfo,reqUserLogin,reqUserRegister } from "../api"

// 登录与注册的模块
const state = {
  code: '',
  token:localStorage.getItem('TOKEN'),
  userInfo:{}
}
const actions = {
  // 获取验证码
  async getCode({commit},phone){
    let result = await reqGetCode(phone)
    console.log(result)
    if(result.code == 200){
      commit('GETCODE',result.data)
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 用户注册
  async userRegister({commit},user){
    let result = await reqUserRegister(user)
    console.log(result)
    if(result.code == 200){
      return 'ok'
    }else{
      return Promise.reject(new Error(result.message))
    }
  },
  // 用户登录
  async userLogin({commit},user){
    // 服务器下发token 是用户唯一标识符 
    // //将来经常通过带token找服务器要用户信息进行展示
    let result = await reqUserLogin(user)
    console.log(result);
    if(result.code == 200){
      commit('USERLOGIN',result.data)
      // 持久化存储
      localStorage.setItem('TOKEN',result.data.token)
      return 'ok'
    }else{
      return Promise.reject(new Error(result.message))
    }
  },
  // 获取用户信息
  async userInfo({commit}){
    let result = await reqUserInfo()
    if(result.code == 200){
      commit('USERINFO',result.data)
      return 'ok'
    }else{
      return Promise.reject(new Error(result.message))
    }
  },
  // 退出登录
  async logOut({commit}){
    let result = await reqLogOut()
    console.log(result);
    if(result.code == 200){
      commit('CLEAR')
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  }
}
const mutations = {
  GETCODE(state,code){
    state.code = code
  },
  USERLOGIN(state,data){
    state.token = data.token
  },
  USERINFO(start,userInfo){
    start.userInfo = userInfo
  },
  CLEAR(state){
    //1:需要发请求,通知服务器退出登录【清除一些数据:token】
    //2:清除项目当中的数据【userInfo、 token】
    state.token = '';
    state.userInfo = {},
    localStorage.removeItem('TOKEN')
  }
}
const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}