const { respSuccess, respError } = require('../../util/format')
const { userDAO, deviceDAO, placeDAO } = require('../../model/dao')

async function deviceGet (ctx) {
  const { deviceId } = ctx.params
  const result = await deviceDAO.findClientByDeviceId(deviceId)
  respSuccess(ctx, result)
}

async function device (ctx) {
  const user = ctx.state.user
  const placeId = parseInt(ctx.query.placeId)
  const data = await userDAO.findDeviceById(user.id)
  if (!data) {
    respSuccess(ctx, null)
    return
  }
  const place = data.places.find(item => item.id === placeId)
  if (!place) {
    respError(ctx, 403, '无权访问')
    return
  }
  respSuccess(ctx, place.devices)
}

module.exports = (router, prefix) => {
  router.get(prefix + '/', device)
  router.get(prefix + '/:deviceId', deviceGet)
}
