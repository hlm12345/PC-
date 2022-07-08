import { reqProductList } from "../../api";

// 存储数据的对象
const state = {
  searchList: {}
};

// 间接操作数据
const actions = {
  // 获取search模块数据
  async getSearchList({commit},params={}){
    let result =  await reqProductList(params)
    if(result.code == 200){
      commit('GETSEARCHLIST',result.data)
    }
  }
}

// 直接操作数据的对象
const mutations = {
  GETSEARCHLIST(state,searchList){
    state.searchList = searchList
  }
}

// 简化仓库中数据 
//项目当中getters主要的作用是:简化仓库中的数据(简化数据而生)
//可以把我们将来在组件当中需要用的数据简化一下【将来组件在获取数据的时候就方便了】   
const getters = {
  // 返回属性列表
  attrsList(state){
    return state.searchList.attrsList || []
  },
  // 返回品牌列表
  trademarkList (state) {
    return state.searchList.trademarkList || []
  },
  // 商品列表
  goodsList (state) {
    return state.searchList.goodsList || []
  }
}

export default {
  actions,
  mutations,
  state,
  getters
}