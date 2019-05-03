import axios, { AxiosRequestConfig, AxiosResponse, AxiosStatic } from 'axios'
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

interface Response {
  code: number
  message: string
  data: ResponseData
  token?: string
}

interface ResponseData {
  data: any
}

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
    store.dispatch('showToast', {
      text: response.data.message
    })
    return undefined
  }
}, (error: AxiosResponse) => {
  if (error.status !== 200) {
    store.dispatch('showToast', {
      text: '请求失败'
    })
  }
  // 这里排除了请求取消的情况
  return Promise.reject(error)
})

export default instance
