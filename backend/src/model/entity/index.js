const { sequelize } = require('../../db')
const User = require('./user')
const Role = require('./role')
const Permission = require('./permission')

User.belongsToMany(Role, {
  through: 'user_role',
  foreignKey: 'userId'
})

Role.belongsToMany(User, {
  through: 'user_role',
  foreignKey: 'roleId'
})

Role.belongsToMany(Permission, {
  through: 'role_permission',
  foreignKey: 'roleId'
})

Permission.belongsToMany(Role, {
  through: 'role_permission',
  foreignKey: 'permId'
})

sequelize.sync({ force: true }).then(async () => {
  const user = await User.create({
    username: 'root',
    password: '$2b$12$cUIwdwL1wHdlZmaK3UYQae3dYWFNz3xH70QwJq9c7i6X/zvdlKCFi'
  })
  const role1 = await Role.create({
    name: 'test1'
  })
  const role2 = await Role.create({
    name: 'test2'
  })
  const permission1 = await Permission.create({
    rule: '/v\\d/test/\\w{0,}'
  })
  const permission2 = await Permission.create({
    rule: '/v\\d/test2/\\w{0,}'
  })
  const permission3 = await Permission.create({
    rule: '/v\\d/test3/\\w{0,}'
  })
  user.addRoles(role1)
  user.addRoles(role2)
  role1.addPermissions(permission1)
  role1.addPermissions(permission2)
  role2.addPermissions(permission3)
})

module.exports = {
  User,
  Role,
  Permission
}
