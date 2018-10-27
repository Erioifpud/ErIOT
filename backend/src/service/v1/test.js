const { respSuccess } = require('../../util/format')
const { userDAO } = require('../../model/dao')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../../config/jwt.json')

async function test (ctx) {
  const token = ctx.header.authorization.split(' ')[1]
  console.log('1231231231231231232131311232312');
  const decoded = jwt.verify(token, jwtConfig.secret, { algorithm: jwtConfig.algorithm })
  const result = await userDAO.findDeviceById(1)
  respSuccess(ctx, result)
}

module.exports = (router, prefix) => {
  router.get(prefix + '/', test)
}
