import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import router from './router'
import store from './store'

// 初始化axios并且设置超时时间
const instance = axios.create({
  timeout: 3000,
  baseURL: 'http://localhost:3000/api/',
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = window.localStorage.getItem('token')
  if (!token && !router.currentRoute.path.startsWith('/login')) {
    router.push('/login')
  } else {
    config.headers['Authorization'] = `Bearer ${token}`
    store.commit('showLoading')
  }
  return config
}, (error) => {
  store.dispatch('showToast', {
    text: '请求失败'
  })
  return Promise.reject(error)
})

instance.interceptors.response.use((response: AxiosResponse) => {
  store.commit('hideLoading')
  if (response.data.token) {
    window.localStorage.setItem('token', response.data.token)
  }
  if (response.data.code === 200) {
    return response.data.data
  } else {
    if (response.data.code === 401 && !router.currentRoute.path.startsWith('/login')) {
      router.push('/login')
    }
    return Promise.reject(response)
  }
  return Promise.reject(response)
  // // 用户请求有误，但后端能返回模版
  // if (response.data.code) {

  //   // 判断用户未授权，并且不在登陆页时跳转至登录页
  //   if (response.data.code === 401 && !router.currentRoute.path.startsWith('/login')) {
  //     router.push('/login')
  //   }
  //   return Promise.reject(response)
  //   // 用户请求成功或服务器发生错误
  // } else {
  //   // 用户请求成功
  //   if (response.data.code === 200) {
  //     return response
  //   // 服务器发生错误
  //   } else {
  //     return Promise.reject(response)
  //   }
  // }
}, (error) => {
  // 处理用户请求成功的情况
  if (typeof error.data.code === 'number') {
    store.dispatch('showToast', {
      text: error.data.message
    })
  // 处理服务器发生错误的情况
  } else if (error.status !== 200) {
    store.dispatch('showToast', {
      text: '请求失败'
    })
  }
  // 这里排除了请求取消的情况
  return Promise.reject(error)
})

export default instance
