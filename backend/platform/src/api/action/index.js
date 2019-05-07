const { channelDAO, fieldDAO, actionDAO } = require('../../database/DAO')
const { response, resourceRoutes, actionTable } = require('../../util')

async function index (ctx) {
  const { id } = ctx.request.query
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
  const actions = await actionDAO.findAll({
    field_id: field.id
  })
  response.call(ctx, {
    actions: actions.map(action => ({
      id: action.get('id'),
      code: action.get('code'),
      threshold: action.get('threshold'),
      createdAt: action.get('created_at'),
      updatedAt: action.get('updated_at'),
    }))
  })
}

async function create (ctx) {
  const { id, threshold, code } = ctx.request.body
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

  if (!(+code in actionTable)) {
    response.call(ctx, {}, 400, 'code非法')
    return
  }

  if (isNaN(Number(threshold))) {
    response.call(ctx, {}, 400, 'threshold非法')
    return
  }

  const existedAction = await actionDAO.findAllByFieldId(id)
  if (existedAction.length >= 4) {
    response.call(ctx, {}, 400, '创建失败，Action上限为4')
    return
  }

  const now = new Date()
  const action = await actionDAO.create({
    field_id: field.id,
    code,
    threshold,
    created_at: now,
    updated_at: now
  })
  response.call(ctx, {
    id: action.id,
    code: action.get('code'),
    threshold: action.get('threshold'),
    createdAt: action.get('created_at'),
    updatedAt: action.get('updated_at'),
  })
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
  const action = await actionDAO.find({
    id
  })
  if (!action) {
    response.call(ctx, {}, 404, '找不到该Action')
    return
  }
  const fields = await fieldDAO.findAllByChannelId(channel.id)
  const field = fields.find(field => +field.id === +action.get('field_id'))
  if (!field) {
    response.call(ctx, {}, 404, '找不到该Field')
    return
  }
  try {
    await action.destroy()
    response.call(ctx, {})
  } catch (err) {
    response.call(ctx, {}, 400, '删除失败')
  }
}

module.exports = resourceRoutes('action', {
  create,
  index,
  destroy
})