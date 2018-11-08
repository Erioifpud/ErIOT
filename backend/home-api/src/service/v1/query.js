const { respSuccess } = require('../../util/format')
const { placeDAO } = require('../../model/dao')

async function query (ctx) {
  const { placeName } = ctx.params
  const result = await placeDAO.findDeviceByPlaceName(placeName)
  respSuccess(ctx, result)
}

module.exports = (router, prefix) => {
  router.get(prefix + '/:placeName', query)
}
