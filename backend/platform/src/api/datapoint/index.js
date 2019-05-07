const axios = require('axios')
const { channelDAO, fieldDAO, datapointDAO, actionDAO, userDAO } = require('../../database/DAO')
const { response, resourceRoutes, actionTable } = require('../../util')

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
  if (isNaN(Number(value))) {
    response.call(ctx, {}, 400, 'value非法')
    return
  }
  const now = new Date()
  const point = await datapointDAO.create({
    value,
    field_id: field.id,
    created_at: now,
    updated_at: now
  })
  ctx.state.mqtt.publish('/erioifpud.cn@gmail.com/9c1ba7f4f5847873e88fb03bd84e1bf9|11', `${point.get('created_at')}|${value}`)
  const user = await userDAO.findByKey(channel.get('user_id'), 'id')
  const sckey = user.get('sckey')
  if (sckey) {
    await checkAction({
      fieldId: field.id,
      key: sckey,
      cur: value
    })
  }
  response.call(ctx, {
    id: point.id,
    value: point.get('value'),
    createdAt: point.get('created_at'),
    updatedAt: point.get('updated_at'),
  })
}

async function checkAction (opts) {
  const { fieldId, key, cur } = opts
  const actions = await actionDAO.findAllByFieldId(fieldId)
  actions.forEach(act => {
    const code = act.get('code')
    const threshold = act.get('threshold')
    const sign = actionTable[+code]
    if (eval(`${+cur}${sign}${+threshold}`)) {
      notifyWechat(key, cur, sign, threshold)
    }
  })
}

function notifyWechat (key, cur, sign, threshold) {
  const url = `https://sc.ftqq.com/${key}.send`
  axios.get(url, {
    params: {
      text: '动作',
      desp: `当前数据为${cur}，已满足触发条件"${sign}"，阈值为${threshold}。`
    }
  })
  // console.log(`当前数据为${cur}，已满足触发条件"${sign}"，阈值为${threshold}。`)
}

module.exports = resourceRoutes('datapoint', {
  create,
  index,
})