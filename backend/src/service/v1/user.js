const { respSuccess } = require('../../util/format')
const { userDAO } = require('../../model/dao')

async function role (ctx) {
  const user = ctx.state.user
  const roles = await userDAO.findUserRoleById(user.id)
  respSuccess(ctx, roles)
}

module.exports = (router, prefix) => {
  router.get(prefix + '/role', role)
}
