const { Place, Device } = require('../entity')

const findDeviceByPlaceId = (id) => {
  return Place.findOne({
    where: {
      id
    },
    include: [
      {
        model: Device,
        attributes: { exclude: ['placeId'] }
      }
    ]
  })
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

module.exports = {
  findDeviceByPlaceId,
  findOrAddPlaceByName
}
