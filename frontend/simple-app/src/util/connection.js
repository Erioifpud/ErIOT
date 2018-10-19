import axios from 'axios'
import store from '@/store'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:3000/v1/',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false
})

instance.interceptors.response.use(responseFilter, errorHandler)

function toQueryString (obj) {
  return obj ? Object.keys(obj).sort().map(function (key) {
    var val = obj[key]
    if (Array.isArray(val)) {
      return val.sort().map(function (val2) {
        return key + '=' + val2
      }).join('&')
    }

    if (val === '' || val === undefined) {
      return
    }

    return key + '=' + val
  }).join('&') : ''
}

function responseFilter (response) {
  store.commit('hideLoading')
  if (response.data.error) {
    return Promise.reject(response.data.data)
  } else {
    return Promise.resolve(response.data.data)
  }
}

function errorHandler (error) {
  store.commit('hideLoading')
  console.log(error)
  return Promise.reject(error)
}

const request = (method, url, data = {}) => {
  return instance.request({method, url, data}).then(data => ({data})).catch(err => ({err}))
}

export default request
