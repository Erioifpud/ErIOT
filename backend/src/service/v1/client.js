const { respSuccess } = require('../../util/format')
const { clientDAO } = require('../../model/dao')

async function clientGet (ctx) {
  const { clientId } = ctx.params
  const result = await clientDAO.findDataByClientId(clientId, ctx.query)
  respSuccess(ctx, result)
}

module.exports = (router, prefix) => {
  router.get(prefix + '/:clientId', clientGet)
}
