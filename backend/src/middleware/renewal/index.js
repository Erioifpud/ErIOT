const jwtConfig = require('../../config/jwt.json')
const jwt = require('jsonwebtoken')

module.exports = {
  renewalToken (decoded) {
    const optionKeys = ['iat', 'exp', 'iss', 'sub']
    const now = Math.floor(Date.now() / 1000)
    const timeToExpire = (decoded['exp'] - now)
    let newToken
    if (timeToExpire < jwtConfig.renewalTime) {
      const info = Object.keys(decoded).reduce((o, b) => {
        return optionKeys.includes(b) ? o : { ...o, ...decoded[b] }
      }, {})
      newToken = jwt.sign(info, jwtConfig.secret, { expiresIn: jwtConfig.maxAge })
    }
  }
}
