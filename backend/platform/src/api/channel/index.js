const { channelDAO, userDAO } = require('../../database/DAO')
const { response, resourceRoutes } = require('../../util')
const md5 = require('md5')

// 要不要显示fields，有待探讨
function formatFields (fields) {
  return fields.map(field => ({
    id: field.get('id'),
    name: field.get('name'),
    unitName: field.get('unit_name'),
    unit: field.get('unit')
  }))
}

async function create (ctx) {
  const { name, private } = ctx.request.body
  const { decoded } = ctx.auth
  const digest = md5(name + +new Date())
  const { user } = await channelDAO.findReleatedUserByKey(name, 'name')
  if (user && +user.id === +decoded.id) {
    response.call(ctx, {}, 400, '同一账户下存在同名Channel')
    return
  }
  try {
    const channel = await channelDAO.create({
      name, 
      private_flag: !!private,
      key: digest,
      user_id: decoded.id
    })
    response.call(ctx, {
      id: channel.get('id'),
      name: channel.get('name'),
      key: channel.get('key'),
      private: !!channel.get('private_flag')
    })
    return
  } catch (err) {
    response.call(ctx, {}, 400, '创建失败')
  }
}

async function index (ctx) {
  const { decoded } = ctx.auth
  const channels = await channelDAO.findAllByUserId(decoded.id)
  // const result = []
  // for (chn of channels) {
  //   const fields = await channelDAO.findReleatedFieldsByKey(chn.id, 'id')
  //   result.push({
  //     id: chn.get('id'),
  //     name: chn.get('name'),
  //     key: chn.get('key'),
  //     private: !!chn.get('private_flag'),
  //     fields: formatFields(fields)
  //   })
  // }
  // response.call(ctx, result)
  response.call(ctx, channels.map(chn => ({
    id: chn.get('id'),
    name: chn.get('name'),
    key: chn.get('key'),
    private: !!chn.get('private_flag')
  })))
}

async function show (ctx) {
  const { id } = ctx.params
  const { user, channel } = await channelDAO.findReleatedUserByKey(id, 'id')
  // const channel = await channelDAO.findByKey(id, 'id')
  const { decoded, apiKey } = ctx.auth || {}

  if (!channel) {
    response.call(ctx, {}, 404, '找不到该Channel')
    return
  }
  if (channel.get('private_flag')) {
    if (apiKey) {
      if (apiKey !== channel.get('key')) {
        response.call(ctx, {}, 403, '无权访问该Channel')
        return
      }
      // const fields = await channelDAO.findReleatedFieldsByKey(channel.id, 'id')
      response.call(ctx, {
        id: channel.get('id'),
        name: channel.get('name'),
        key: channel.get('key'),
        private: !!channel.get('private_flag'),
        // fields: formatFields(fields)
      })
      return
    }
    if (decoded) {
      if (decoded.id !== user.get('id')) {
        response.call(ctx, {}, 403, '无权访问该Channel')
        return
      }
      // const fields = await channelDAO.findReleatedFieldsByKey(channel.id, 'id')
      response.call(ctx, {
        id: channel.get('id'),
        name: channel.get('name'),
        key: channel.get('key'),
        private: !!channel.get('private_flag'),
        // fields: formatFields(fields)
      })
      return
    }
  } else {
    // const fields = await channelDAO.findReleatedFieldsByKey(channel.id, 'id')
    response.call(ctx, {
      id: channel.get('id'),
      name: channel.get('name'),
      key: channel.get('key'),
      private: !!channel.get('private_flag'),
      // fields: formatFields(fields)
    })
    return
  }
  response.call(ctx, {}, 403, '无权访问该Channel')
}

async function update (ctx) {
  const { id } = ctx.params
  const { name, private } = ctx.request.body
  const { decoded } = ctx.auth

  const channel = await channelDAO.findByKey(id, 'id')
  if (+channel.get('user_id') !== +decoded.id) {
    response.call(ctx, {}, 403, '无法修改他人Channel')
    return
  }
  if (name && name !== channel.get('name')) {
    channel.set('name', name)
    channel.set('key', md5(name + +new Date()))
  }
  if (private && private !== channel.get('private_flag')) {
    channel.set('private_flag', +private)
  }
  try {
    const result = await channel.save()
    response.call(ctx, {
      id: channel.get('id'),
      name: result.get('name'),
      key: result.get('key'),
      private: !!channel.get('private_flag')
    })
  } catch (err) {
    response.call(ctx, {}, 400, '信息修改失败')
  }
}

async function destroy (ctx) {
  const { id } = ctx.params
  const { decoded, apiKey } = ctx.auth
  const channel = await channelDAO.findByKey(id, 'id')
  if (!channel) {
    response.call(ctx, {}, 404, '该Channel不存在')
    return
  }
  if (apiKey) {
    if (apiKey !== channel.get('key')) {
      response.call(ctx, {}, 400, '无权删除该Channel')
      return
    }
    try {
      await channel.destroy()
      response.call(ctx, {})
      return
    } catch (err) {
      response.call(ctx, {}, 400, '删除失败')
    }
  }
  if (decoded) {

    return
  }
  response.call(ctx, {}, 400, 'Channel删除失败')
}

module.exports = resourceRoutes('channel', {
  show,
  create,
  index,
  update,
  destroy
})