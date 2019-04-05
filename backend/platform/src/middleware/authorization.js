const { response, verifyToken } = require('../util')

module.exports = function (options) {
  const { whitelist = [] } = options || {}
  return async (ctx, next) => {
    let flag = true
    const token = (ctx.header.Authorization || ctx.header.authorization || '').replace('Bearer ', '')
    const apiKey = ctx.header['api-key']
    if (!token && !apiKey) {
      flag = false
    }

    let decoded
    try {
      decoded = verifyToken(token)
    } catch (err) {
      flag = false
    }

    if (flag) {
      ctx.auth = {
        apiKey,
        token,
        decoded
      }
      await next()
    } else {
      if (whitelist.some(regex => regex.test(ctx.url))) {
        await next()
      } else {
        response.call(ctx, {}, 401, '访问未经授权')
      }
    }
  }
}