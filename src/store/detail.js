import { reqGoodsInfo,reqAddOrUpdateShopCart } from "../api"
import {getUUID} from '@/utils/uuid_token'
const state = {
  goodInfo: {},
  // 游客临时身份
  uuid_token: getUUID()
}

const actions = {
  // 获取产品信息的action 
  async getGoodInfo({commit},skuId){
    const result = await reqGoodsInfo(skuId)
    if(result.code == 200){
      commit('GETGOODINFO',result.data)
    }
  },

  // 将产品添加到购物车中 
  async addOrUpdateShopCart({commit},{skuId,skuNum}){
    const result = await reqAddOrUpdateShopCart(skuId,skuNum)
    if(result.code == 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  }
}

const mutations = {
  GETGOODINFO(state,goodInfo){
    state.goodInfo = goodInfo
  }
}

const getters = {
  categoryView(state){
    return state.goodInfo.categoryView || {}
  },
  skuInfo(state){
    return state.goodInfo.skuInfo || {}
  },
  spuSaleAttrList(state){
    return state.goodInfo.spuSaleAttrList || []
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}