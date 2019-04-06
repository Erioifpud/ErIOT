const { channelDAO, userDAO } = require('../../database/DAO')
const { response, resourceRoutes } = require('../../util')
const md5 = require('md5')

async function create (ctx) {
  const { name, private } = ctx.request.body
  const { decoded } = ctx.auth
  // const user = userDAO.findByKey(decoded.id, 'id')
  const digest = md5(name + +new Date())
  const user = await channelDAO.findReleatedUserByKey(name, 'name')
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
  response.call(ctx, {
    channels: channels.map(chn => ({
      id: chn.get('id'),
      name: chn.get('name'),
      key: chn.get('key'),
      private: !!chn.get('private_flag')
    }))
  })
}

async function show (ctx) {
  const { id } = ctx.params
  const { user, channel } = await channelDAO.findReleatedUserByKey(id, 'id')
  // const channel = await channelDAO.findByKey(id, 'id')
  const { decoded, apiKey } = ctx.auth

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
      response.call(ctx, {
        id: channel.get('id'),
        name: channel.get('name'),
        key: channel.get('key'),
        private: !!channel.get('private_flag')
      })
      return
    }
    if (decoded) {
      if (decoded.id !== user.get('id')) {
        response.call(ctx, {}, 403, '无权访问该Channel')
        return
      }
      response.call(ctx, {
        id: channel.get('id'),
        name: channel.get('name'),
        key: channel.get('key'),
        private: !!channel.get('private_flag')
      })
      return
    }
  } else {
    response.call(ctx, {
      id: channel.get('id'),
      name: channel.get('name'),
      key: channel.get('key'),
      private: !!channel.get('private_flag')
    })
    return
  }
  response.call(ctx, {}, 403, '无权访问该Channel')
}

module.exports = resourceRoutes('channel', {
  show,
  create,
  index
})