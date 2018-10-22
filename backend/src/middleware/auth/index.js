const jwtConfig = require('../../config/jwt.json')
const jwt = require('jsonwebtoken')
const { respError } = require('../../util/format')
const { findUserPermissionsById } = require('../../model/dao/user')

module.exports = {
  async auth (ctx, next) {
    if (!/Bearer \w+/.test(ctx.header.authorization)) {
      await next()
    } else {
      try {
        const token = ctx.header.authorization.split(' ')[1]
        const decoded = jwt.verify(token, jwtConfig.secret, {
          algorithm: jwtConfig.algorithm
        })
        ctx.state.user = decoded.user
        console.log(decoded)
        const fullUser = await findUserPermissionsById(decoded.user.id)
        const allRules = fullUser.roles.reduce((a, b) => {
          const permissions = b.permissions.map(item => item.rule)
          return a.concat(permissions)
        }, [])
        const validRules = Array.from(new Set(allRules))
        if (validRules.some(rule => RegExp(rule).test(ctx.url))) {
          await next()
        } else {
          console.log(validRules)
          // respError(ctx, 403, '访问受限')
          ctx.status = 403
        }
      } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
          ctx.status = 401
        }
      }
    }
  }
}
