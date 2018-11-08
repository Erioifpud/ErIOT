const { Device, Client } = require('../entity')

const addDeviceByName = (name) => Device.create({ name })

const findAllDevices = () => Device.findAll({
  attributes: {
    exclude: ['placeId']
  }
})

const findClientByDeviceId = (id, raw = false) => {
  const template = {
    attributes: {
      exclude: ['placeId']
    },
    where: {
      id
    },
    include: [
      {
        model: Client,
        through: { attributes: [] }
      }
    ]
  }
  if (raw) {
    template.raw = true
    template.nest = true
  }
  return Device.findOne(template)
}

// unused
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

const updateDeviceNameById = (id, name) => Device.update({
  name
}, {
  where: {
    id
  }
})

const findDeviceById = (id) => Device.findById(id)

module.exports = {
  findClientByDeviceId,
  findOrAddDeviceByName,
  addDeviceByName,
  findAllDevices,
  findDeviceById,
  updateDeviceNameById
}
