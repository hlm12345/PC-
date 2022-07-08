import { reqCartList,reqDeleteCart,reqIsChecked } from "../api"

const state = {
  cartList: []
}
const actions = {
  // 获取购物车列表数据
  async getCartList({commit}){
    let result = await reqCartList();
    if(result.code == 200){
      commit('GETCARTLIST',result.data)
    }
  },
  // 删除产品
  async delCart({commit},skuId){
    let result = await reqDeleteCart(skuId)
    if(result.code == 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'));
    }
  },
  // 修改选中状态
  async getIsChecked({commit},{skuId,isChecked}){
    let result = await reqIsChecked(skuId,isChecked)
    console.log(result)
    if(result.code == 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'));
    } 
  },
  // 删除勾选的全部商品
  delAllCart({dispatch,getters}){
    // context:小仓库，
    // commit【提交mutations修改state】 getters【计算属性】 dispatch【派发action】 state【当前仓库数据】
    //获取购物车中全部的产品（是一个数组)
    let promiseAll = []
    getters.cartList.cartInfoList.forEach((item)=>{
      let promise = item.isChecked == 1? dispatch('delCart',item.skuId) : ''
      // 将每次返回的promise添加到数组种
      promiseAll.push(promise);
    })
    // 只要所有的promise都成功，则成功，有一个失败就返回失败结果
    return Promise.all(promiseAll)
  },
  // 修改全部产品的状态
  changeAllState({dispatch,state},checked){
    let promiseAll = []
    state.cartList[0].cartInfoList.forEach((item)=>{
      let promise = item.isChecked = dispatch('getIsChecked',{skuId:item.skuId,isChecked:checked})
      promiseAll.push(promise)
    })

    return Promise.all(promiseAll)
  }
}
const mutations = {
  
  GETCARTLIST(state,cartList){
    state.cartList = cartList
  }
}
const getters = {
  // 计算出购物车数据
  cartList(state){
    return state.cartList[0] || {}
  },
}


export default {
  state,
  actions,
  mutations,
  getters
}