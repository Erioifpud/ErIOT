const { success } = require('./format')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../../config/jwt.json')

async function test (ctx) {
  const token = ctx.header.authorization.split(' ')[1]
  const decoded = jwt.verify(token, jwtConfig.secret, {
    maxAge: jwtConfig.maxAge
  })
  ctx.body = success(decoded)
}

module.exports = (router, prefix) => {
  router.get(prefix + '/', test)
}
