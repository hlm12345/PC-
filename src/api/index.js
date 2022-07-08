import requests from "./request";
import mockAjax from './mockAjax'
// 三级联动请求接口
//   /api/product/getBaseCategoryList get  无参数
export const reqCategoryList = () => requests({ method: 'get',url: '/product/getBaseCategoryList',})

// 获取广告轮播列表
export const reqBanner = () => mockAjax.get('/banner')
// 获取floor楼层组件的数据
export const reqFloor = () => mockAjax.get('/floor')
// 获取搜索模块数据地址:/api/list请求方式:post参数:需要带参数

/*
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
//当前这个函数需不需要接受外部传递参数
//当前这个接口（获取搜索模块的数据），给服务器传递一个默认参数【至少是一个空对象】
export const reqProductList = (searchParams) => requests({
  method: 'post',
  url: '/list',
  data: {searchParams}
})

// 获取商品详情页的接口 地址：/api/item/{skuId}  get请求   参数skuId
export const reqGoodsInfo = (skuId)=> requests({
  method: 'get',
  url:`/item/${skuId}`
})

// 将产品添加到购物车中（获取更新某一个产品的数量）
// /api/cart/addToCart/{ skuId }/{skuNum } POST
export const reqAddOrUpdateShopCart = (skuId,skuNum) => requests({
  method: 'post',
  url: `/cart/addToCart/${skuId}/${skuNum}`,
})

// /api/cart/cartList  get  无参数   获取购物车列表数据的接口
export const reqCartList = () => requests({
  method: 'get',
  url:'/cart/cartList'
})

// /api/cart/deleteCart/{skuId} delete  参数skuId  删除购物车的数据
export const reqDeleteCart = (skuId) => requests({
  method: 'delete',
  url: `/cart/deleteCart/${skuId}`
})

// /api/cart/checkCart/{skuID}/{isChecked}  get 切换商品选中状态
export const reqIsChecked = (skuId,isChecked) => requests({
  method: 'get',
  url: `/cart/checkCart/${skuId}/${isChecked}`
})

// /api/user/passport/sendCode/{phone}  get 获取验证码
export const reqGetCode = (phone) => requests({
  method:'get',
  url:`/user/passport/sendCode/${phone}`
})

// 注册的接口 /api/user/passport/register post   参数phone,password,code
export const reqUserRegister = (data)=> requests({
  method:'post',
  url: '/user/passport/register',
  data
})

// 登录的接口/api/user/passport/login  post 参数phone,password
export const reqUserLogin = (data) => requests({
  method:'post',
  url:'/user/passport/login',
  data
})
// api/user/passport/auth/getUserInfo get 获取用户信息（带着token向服务器请求用户信息）
export const reqUserInfo = () => requests({
  method:'get',
  url:'/user/passport/auth/getUserInfo'
})

// 退出登录  /api/user/passport/logout get 无参数 
export const reqLogOut = () => requests({
  method:'get',
  url:'/user/passport/logout'
})

// /api/user/userAddress/auth/findUserAddressList
// 获取用户地址信息
// get
export const reqUserAddressList = () => requests({
  method:'get',
  url:'/user/userAddress/auth/findUserAddressList'
})

// /api/order/auth/trade  获取商品信息
export const reqOrderInfo = () => requests({
  method:'get',
  url:'/order/auth/trade'
})
// /api/order/auth/submitOrder?tradeNo={tradeNo}  post 提交订单接口
export const reqSubmitOrder = (tradeNo,data) => requests({
  method: 'post',
  url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
  data
})
// /api/payment/weixin/createNative/{orderId} 获取订单支付信息
export const reqPayment = (orderId) => requests({
  method:'get',
  url:`/payment/weixin/createNative/${orderId}`
})
// 查询订单支付状态 /api/payment/weixin/queryPayStatus/{orderId}  GET
export const reqQueryPayStatus = (orderId) => requests({
  method: 'GET',
  url:`/payment/weixin/queryPayStatus/${orderId}`
})
// /api/order/auth/{page}/{limit} get 获取我的订单列表
export const reqMyOrderList = (page,limit) => requests({
  method:'get',
  url:`/order/auth/${page}/${limit}`
})

