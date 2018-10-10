const { respSuccess } = require('../../util/format')
const client = require('../../model/dao/client')
const clientDAO = require('../../model/dao/client')

async function clientGet (ctx) {
  const { clientId } = ctx.params

  respSuccess(ctx, ctx.query)
}

module.exports = (router, prefix) => {
  router.get(prefix + '/:clientId', clientGet)
}
