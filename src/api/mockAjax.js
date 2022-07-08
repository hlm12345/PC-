// 对axios二次封装
import axios from "axios";
import nprogress from "nprogress";
import 'nprogress/nprogress.css'
// start：进度条开始 done：进度条结束
// 创建axios实例对象
const requests = axios.create({
  // baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL
  baseURL: "/mock",
  // 设置请求超时时间
  timeout: 5000,
});

// 请求拦截器：在发起请求前，可以检测到，可以在请求前做一些事情
requests.interceptors.request.use(config => {
  nprogress.start();
  return config;
});

// 响应拦截器
requests.interceptors.response.use(res => {
  //请求成功对响应数据做处理
  nprogress.done();
  return res.data;
}, err => {
  return Promise.reject(err);
});

export default requests