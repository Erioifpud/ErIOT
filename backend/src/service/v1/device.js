const { respSuccess, respError } = require('../../util/format')
const { userDAO, deviceDAO, placeDAO } = require('../../model/dao')

async function deviceGet (ctx) {
  const { deviceId } = ctx.params
  const result = await deviceDAO.findClientByDeviceId(deviceId)
  respSuccess(ctx, result)
}

async function device (ctx) {
  const user = ctx.state.user
  const { placeId } = ctx.query
  const placesData = await userDAO.findPlaceById(user.id)
  const places = placesData.places
  console.log(1)
  if (!places.some(item => item.id === parseInt(placeId))) {
    respError(ctx, 403, '无权访问')
    return
  }
  console.log(2)
  const result = await placeDAO.findDeviceById(placeId)
  respSuccess(ctx, result)
}

module.exports = (router, prefix) => {
  router.get(prefix + '/', device)
  router.get(prefix + '/:deviceId', deviceGet)
}
