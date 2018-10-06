const jwtConfig = require('../../config/jwt.json')
const jwt = require('jsonwebtoken')
const { respError } = require('../../util/format')

module.exports = {
  async auth (ctx, next) {
    if (!/Bearer \w+/.test(ctx.header.authorization)) {
      await next()
    } else {
      const token = ctx.header.authorization.split(' ')[1]
      const decoded = jwt.verify(token, jwtConfig.secret, {
        maxAge: jwtConfig.maxAge
      })
      const allRules = decoded.info.roles.reduce((a, b) => {
        const permissions = b.permissions.map(item => item.rule)
        return a.concat(permissions)
      }, [])
      const validRules = Array.from(new Set(allRules))
      if (validRules.some(rule => RegExp(rule).test(ctx.url))) {
        await next()
      } else {
        console.log(validRules)
        respError(ctx, 403, '访问受限')
      }
    }
  }
}
