import axios from "axios";
import {Message} from "view-design";

axios.defaults.baseURL = "http://192.168.2.82:8081";

// 添加请求拦截器<==>请求发起前做的事
axios.interceptors.request.use(config => {
  config.headers = {
    "Content-Type": "application/json;charset=UTF-8"
  };
  // 在发送请求之前做某事
  return config;
}, error => {
  // 请求错误时做些事
  return Promise.resolve(error);
});

// 添加响应拦截器<==>响应回来后做的事
axios.interceptors.response.use(response => {
  // 对响应数据做些事
  if (response.status === 200 && response.data.status !== 200) {
    Message.error(response.data.msg);
  }
  return response;
}, error => {
  // 请求错误时做些事
  return Promise.resolve(error);
});

export default axios;