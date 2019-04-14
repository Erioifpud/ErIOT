const { channelDAO, fieldDAO } = require('../../database/DAO')
const { response, resourceRoutes } = require('../../util')

async function create (ctx) {
  const { name, unit, unitName } = ctx.request.body
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
  const existedField = await fieldDAO.find({
    name,
    channel_id: channel.get('id')
  })
  if (existedField) {
    response.call(ctx, {}, 400, '同一Channel下存在同名Field')
    return
  }
  if (!name) {
    response.call(ctx, {}, 400, '缺少Field名称')
    return
  }
  try {
    const field = await fieldDAO.create({
      unit,
      unit_name: unitName,
      name,
      channel_id: channel.get('id')
    })
    response.call(ctx, {
      id: field.get('id'),
      name: field.get('name'),
      unit: field.get('unit'),
      unitName: field.get('unit_name'),
      createdAt: field.get('created_at'),
      updatedAt: field.get('updated_at'),
    })
    return
  } catch (err) {
    response.call(ctx, {}, 400, '创建失败')
  }
}

async function index (ctx) {
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
  const fields = await fieldDAO.findAllByChannelId(channel.get('id'))
  response.call(ctx, {
    fields: fields.map(field => ({
      id: field.get('id'),
      name: field.get('name'),
      unit: field.get('unit'),
      unitName: field.get('unit_name'),
      createdAt: field.get('created_at'),
      updatedAt: field.get('updated_at'),
    }))
  })
}

async function show (ctx) {
  const { id } = ctx.params
  const { apiKey } = ctx.auth
  // TODO: 先判断Channel是否公开，再判断有无apikey（仅限查询类接口）
  if (!apiKey) {
    response.call(ctx, {}, 404, '找不到该Channel')
    return
  }
  const channel = await channelDAO.findByApiKey(apiKey)
  if (!channel) {
    response.call(ctx, {}, 404, '找不到该Channel')
    return
  }
  const field = await fieldDAO.find({
    channel_id: channel.get('id'),
    id
  })
  if (!field) {
    response.call(ctx, {}, 404, '找不到该Field')
    return
  }
  response.call(ctx, {
    id: field.get('id'),
    name: field.get('name'),
    unit: field.get('unit'),
    unitName: field.get('unit_name'),
    createdAt: field.get('created_at'),
    updatedAt: field.get('updated_at'),
  })
}

async function update (ctx) {
  const { id } = ctx.params
  const { apiKey } = ctx.auth
  const { name, unit, unitName } = ctx.request.body
  if (!apiKey) {
    response.call(ctx, {}, 404, '找不到该Channel')
    return
  }
  const channel = await channelDAO.findByApiKey(apiKey)
  if (!channel) {
    response.call(ctx, {}, 404, '找不到该Channel')
    return
  }
  const field = await fieldDAO.find({
    channel_id: channel.get('id'),
    id
  })
  if (name && name !== field.get('name')) {
    field.set('name', name)
    field.set('updated_at', new Date())
  }
  if (unit && unit !== field.get('unit')) {
    field.set('unit', unit)
    field.set('updated_at', new Date())
  }
  if (unitName && unitName !== field.get('unit_name')) {
    field.set('unit_name', unitName)
    field.set('updated_at', new Date())
  }
  try {
    const result = await field.save()
    response.call(ctx, {
      id: result.get('id'),
      name: result.get('name'),
      unit: result.get('unit'),
      unitName: result.get('unit_name'),
      createdAt: field.get('created_at'),
      updatedAt: field.get('updated_at'),
    })
    return
  } catch (err) {
    response.call(ctx, {}, 400, '信息修改失败')
  } 
}

async function destroy (ctx) {
  const { id } = ctx.params
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
  const field = await fieldDAO.find({
    channel_id: channel.get('id'),
    id
  })
  try {
    await field.destroy()
    response.call(ctx, {})
    return
  } catch (err) {
    response.call(ctx, {}, 400, '删除失败')
  }
}

module.exports = resourceRoutes('field', {
  show,
  create,
  index,
  update,
  destroy
})