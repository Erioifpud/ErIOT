const { respSuccess, respError } = require('../../util/format')
const { userDAO, placeDAO } = require('../../model/dao')

// async function place (ctx) {
//   const user = ctx.state.user
//   const data = await userDAO.findPlaceById(user.id)
//   respSuccess(ctx, data.places)
// }

async function placeGet (ctx) {
  const { placeName } = ctx.params
  const result = await placeDAO.findDeviceByPlaceName(placeName)
  respSuccess(ctx, result)
}

async function placePut (ctx) {
  const user = ctx.state.user
  const { placeId } = ctx.params
  const { name } = ctx.request.body
  const data = await userDAO.findPlaceByIdAndPlaceId(user.id, placeId)
  if (!data) {
    respError(ctx, 403, '无权访问')
    return
  }
  const result = await placeDAO.updatePlaceNameById(placeId, name)
  respSuccess(ctx, result)
}

module.exports = (router, prefix) => {
  // router.get(prefix + '/', place)
  router.get(prefix + '/:placeName', placeGet)
  router.put(prefix + '/:placeId', placePut)
}
