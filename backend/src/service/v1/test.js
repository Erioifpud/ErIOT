const { respSuccess } = require('../../util/format')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../../config/jwt.json')
const client = require('../../model/dao/client')
const { saveData, saveDataSet } = require('../../model/dao/client')

async function test (ctx) {
  const token = ctx.header.authorization.split(' ')[1]
  const decoded = jwt.verify(token, jwtConfig.secret, { algorithm: jwtConfig.algorithm })
  // saveData('123123123', 'bathroom', 'light', 1)
  saveData('123123123', [
    {
      room: 'testroom',
      deviceName: 'test',
      data: 11
    },
    {
      room: 'testroom2',
      deviceName: 'test3',
      data: 22
    },
    {
      room: 'testroom3',
      deviceName: 'test2',
      data: 33
    }
  ])
  respSuccess(ctx, {})
}

module.exports = (router, prefix) => {
  router.get(prefix + '/', test)
}
