const Sequelize = require('sequelize')
const { sequelize } = require('../../db')

const getClientModel = (clientId) => {
  return sequelize.define(`client_${clientId}`, {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    room: {
      type: Sequelize.STRING(32),
      allowNull: false
    },
    deviceName: {
      type: Sequelize.STRING(32),
      allowNull: false
    },
    data: {
      type: Sequelize.DOUBLE,
      allowNull: false
    }
  }, {
    freezeTableName: true
  })
}

const checkIfClientExist = async (clientId) => {
  const result = await sequelize.query('SHOW TABLES LIKE ?', {
    replacements: [clientId],
    type: sequelize.QueryTypes.SELECT
  })
  return result.length > 0
}

const createTableByClientId = async (clientId) => {
  const existed = await checkIfClientExist(clientId)
  const result = existed ? await getClientModel(clientId) : await getClientModel(clientId).sync()
  return result
}

const saveData = async (clientId, room, deviceName, data) => {
  const model = await createTableByClientId(clientId)
  const result = await model.create({
    room,
    deviceName,
    data
  })
  return result
}

const saveDataSet = async (clientId, dataset) => {
  const model = await createTableByClientId(clientId)
  // all null
  const result = await model.bulkCreate(dataset, { returning: true })
  return result
}

module.exports = {
  saveData,
  saveDataSet
}
