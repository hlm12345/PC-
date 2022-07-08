import { reqOrderInfo, reqUserAddressList } from "../api"

const state = {
  addressList:[],
  orderInfo: {}
}
const actions = {
  async getUsrAddList({commit}){
    let result = await reqUserAddressList()
    if(result.code == 200){
      commit('GETUSERADDLIST',result.data)
    }
  },
  async getOrderInfo({commit}){
    let result = await reqOrderInfo()
    if(result.code == 200){
      commit('GETORDERINFO',result.data)
    }
  }
}
const mutations = {
  GETUSERADDLIST(state,addressList){
    state.addressList = addressList
  },
  GETORDERINFO(state,orderInfo){
    state.orderInfo = orderInfo
  }
}
const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}