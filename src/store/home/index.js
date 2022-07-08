import { reqBanner, reqCategoryList,reqFloor } from "../../api";

// vuex 模块化开发
// 存储数据的对象
const state = {
  
  categoryList: [], // 所有分类的数组
  bannerList: [], // 广告位轮播数据的数组
  floorList: [], //所有楼层数据的数组
};

// 间接操作数据
const actions = {
  // 通过api里的接口函数 ，向服务器发起请求，获取数据
  async getcategoryList({commit}){
    let result = await reqCategoryList();
    if(result.code == 200){
      commit("GETCATEGORYLIST",result.data)
    }
  },
  async getBannerList({commit}){
    let result = await reqBanner();
    if(result.code == 200){
      commit("GETBNNERLIST",result.data)
    }
  },
  async getFloorList({commit}){
    let result = await reqFloor();
    if(result.code == 200){
      commit("GETFLOORLIST",result.data)
    }
  },
}

// 直接操作数据的对象
const mutations = {
  GETCATEGORYLIST(state, categoryList){
    state.categoryList = categoryList;
  },
  GETBNNERLIST(state, bannerList){
    state.bannerList = bannerList
  },
  GETFLOORLIST(state, floorList){
    state.floorList = floorList
  }
}

// 简化数据
const getters = {

}

export default {
  actions,
  mutations,
  state,
  getters
}