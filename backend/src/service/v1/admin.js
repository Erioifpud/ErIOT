const { respSuccess, respError } = require('../../util/format')
const { userDAO, roleDAO, permissionDAO } = require('../../model/dao')

const checkRole = async (user) => {
  const result = await userDAO.findUserRoleById(user.id)
  return result.roles.some(item => item.name === 'admin')
}

async function associate (ctx) {
  const { topic } = ctx.query
  const flag = await checkRole(ctx.state.user)
  if (!flag) {
    respError(ctx, 403, '普通用户无法使用')
    return
  }
  if (topic === 'permission') {
    const users = await userDAO.findAllUsers()
    const roles = await roleDAO.findAllRoles()
    const permissions = await permissionDAO.findAllPermissions()
    respSuccess(ctx, { users, roles, permissions })
  } else if (topic === 'owner') {

  } else if (topic === 'device') {

  } else {
    respError(ctx, 400, '参数错误')
  }
}

module.exports = (router, prefix) => {
  router.get(prefix + '/associate', associate)
}
