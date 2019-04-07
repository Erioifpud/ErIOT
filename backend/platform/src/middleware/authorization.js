const { response, verifyToken } = require('../util')

module.exports = function (options) {
  const { whitelist = [] } = options || {}
  return async (ctx, next) => {
    ctx.auth = {}
    let flag = true
    const token = (ctx.header.Authorization || ctx.header.authorization || '').replace('Bearer ', '')
    const apiKey = ctx.header['api-key']
    // if (!token && !apiKey) {
    //   flag = false
    // }
    token && (ctx.auth.token = token)
    apiKey && (ctx.auth.apiKey = apiKey)

    let decoded
    try {
      decoded = verifyToken(token)
    } catch (err) {
      flag = false
    } 

    if (flag) {
      ctx.auth.decoded = decoded
      await next()
    } else {
      if (whitelist.some(item => {
        if (item.method) {
          return ctx.method.toLowerCase() === item.method.toLowerCase() && item.regex.test(ctx.url)
        } else {
          return item.test(ctx.url)
        }
      })) {
        await next()
      } else {
        response.call(ctx, {}, 401, '访问未经授权')
      }
    }
  }
}