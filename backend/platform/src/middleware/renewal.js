const jwt = require('jsonwebtoken')
const { signToken, verifyToken, omit } = require('../util')

module.exports = function (options) {
  const { deadline = 1800 } = options || {}
  return async (ctx, next) => {
    const token = (ctx.header.Authorization || ctx.header.authorization || '').replace('Bearer ', '')
    if (token) {
      try {
        const payload = verifyToken(token)
        const exp = payload.exp
        const now = ~~(new Date() / 1000)
        if (exp - now < deadline) {
          console.log(exp, now, exp - now);
          const originPayload = omit(omit(payload, 'iat'), 'exp')
          ctx.newToken = signToken(originPayload)
        }
      } catch (err) {

      }
    }
    await next()
  }
}