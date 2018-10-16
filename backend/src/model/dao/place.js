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

const addPlaceByName = (name) => {
  return Place.findOrCreate({
    where: {
      name
    },
    defaults: {
      name
    }
  })
}

const test = (topic) => {
  const { place, device, clientId } = topic
  const placeModel = addPlaceByName(place)
  let result = findDeviceByPlaceId(placeModel.id)
  if (result.devices.length !== 0 && result.devices.some(item => item.name === device)) {
    // find this device
    // call findClientByDeviceId and check if existed
  } else {
    // add device and client
    // associate
  }
}

module.exports = {
  findDeviceByPlaceId,
  addPlaceByName
}
