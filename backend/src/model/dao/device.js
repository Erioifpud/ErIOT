const { Device, Client } = require('../entity')

const addDeviceByName = (name) => Device.create({ name })

const findClientByDeviceId = (id) => {
  return Device.findOne({
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

const findOrAddDeviceByName = (name, transaction) => {
  return Device.findOrCreate({
    where: {
      name
    },
    defaults: {
      name
    },
    transaction
  })
}

module.exports = {
  findClientByDeviceId,
  findOrAddDeviceByName,
  addDeviceByName
}
