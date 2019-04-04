const Router = require('koa-router')
const fs = require('fs')
const path = require('path')

const router = new Router()

const apiPath = path.resolve(__dirname, 'src', 'api')
fs.readdirSync(apiPath).forEach(dirName => {
  const filePath = path.resolve(apiPath, dirName, 'index.js')
  fs.exists(filePath, exists => {
    if (!exists) {
      return
    }
    const routeInfo = require(filePath)
    if (!routeInfo || typeof routeInfo !== 'object') {
      return
    }
    // routerFn(router, '/api')
    const { prefix = '', routes = {} } = routeInfo
    Object.entries(routes).forEach(([k, v]) => {
      const { handler, method = 'get' } = v
      handler && router[method](`/api${prefix}${k}`, handler)
    })
  })
})

module.exports = router