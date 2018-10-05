const jwtConfig = require('../../config/jwt.json')
const jwt = require('jsonwebtoken')

module.exports = {
  async auth (ctx, next) {
    if (!/Bearer \w+/.test(ctx.header.authorization)) {
      await next()
    } else {
      const token = ctx.header.authorization.split(' ')[1]
      const decoded = jwt.verify(token, jwtConfig.secret, {
        maxAge: jwtConfig.maxAge
      })

      console.log('decoded', decoded)
      // ctx.body = ctx
      await next()
    }
  }
}
