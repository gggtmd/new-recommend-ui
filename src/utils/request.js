import axios from "axios";
import { ElMessage } from "element-plus";
import { useTokenStore } from "@/stores/token";
import router from "@/router/index.js"; //request.js文件在Vue实例之前执行,无法获取vue-router

const request = axios.create({
  baseURL: '/api',  //表示http://localhost:8080/api/user/login
  timeout: 60000
})
const tokenStore = useTokenStore();

//请求拦截器，请求头加入token
request.interceptors.request.use(
  config => {
    if (tokenStore.token) {
      config.headers.Authorization = tokenStore.token;
    }
    return config;
  },
  err => {
    return Promise.reject(err)
  }
)

//响应拦截器
request.interceptors.response.use(
  res => {
    // if (res.data.code === 200) {
      return res.data;
    // }
    // ElMessage.error(res.data.msg ? res.data.msg : "操作失败");
    Promise.reject(res.data);
  },
  err => {
    if (err.response.status === 401) {
      ElMessage.error('请先登录');
      router.push('/login');
    } else {
      ElMessage.error("服务异常");
    }
    return Promise.reject(err);
  }
)

export default request