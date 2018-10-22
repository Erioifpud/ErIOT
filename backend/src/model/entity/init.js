const { sequelize } = require('../../db')
const User = require('./user')
const Role = require('./role')
const Permission = require('./permission')
const Client = require('./client')
const Place = require('./place')
const Device = require('./device')
const DataPoint = require('./datapoint')

module.exports = () => sequelize.sync({ force: true }).then(async () => {
  const user1 = await User.create({
    username: 'root',
    password: '$2b$12$hRJVCT2zBbllTbDCp11WLuksmTxqf9dQ4daSLFOKNkh8kbgBkyl2q'
  })
  const user2 = await User.create({
    username: 'rootn',
    password: '$2b$12$hRJVCT2zBbllTbDCp11WLuksmTxqf9dQ4daSLFOKNkh8kbgBkyl2q'
  })
  const role1 = await Role.create({
    name: 'member'
  })
  const role2 = await Role.create({
    name: 'admin'
  })
  const permission1 = await Permission.create({
    rule: '/v\\d/\\w+'
  })
  const permission2 = await Permission.create({
    rule: '/v\\d/test2/\\w{0,}'
  })
  const permission3 = await Permission.create({
    rule: '/v\\d/test3/\\w{0,}'
  })
  user1.addRoles(role1)
  user1.addRoles(role2)
  user2.addRoles(role1)
  role1.addPermissions(permission1)
  role1.addPermissions(permission2)
  role1.addPermissions(permission3)
  role2.addPermissions(permission1)

  const place = await Place.create({
    name: 'my_livingroom'
  })
  const device = await Device.create({
    name: 'light'
  })
  const client1 = await Client.create({
    id: '123123123',
    name: 'pi_zero'
  })
  const client2 = await Client.create({
    id: '456456456',
    name: 'arduino'
  })
  const dataPoint1 = await DataPoint.create({
    data: 1
  })
  const dataPoint2 = await DataPoint.create({
    data: 2
  })
  const dataPoint3 = await DataPoint.create({
    data: 3
  })
  place.addDevices(device)
  device.addClients(client1)
  device.addClients(client2)
  client1.addDatapoints(dataPoint1)
  client1.addDatapoints(dataPoint2)
  client1.addDatapoints(dataPoint3)
})
