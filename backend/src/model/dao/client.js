const Sequelize = require('sequelize')
const { sequelize } = require('../../db')
const { Client, Place, Device } = require('../entity')

// const getClientModel = (clientId) => {
//   return sequelize.define(`client_${clientId}`, {
//     id: {
//       type: Sequelize.INTEGER,
//       autoIncrement: true,
//       primaryKey: true
//     },
//     room: {
//       type: Sequelize.STRING,
//       allowNull: false
//     },
//     deviceName: {
//       type: Sequelize.STRING,
//       allowNull: false
//     },
//     data: {
//       type: Sequelize.DOUBLE,
//       allowNull: false
//     }
//   }, {
//     freezeTableName: true
//   })
// }

// const checkIfClientExist = async (clientId) => {
//   const result = await sequelize.query('SHOW TABLES LIKE ?', {
//     replacements: [clientId],
//     type: sequelize.QueryTypes.SELECT
//   })
//   return result.length > 0
// }

// const createTableByClientId = async (clientId) => {
//   // const existed = await checkIfClientExist(clientId)
//   // const result = existed ? await getClientModel(clientId) : await getClientModel(clientId).sync()
//   // return result
//   const model = await getClientModel(clientId).sync()
//   return model
// }

// const saveData = async (clientId, room, deviceName, data) => {
//   const model = await createTableByClientId(clientId)
//   const result = model.create({
//     room,
//     deviceName,
//     data
//   })
//   return result
// }

// const saveDataSet = async (clientId, dataset) => {
//   const model = await createTableByClientId(clientId)
//   const result = model.bulkCreate(dataset, { returning: true })
//   return result
// }

// const findDataById = async (clientId, where = {}, limit = 10, order = [['id', 'asc']]) => {
//   const model = await createTableByClientId(clientId)
//   return model.findAll({
//     limit,
//     where,
//     order
//   })
// }

// const findDataByIds = async (clientIds) => {
//   const model = await createTableByClientId(clientId)
// }

const findDataByClientId = (clientId, limit = 10, start, end, min, max, sum, avr, med) => {
  const template = {
    limit,
    where: {
      id: clientId
    }
  }
}

module.exports = {
  
}
