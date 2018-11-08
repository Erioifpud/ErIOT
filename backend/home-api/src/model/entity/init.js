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

  const place1 = await Place.create({
    name: 'my_livingroom'
  })
  const place2 = await Place.create({
    name: 'bedroom'
  })
  const device1 = await Device.create({
    name: 'light'
  })
  const device2 = await Device.create({
    name: 'light'
  })
  const device3 = await Device.create({
    name: 'fan'
  })
  const device4 = await Device.create({
    name: 'TV'
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
  place1.addDevices(device1)
  place1.addDevices(device3)
  place2.addDevices(device2)
  place2.addDevices(device4)
  device1.addClients(client1)
  device3.addClients(client1)
  device2.addClients(client2)
  device4.addClients(client1)
  client1.addDatapoints(dataPoint1)
  client1.addDatapoints(dataPoint2)
  client1.addDatapoints(dataPoint3)

  user1.addPlaces(place1)
  user1.addPlaces(place2)
})
