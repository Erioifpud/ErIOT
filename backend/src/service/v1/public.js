const { success, error } = require('./format')
const bcrypt = require('bcrypt')
const { User, Role, Permission } = require('../../model/entity')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../../config/jwt.json')

async function register (ctx) {
  const { body } = ctx.request
  try {
    if (!body.username || !body.password) {
      ctx.body = error(400, '用户名或密码为空')
    }
    body.password = await bcrypt.hash(body.password, 12)
    const user = await User.findOne({
      where: { username: body.username }
    })
    if (user) {
      ctx.body = error(406, '用户名重复')
    } else {
      User.create(body)
      ctx.body = success({ username: body.username })
    }
  } catch (err) {
    ctx.body = error(500, '服务器错误')
  }
}

async function login (ctx) {
  const { body } = ctx.request
  try {
    const user = await User.findOne({
      where: {
        username: body.username
      }
    })
    if (user) {
      const flag = await bcrypt.compare(body.password, user.password)
      if (flag) {
        const test = await User.findOne({
          attributes: ['id', 'username'],
          where: {
            id: user.id
          },
          include: [
            {
              model: Role,
              through: { attributes: [] },
              include: [
                {
                  model: Permission,
                  through: { attributes: [] }
                }
              ]
            }
          ]
        })
        // const roles = await user.getRoles()
        // const test = await Permission.findAll({
        //   include: [
        //     {
        //       model: Role,
        //       where: {
        //         id: {
        //           $in: roles.map(r => r.id)
        //         }
        //       },
        //       required: true
        //     }
        //   ]
        // })
        const token = jwt.sign({
          id: user.id,
          username: user.username
        }, jwtConfig.secret, { expiresIn: jwtConfig.maxAge })
        ctx.body = success({ token, test, user })
        return
      }
    }
    ctx.body = error(406, '用户名或密码错误')
  } catch (err) {
    ctx.body = error(500, '服务器错误' + err.toString())
  }
}

module.exports = (router, prefix) => {
  router.post(prefix + '/register', register)
  router.post(prefix + '/login', login)
}
