// utils/axios.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, type AxiosError } from 'axios';
// import { useSettingStore } from '@/store/user';
// import { Toast } from 'react-vant';
import { message } from "antd";

// 创建新的axios实例
const service = axios.create({
  baseURL: '//localhost:9000/api/web',
  timeout: 5000,
});

// 添加一个请求拦截器
service.interceptors.request.use(
  (config) => {
    // const token = useSettingStore.getState().token;
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    config.headers['Content-Type'] = 'application/json';
		config.headers['x-token'] = '123456';



    // message.loading({
    //   content: 'Loading...',
    //   duration: 0, // 一直存在
    // });
    return config;
  },
  (error: AxiosError) => {
    message.destroy;
    message.error({
      content: '请求错误，请稍后再试',
      duration: 5,
    });
    return Promise.reject(error);
  }
);

// 添加一个响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status, data } = response;
    if (status === 200) {
      if (data.code === 0) {
        // 接口请求结果正确
        return data;
      } else {
        return Promise.reject(data);
      }
    }
  },
  (error: AxiosError) => {
    const { response } = error;
    message.destroy();
    if (JSON.stringify(error).includes('Network Error')) {
      message.error({
        content: '网络超时',
        duration: 5,
      });
    }
    return Promise.reject(error);
  }
);

export default service;
