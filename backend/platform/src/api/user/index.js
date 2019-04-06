const { userDAO } = require('../../database/DAO')
const { response, resourceRoutes } = require('../../util')

async function index (ctx) {
  const { decoded } = ctx.auth
  const user = await userDAO.findByKey(decoded.id, 'id')
  if (user) {
    response.call(ctx, {
      id: user.id,
      name: user.get('name'),
      number: user.get('number'),
      // secret: result.get('secret')
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
        number: target.get('number'),
        // secret: result.get('secret')
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
  const { id } = ctx.params
  if (!password) {
    response.call(ctx, {}, 400, '参数格式错误')
    return
  }
  if (!number && !newPassword) {
    response.call(ctx, {}, 200, '信息无需修改')
    return
  }
  if (+decoded.id !== +id) {
    response.call(ctx, {}, 403, '无法修改他人信息')
    return
  }
  const user = await userDAO.find({
    id: decoded.id
  })
  try {
    const result = await user.authenticate(password)
    console.log(result);
  } catch (err) {
    response.call(ctx, {}, 401, '原密码错误')
    return
  }
  number && user.set('number', number)
  newPassword && user.set('password', newPassword)
  const result = await user.save()
  response.call(ctx, {
    id: result.id,
    name: result.get('name'),
    number: result.get('number'),
    // secret: result.get('secret')
  })
}

module.exports = resourceRoutes('user', {
  index,
  update,
  show
})