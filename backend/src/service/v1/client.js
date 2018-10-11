const { respSuccess } = require('../../util/format')

async function clientGet (ctx) {
  const { clientId } = ctx.params

  respSuccess(ctx, ctx.query)
}

module.exports = (router, prefix) => {
  router.get(prefix + '/:clientId', clientGet)
}
