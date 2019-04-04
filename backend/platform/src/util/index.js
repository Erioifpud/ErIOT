module.exports = {
  response (data, code = 200, message = 'success') {
    this.body = {
      code,
      message,
      data
    }
  },
  routeInfo (prefix, ...handlers) {
    // 对module.exports导出的配置进行封装
  },
  resourceRoutes (resourceName, handlerObj) {
    Object.entries(handlerObj).forEach(([name, handler]) => {
      if (name === 'index') {

      } else if (name === 'new') {

      } else if (name === 'show') {

      } else if (name === 'edit') {

      } else if (name === 'create') {

      } else if (name === 'update') {

      } else if (name === 'destroy')
    })
    return {
      routes: {

      }
    }
  }
}

/*
module.exports = {
  prefix: '/',
  routes: {
    '/register': {
      handler: register,
      method: 'post',
      auth: false
    },
    '/login': {
      handler: login,
      method: 'post',
      auth: false
    }
  }
}
*/