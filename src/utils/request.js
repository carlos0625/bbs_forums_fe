import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const instance = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 3000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
})

// request拦截器
instance.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = getToken() // 携带token
    }
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
instance.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status !== 1) {
      Message({
        message: 'something wrong',
        type: 'error',
        duration: 5 * 1000
      })
      // 非法的token或Token过期;
      if (res.status === 401) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('LogOut').then(() => {
            location.reload() // 重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: 'something wrong',
      type: 'error',
      duration:  2000
    })
    return Promise.reject(error)
  }
)

export default instance
