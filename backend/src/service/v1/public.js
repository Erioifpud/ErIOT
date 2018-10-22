const { respSuccess, respError, success } = require('../../util/format')
const bcrypt = require('bcrypt')
const { userDAO } = require('../../model/dao')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../../config/jwt.json')

function checkValid (ctx, body) {
  if (!body.username || !body.password) {
    respError(ctx, 400, '用户名或密码为空')
    return false
  }
  if (body.password.length < 8) {
    respError(ctx, 400, '密码至少8位')
    return false
  }
  if (body.username.length < 4) {
    respError(ctx, 400, '用户名至少4位')
    return false
  }
  return true
}

async function register (ctx) {
  const { body } = ctx.request
  if (!checkValid(ctx, body)) {
    return
  }
  try {
    body.password = await bcrypt.hash(body.password, 12)
    const user = await userDAO.findUserByUsername(body.username, ['id'])
    if (user) {
      respError(ctx, 406, '用户名重复')
    } else {
      userDAO.addUserByNameAndPass(body)
      respSuccess(ctx, { username: body.username })
    }
  } catch (err) {
    console.log(err)
    respError(ctx, 500, '服务器错误')
  }
}

async function login (ctx) {
  const { body } = ctx.request
  if (!checkValid(ctx, body)) {
    return
  }
  try {
    const user = await userDAO.findUserByUsername(body.username)
    if (user) {
      const flag = await bcrypt.compare(body.password, user.password)
      if (flag) {
        // const info = await userDAO.findUserPermissionsById(user.id)
        user.password = ''
        const token = jwt.sign({ user }, jwtConfig.secret, { expiresIn: jwtConfig.expireTime })
        ctx.body = { token, ...success({ username: user.username }) }
      } else {
        respError(ctx, 406, '用户名或密码错误')
      }
    } else {
      respError(ctx, 406, '用户名或密码错误')
    }
  } catch (err) {
    console.log(err)
    respError(ctx, 500, '服务器错误' + err.toString())
  }
}

module.exports = (router, prefix) => {
  router.post(prefix + '/register', register)
  router.post(prefix + '/login', login)
}
