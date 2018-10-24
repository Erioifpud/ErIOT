const { Place, Device, Client } = require('../entity')

const findDeviceByPlaceId = (id, raw = false) => {
  const template = {
    where: {
      id
    },
    include: [
      {
        model: Device,
        attributes: { exclude: ['placeId'] }
      }
    ]
  }
  if (raw) {
    template.raw = true
    template.nest = true
  }
  return Place.findOne(template)
}

const findAllPlaces = () => Place.findAll()

const findDeviceByPlaceName = (name, raw = false) => {
  const template = {
    where: {
      name
    },
    include: [
      {
        model: Device,
        attributes: { exclude: ['placeId'] }
      }
    ],
    raw: true,
    nest: true
  }
  if (raw) {
    template.raw = true
    template.nest = true
  }
  return Place.findOne(template)
}

const findOrAddPlaceByName = (name, transaction) => {
  return Place.findOrCreate({
    where: {
      name
    },
    defaults: {
      name
    },
    transaction
  })
}

const findAllPlaceClients = () => Place.findAll({
  include: [
    {
      model: Device,
      attributes: { exclude: ['placeId'] },
      include: [
        {
          model: Client,
          through: { attributes: [] }
        }
      ]
    }
  ]
})

const findPlaceById = (id) => Place.findById(id)

module.exports = {
  findDeviceByPlaceId,
  findOrAddPlaceByName,
  findDeviceByPlaceName,
  findAllPlaces,
  findAllPlaceClients,
  findPlaceById
}
