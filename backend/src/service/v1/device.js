const { respSuccess } = require('../../util/format')
const { deviceDAO } = require('../../model/dao')

async function deviceGet (ctx) {
  const { deviceId } = ctx.params
  const result = await deviceDAO.findClientByDeviceId(deviceId)
  respSuccess(ctx, result)
}

module.exports = (router, prefix) => {
  router.get(prefix + '/:deviceId', deviceGet)
}
