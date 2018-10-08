const { respSuccess } = require('../../util/format')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../../config/jwt.json')
const client = require('../../model/dao/client')

async function test (ctx) {
  const token = ctx.header.authorization.split(' ')[1]
  const decoded = jwt.verify(token, jwtConfig.secret, { algorithm: jwtConfig.algorithm })
  const model = await client.createTableByClientId('123123123')
  
  respSuccess(ctx, model.findAll({}))
}

module.exports = (router, prefix) => {
  router.get(prefix + '/', test)
}
