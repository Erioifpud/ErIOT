const { userDAO } = require('../../database/DAO')
const { response, resourceRoutes, omit } = require('../../util')

async function index (ctx) {
  const { decoded } = ctx.auth
  const user = await userDAO.findByKey(decoded.id, 'id')
  if (user) {
    response.call(ctx, {
      id: user.id,
      name: user.get('name'),
      number: user.get('number')
    })
  } else {
    response.call(ctx, {}, 404, '找不到该用户')
  }
}

async function show (ctx) {
  const { decoded } = ctx.auth
  const user = await userDAO.findByKey(decoded.id, 'id')
  if (user && user.get('admin_flag')) {
    const { id } = ctx.params
    const target = await userDAO.findByKey(id, 'id')
    if (target) {
      response.call(ctx, {
        id: target.id,
        name: target.get('name'),
        number: target.get('number')
      })
    } else {
      response.call(ctx, {}, 404, '找不到该用户')
    }
  } else {
    response.call(ctx, {}, 401, '访问未经授权')
  }
}

async function update (ctx) {
  const { password, number, newPassword } = ctx.request.body
  const { decoded } = ctx.auth
  const user = await userDAO.find({
    id: decoded.id,
    password
  })

  if (user) {

  } else {
    response.call(ctx, {}, 401, '原密码错误')
  }
}

module.exports = resourceRoutes('user', {
  index,
  update,
  show
})