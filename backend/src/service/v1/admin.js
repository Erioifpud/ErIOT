const { respSuccess, respError } = require('../../util/format')
const { userDAO } = require('../../model/dao')

const checkRole = (user) => {
  const roles = userDAO.findUserRoleById(user.id)
  return roles.some(item => item.name === 'admin')
}

async function user (ctx) {
  if (!checkRole(user)) {
    respError(ctx, 403, '普通用户无法使用')
    return
  }
  respSuccess(ctx, '123')
}

module.exports = (router, prefix) => {
  router.get(prefix + '/user', user)
}
