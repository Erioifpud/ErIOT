const jwtConfig = require('../../config/jwt.json')
const jwt = require('jsonwebtoken')

const renewalToken = (decoded) => {
  const optionKeys = ['iat', 'exp', 'iss', 'sub']
  const now = Math.floor(Date.now() / 1000)
  const timeToExpire = (decoded['exp'] - now)
  if (timeToExpire < jwtConfig.renewalTime) {
    const info = Object.keys(decoded).reduce((o, b) => {
      return optionKeys.includes(b) ? o : { ...o, [b]: decoded[b] }
    }, {})
    return jwt.sign(info, jwtConfig.secret, {
      expiresIn: jwtConfig.expireTime,
      algorithm: jwtConfig.algorithm
    })
  }
  return undefined
}

module.exports = {
  async renewal (ctx, next) {
    if (!/Bearer \w+/.test(ctx.header.authorization)) {
      await next()
    } else {
      const token = ctx.header.authorization.split(' ')[1]
      const decoded = jwt.verify(token, jwtConfig.secret, {
        algorithm: jwtConfig.algorithm
      })
      const newToken = renewalToken(decoded)
      if (newToken) {
        ctx.body = { token: newToken }
      }
      await next()
    }
  }
}
