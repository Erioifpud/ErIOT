const { channelDAO, fieldDAO, datapointDAO } = require('../../database/DAO')
const { response, resourceRoutes } = require('../../util')

async function index (ctx) {
  const { id, limit = 10, start, end, desc} = ctx.request.query
  const { apiKey } = ctx.auth
  if (!apiKey) {
    response.call(ctx, {}, 404, '找不到该Channel')
    return
  }
  const channel = await channelDAO.findByApiKey(apiKey)
  if (!channel) {
    response.call(ctx, {}, 404, '找不到该Channel')
    return
  }
  const fields = await fieldDAO.findAllByChannelId(channel.id)
  const field = fields.find(field => +field.id === +id)
  if (!field) {
    response.call(ctx, {}, 404, '找不到该Field')
    return
  }
  if (limit > 50) {
    response.call(ctx, {}, 403, '单次获取数据点过多，请控制在50个以内')
    return
  }
  const points = await datapointDAO.findAll({
    field_id: field.id,
  }, limit, start, end, desc)
  response.call(ctx, {
    datapoints: points.map(point => ({
      id: point.get('id'),
      value: point.get('value'),
      createdAt: point.get('created_at'),
      updatedAt: point.get('updated_at'),
    }))
  })
}

async function create (ctx) {
  const { id, value } = ctx.request.body
  const { apiKey } = ctx.auth
  if (!apiKey) {
    response.call(ctx, {}, 404, '找不到该Channel')
    return
  }
  const channel = await channelDAO.findByApiKey(apiKey)
  if (!channel) {
    response.call(ctx, {}, 404, '找不到该Channel')
    return
  }
  const fields = await fieldDAO.findAllByChannelId(channel.id)
  const field = fields.find(field => +field.id === +id)
  if (!field) {
    response.call(ctx, {}, 404, '找不到该Field')
    return
  }
  const point = await datapointDAO.create({
    value,
    field_id: field.id
  })
  response.call(ctx, {
    id: point.id,
    value: point.get('value'),
    createdAt: point.get('created_at'),
    updatedAt: point.get('updated_at'),
  })
}

module.exports = resourceRoutes('datapoint', {
  create,
  index,
})