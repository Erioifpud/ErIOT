const format = require('./format')
const bcrypt = require('bcrypt')
const {
  User
} = require('../../model/entity')

async function register (ctx) {
  const {
    body
  } = ctx.request
  if (!body.username || !body.password) {
    ctx.body = format(400, undefined, '用户名或密码为空')
  }
  body.password = await bcrypt.hash(body.password, 12)
  const user = User.findAll({
    where: {
      username: body.username
    }
  })
  ctx.body = {
    user,
    body
  }
}

module.exports = (router, prefix) => {
  router.post(prefix + '/register', register)
}
