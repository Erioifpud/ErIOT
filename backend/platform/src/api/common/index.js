const { userDAO } = require('../../database/DAO')
const { response, responseWithToken, omit, signToken } = require('../../util')

function validate (body) {
  const { username, password } = body
  if (!username || !password) {
    return false
  }
  const trimedUsername = username.trim()
  const trimedPassword = password.trim()
  if (!trimedUsername || !trimedPassword) {
    return false
  }
  if (trimedUsername.length > 16 || trimedPassword > 16) {
    return false
  }
  return true
}

async function login (ctx) {
  const { body } = ctx.request
  const { username, password } = body
  if (!validate(body)) {
    response.call(ctx, {}, 400, '参数格式错误')
    return
  }
  try {
    const result = await userDAO.login(username, password)
    const payload = {
      id: result.id,
      name: result.get('name'),
      number: result.get('number'),
      // secret: result.get('secret')
    }
    const token = signToken(payload)
    responseWithToken.call(ctx, payload, token)
  } catch (err) {
    response.call(ctx, {}, 403, '用户名或密码错误')
    ctx.logger.error('login', '用户名或密码错误', username)
  }
}

async function register (ctx) {
  const { body } = ctx.request
  const { username, password } = body
  if (!validate(body)) {
    response.call(ctx, {
      test: 'test'
    }, 400, '参数错误')
    return
  }
  try {
    const result = await userDAO.register(username, password)
    response.call(ctx, {
      id: result.id,
      name: result.get('name'),
      number: result.get('number'),
      // secret: result.get('secret')
    })
  } catch (err) {
    response.call(ctx, {}, 403, '用户名重复')
    ctx.logger.error('register', '用户名重复', username)
  }
}

module.exports = {
  prefix: '/common',
  routes: {
    '/register': {
      handler: register,
      method: 'post',
      auth: false
    },
    '/login': {
      handler: login,
      method: 'post',
      auth: false
    }
  }
}