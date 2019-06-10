import axios from 'axios'
import store from '@/store'
import router from '@/router'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:3001/v1/',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false
})

instance.interceptors.request.use(requestFilter, errorHandler)
instance.interceptors.response.use(responseFilter, errorHandler)

// function toQueryString (obj) {
//   return obj ? Object.keys(obj).sort().map(function (key) {
//     var val = obj[key]
//     if (Array.isArray(val)) {
//       return val.sort().map(function (val2) {
//         return key + '=' + val2
//       }).join('&')
//     }
//     if (val === '' || val === undefined) {
//       return
//     }
//     return key + '=' + val
//   }).join('&') : ''
// }

function responseFilter (response) {
  store.commit('hideLoading')
  if (response.data.error) {
    return Promise.reject(response.data)
  } else if (response.data.token) {
    const ls = window.localStorage
    ls.setItem('token', response.data.token)
    console.log('set token:', response.data.token)
  }
  return response.data
}

function requestFilter (request) {
  store.commit('showLoading')
  if (request.method === 'get') {
    request.params = request.data
  }
  const ls = window.localStorage
  if (ls.getItem('token')) {
    // console.log(request)
    request.headers.Authorization = `Bearer ${ls.getItem('token')}`
  }
  return request
}

function errorHandler (error) {
  store.commit('hideLoading')
  if (error.response && error.response.status === 401) {
    const ls = window.localStorage
    ls.setItem('token', '')
    router.replace({
      path: 'login',
      query: { redirect: router.currentRoute.fullPath }
    })
  }
  return Promise.reject(error)
}

const request = (method, url, data = {}) => {
  return instance.request({method, url, data}).then(data => ({ data: data.data })).catch(err => ({ err: err.data }))
}

export default request
