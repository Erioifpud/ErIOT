const { respSuccess, respError } = require('../../util/format')
const { userDAO, clientDAO } = require('../../model/dao')

async function clientGet (ctx) {
  const user = ctx.state.user
  const { clientId } = ctx.params
  const data = await userDAO.findClientByIdAndClientId(user.id, clientId)
  if (!data) {
    respError(ctx, 403, '无权访问')
    return
  }
  const result = await clientDAO.findDataByClientId(clientId, ctx.query)
  respSuccess(ctx, result)
}

async function clientLatest (ctx) {
  const user = ctx.state.user
  const { clientId } = ctx.params
  const data = await userDAO.findClientByIdAndClientId(user.id, clientId)
  if (!data) {
    respError(ctx, 403, '无权访问')
    return
  }
  const result = await clientDAO.findLastestDataPointById(clientId)
  // console.log(result)
  respSuccess(ctx, result)
}

async function clientPut (ctx) {
  const user = ctx.state.user
  const { clientId } = ctx.params
  const { name } = ctx.request.body
  const data = await userDAO.findClientByIdAndClientId(user.id, clientId)
  if (!data) {
    respError(ctx, 403, '无权访问')
    return
  }
  const result = await clientDAO.updateClientNameById(clientId, name)
  respSuccess(ctx, result)
}

// async function client (ctx) {
//   const user = ctx.state.user
//   const deviceId = parseInt(ctx.query.deviceId)
//   const data = await userDAO.findClientById(user.id)
//   if (!data || !data.places) {
//     respSuccess(ctx, null)
//     return
//   }
//   const device = data.places.devices.find(item => item.id === deviceId)
//   if (!device) {
//     respError(ctx, 403, '无权访问')
//     return
//   }
//   respSuccess(ctx, device.clients)
// }

module.exports = (router, prefix) => {
  router.get(prefix + '/:clientId/latest', clientLatest)
  router.get(prefix + '/:clientId', clientGet)
  router.put(prefix + '/:clientId', clientPut)
}
