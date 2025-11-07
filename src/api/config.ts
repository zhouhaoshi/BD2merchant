import axios from 'axios';
import { ElMessage } from 'element-plus';

// 配置项
const service = axios.create({
  baseURL: 'http://localhost:3005/',    // 接口地址
  timeout: 5000,                            // 请求超时时间
});


// 请求拦截器
service.interceptors.request.use((config) => {
  return config;
}, err => {
  return Promise.reject(err);
});


// 响应拦截器
service.interceptors.response.use((res) => {
  if(res.status === 200 && res.data.code === 200) {
    return res.data;
  } else {
    ElMessage({message: `${res.data.code} - ${res.data.message}`, type: 'error'})
  }
}, function(err) {
  return Promise.reject(err);
});

interface PromiseObj {
  code?: number
  data?: object | string,
  message?: string
}
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns { Promise }
 */
export function get(url: string, params: unknown): Promise<PromiseObj> {
  return new Promise((response, reject) => {
    service({ url, method: 'get', params }).then(res => {
      response(res)
    }).catch(err => {
      reject(err)
    });
  });
}

/**
 * 封装post方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url: string, data: unknown): Promise<PromiseObj> {
  return new Promise((response, reject) => {
    service({ url, method: 'post', data }).then(res => {
      response(res)
    }).catch(err => {
      reject(err)
    });
  });
}