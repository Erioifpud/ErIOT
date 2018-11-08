const { respSuccess } = require('../../util/format')
const { userDAO } = require('../../model/dao')

async function userData (ctx) {
  const user = ctx.state.user
  const result = await userDAO.findAllDataFromPlaceById(user.id)
  if (!result) {
    respSuccess(ctx, {})
    return
  }
  respSuccess(ctx, result)
}

module.exports = (router, prefix) => {
  router.get(prefix + '/', userData)
}
