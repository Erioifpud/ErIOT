const Sequelize = require('sequelize')
const { sequelize } = require('../../db')
const { Device, Client } = require('../entity')

const findClientByDeviceId = (id) => {
  return Device.findAll({
    where: {
      id
    },
    include: [
      {
        model: Client,
        through: { attributes: [] }
      }
    ]
  })
}

const findClientByDeviceName = (id) => {
  return Device.findAll({
    where: {
      id
    },
    include: [
      {
        model: Client,
        through: { attributes: [] }
      }
    ]
  })
}

const addDeviceByName = (name) => {
  return Device.findOrCreate({
    where: {
      name
    },
    defaults: {
      name
    }
  })
}

module.exports = {
  findClientByDeviceId,
  addDeviceByName
}
