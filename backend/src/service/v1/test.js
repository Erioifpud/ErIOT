const { respSuccess } = require('../../util/format')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../../config/jwt.json')
const client = require('../../model/dao/client')
const clientDAO = require('../../model/dao/client')
const placeDAO = require('../../model/dao/place')
const deviceDAO = require('../../model/dao/device')
const userDAO = require('../../model/dao/user')

async function test (ctx) {
  const token = ctx.header.authorization.split(' ')[1]
  const decoded = jwt.verify(token, jwtConfig.secret, { algorithm: jwtConfig.algorithm })

  // const result = await placeDAO.test({
  //   placeName: 'my_livingroom',
  //   deviceName: 'light',
  //   clientId: '123123123'
  // }, `${Math.random()}`)
  // const result = await deviceDAO.findClientByDeviceId('1')
  // const result = await clientDAO.addClientByIdAndName('123123123')
  respSuccess(ctx, { })
}

module.exports = (router, prefix) => {
  router.get(prefix + '/', test)
}
