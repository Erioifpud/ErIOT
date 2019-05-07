const jwt = require('jsonwebtoken')
const jwtConfig = require('../../config/jwt')

function normalizeHandler (item) {
  let handler
  if (typeof item === 'function') {
    handler = item
  } else if (item && typeof handler === 'object') {
    handler = item.handler
  } else {
    return undefined
  }
  return {
    handler,
    meta: item.meta
  }
}

function response (data, code = 200, message = 'success') {
  const bodyObj = {
    code,
    message,
    data
  }
  if (this.newToken && code === 200) {
    bodyObj.token = this.newToken
  }
  this.body = bodyObj
}

function responseWithToken (data, token) {
  this.body = {
    code: 200,
    message: 'success',
    data,
    token
  }
}

function routeInfo (prefix, ...handlers) {
  // 对module.exports导出的配置进行封装
}

function resourceRoutes (resourceName, handlerObj) {
  const resourceRoute = {
    index: {
      path: `/${resourceName}`,
      method: 'GET'
    },
    new: {
      path: `/${resourceName}/new`,
      method: 'GET'
    },
    show: {
      path: `/${resourceName}/:id`,
      method: 'GET'
    },
    edit: {
      path: `/${resourceName}/:id/edit`,
      method: 'GET'
    },
    create: {
      path: `/${resourceName}`,
      method: 'POST'
    },
    update: {
      path: `/${resourceName}/:id`,
      method: 'PUT'
    },
    destroy: {
      path: `/${resourceName}/:id`,
      method: 'DELETE'
    }
  }
  const routesConfig = Object.entries(handlerObj).map(([name, handler]) => {
    const route = resourceRoute[name]
    if (!route) {
      return
    }
    return {
      ...route,
      ...normalizeHandler(handler)
    }
  })
  return {
    prefix: '',
    routes: routesConfig.reduce((a, b) => {
      const route = a[b.path]
      if (route) {
        // a[b.path] = {
        //   ...route,
        //   method: [b.method].concat(route.method)
        // }

        // a[b.path].method = [b.method].concat(route.method)

        a[b.path].map.push({
          method: b.method,
          handler: b.handler
        })
      } else {
        a[b.path] = {
          ...b,
          map: [
            {
              method: b.method,
              handler: b.handler
            }
          ]
        }
      }
      return a
    }, {})
  }
}

function omit (obj, prop) {
  let {[prop]: omitted, ...res} = obj
  return res
}

function signToken (payload) {
  return jwt.sign(payload, jwtConfig.secret || '', omit(jwtConfig, 'secret'))
}

function verifyToken (token) {
  return jwt.verify(token, jwtConfig.secret || '', omit(jwtConfig, 'secret'))
}

const actionTable = {
  0: '===',
  1: '<',
  2: '>',
  3: '<=',
  4: '>='
}

module.exports = {
  response,
  responseWithToken,
  resourceRoutes,
  omit,
  signToken,
  verifyToken,
  actionTable
}