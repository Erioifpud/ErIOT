const User = require('./user')
const Role = require('./role')
const Permission = require('./permission')
const Client = require('./client')
const Place = require('./place')
const Device = require('./device')
const DataPoint = require('./datapoint')
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

User.belongsToMany(Place, {
  through: 'user_place',
  foreignKey: 'userId'
})

Place.belongsToMany(User, {
  through: 'user_place',
  foreignKey: 'placeId'
})

Place.hasMany(Device, {
  foreignKey: 'placeId'
})

Device.belongsTo(Place, {
  foreignKey: 'placeId'
})

Device.belongsToMany(Client, {
  through: 'device_client',
  foreignKey: 'deviceId'
})

Client.belongsToMany(Device, {
  through: 'device_client',
  foreignKey: 'clientId'
})

Client.hasMany(DataPoint, {
  foreignKey: 'clientId'
})

DataPoint.belongsTo(Client, {
  foreignKey: 'clientId'
})

initDB()

module.exports = {
  User,
  Role,
  Permission,
  Client,
  Place,
  Device,
  DataPoint
}
