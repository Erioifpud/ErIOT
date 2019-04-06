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
      const { map } = v
      if (map) {
        map.forEach(pair => {
          router[pair.method.toLowerCase()].call(router, `/api${prefix}${k}`, pair.handler)
        })
      } else {
        const { handler, method = 'get' } = v
        router[method.toLowerCase()].call(router, `/api${prefix}${k}`, handler)
      }
    })
  })
})

module.exports = router