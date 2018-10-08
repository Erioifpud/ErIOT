const { sequelize } = require('../../db')
const User = require('./user')
const Role = require('./role')
const Permission = require('./permission')
const initDB = require('./init')

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

initDB()

module.exports = {
  User,
  Role,
  Permission
}
