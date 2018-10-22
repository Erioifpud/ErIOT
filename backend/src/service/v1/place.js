const { respSuccess } = require('../../util/format')
const { userDAO, placeDAO } = require('../../model/dao')

async function place (ctx) {
  const user = ctx.state.user
  const places = await userDAO.findPlaceById(user.id)
  respSuccess(ctx, places)
}

async function placeGet (ctx) {
  const { placeName } = ctx.params
  const result = await placeDAO.findDeviceByPlaceName(placeName)
  respSuccess(ctx, result)
}

module.exports = (router, prefix) => {
  router.get(prefix + '/', place)
  router.get(prefix + '/:placeName', placeGet)
}
