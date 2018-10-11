const User = require('./user')
const Role = require('./role')
const Permission = require('./permission')
const Client = require('./client')
const Place = require('./place')
const Device = require('./device')
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

Client.belongsToMany(Place, {
  through: 'client_place',
  foreignKey: 'clientId'
})

Place.belongsToMany(Client, {
  through: 'client_place',
  foreignKey: 'placeId'
})

Place.belongsToMany(Device, {
  through: 'place_device',
  foreignKey: 'placeId'
})

Device.belongsToMany(Place, {
  through: 'place_device',
  foreignKey: 'deviceId'
})

initDB()

module.exports = {
  User,
  Role,
  Permission,
  Client,
  Place,
  Device
}
