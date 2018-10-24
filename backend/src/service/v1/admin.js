const { respSuccess, respError } = require('../../util/format')
const { userDAO, roleDAO, permissionDAO, clientDAO, deviceDAO, placeDAO } = require('../../model/dao')

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
    const users = await userDAO.findAllUsers()
    const places = await placeDAO.findAllPlaces()
    respSuccess(ctx, { users, places })
  } else if (topic === 'device') {
    const clients = await clientDAO.findAllClients()
    const places = await placeDAO.findAllPlaces()
    const devices = await deviceDAO.findAllDevices()
    respSuccess(ctx, { places, devices, clients })
  } else {
    respError(ctx, 400, '参数错误')
  }
}

async function permission (ctx) {
  const flag = await checkRole(ctx.state.user)
  if (!flag) {
    respError(ctx, 403, '普通用户无法使用')
    return
  }
  const result = await userDAO.findAllUserPermissions()
  respSuccess(ctx, result)
}

async function device (ctx) {
  const flag = await checkRole(ctx.state.user)
  if (!flag) {
    respError(ctx, 403, '普通用户无法使用')
    return
  }
  const result = await placeDAO.findAllPlaceClients()
  respSuccess(ctx, result)
}

async function owner (ctx) {
  const flag = await checkRole(ctx.state.user)
  if (!flag) {
    respError(ctx, 403, '普通用户无法使用')
    return
  }
  const result = await userDAO.findAllUserPlaces()
  respSuccess(ctx, result)
}

async function permissionAdd (ctx) {
  const { ids: [userId, roleId, permissionId] } = ctx.request.body
  const user = await userDAO.findUserById(userId)
  const role = await roleDAO.findRoleById(roleId)
  const permission = await permissionDAO.findPermissionById(permissionId)
  if (!user || !role || !permission) {
    respError(ctx, 400, '参数错误')
    return
  }
  await role.addPermissions(permission)
  await user.addRoles(role)
  respSuccess(ctx, true)
}

async function deviceAdd (ctx) {
  const { ids: [placeId, deviceId, clientId] } = ctx.request.body
  const place = await placeDAO.findPlaceById(placeId)
  const device = await deviceDAO.findDeviceById(deviceId)
  const client = await clientDAO.findClientById(clientId)
  if (!place || !device || !client) {
    respError(ctx, 400, '参数错误')
    return
  }
  await device.addClients(client)
  await place.addDevices(device)
  respSuccess(ctx, true)
}

async function ownerAdd (ctx) {
  const { ids: [userId, placeId] } = ctx.request.body
  const user = await userDAO.findUserById(userId)
  const place = await placeDAO.findPlaceById(placeId)
  if (!user || !place) {
    respError(ctx, 400, '参数错误')
    return
  }
  await user.addPlaces(place)
  respSuccess(ctx, true)
}

async function permissionDel (ctx) {

}

async function deviceDel (ctx) {

}

async function ownerDel (ctx) {

}

module.exports = (router, prefix) => {
  router.get(prefix + '/associate', associate)
  router.get(prefix + '/associate/permission', permission)
  router.get(prefix + '/associate/device', device)
  router.get(prefix + '/associate/owner', owner)
  router.post(prefix + '/associate/permission', permissionAdd)
  router.post(prefix + '/associate/device', deviceAdd)
  router.post(prefix + '/associate/owner', ownerAdd)
  router.del(prefix + '/associate/permission', permissionDel)
}
