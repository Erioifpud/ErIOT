const { placeDAO, deviceDAO, clientDAO, dataPointDAO } = require('../model/dao')
const { sequelize } = require('../db')

const saveTopicAndMessage = async (topic, msg) => {
  const { placeName, deviceName, clientId } = topic
  let transactionPromise = sequelize.transaction((t) => {
    return placeDAO.findOrAddPlaceByName(placeName, t)
  })
  // return [instance, initialized]
  const placeModel = (await transactionPromise)[0]
  // const placeModel = (await placeDAO.findOrAddPlaceByName(placeName))[0]
  let result = await placeDAO.findDeviceByPlaceId(placeModel.id)
  let deviceModel
  if (result.devices.length !== 0 && result.devices.some(item => item.name === deviceName)) {
    deviceModel = result.devices.find(item => item.name === deviceName)
  } else {
    deviceModel = await deviceDAO.addDeviceByName(deviceName)
    placeModel.addDevices(deviceModel)
  }

  result = await deviceDAO.findClientByDeviceId(deviceModel.id)
  let clientModel
  if (result.clients.length !== 0 && result.clients.some(item => item.id === clientId)) {
    clientModel = result.clients.find(item => item.id === clientId)
  } else {
    // device可以包括现有的client，所以得先确保client唯一，不能直接添加
    transactionPromise = sequelize.transaction((t) => {
      return clientDAO.findOrAddClientByIdAndName(clientId, 'unnamed client', t)
    })
    const clientModel = (await transactionPromise)[0]
    // clientModel = (await clientDAO.findOrAddClientByIdAndName(clientId, 'unnamed client'))[0]
    deviceModel.addClients(clientModel)
  }

  const dataPoint = await dataPointDAO.addDataPointByData(parseFloat(msg))
  clientModel.addDatapoints(dataPoint)
}

module.exports = {
  saveTopicAndMessage
}
