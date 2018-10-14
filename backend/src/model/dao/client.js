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

const appendQuery = (template, op, key, val) => {
  template.where[key] = {
    ...template.where[key],
    [op]: val
  }
}

const findDataByClientId = (clientId, limit = 10, start, end, min, max, sum, avr) => {
  const template = {
    // attributes: ['id', 'place', 'device', 'data', 'createdAt'],
    limit,
    where: {
      id: clientId
    }
  }
  if (start && !isNaN(new Date(start))) {
    appendQuery(template, Sequelize.Op.$gte, 'createdAt', new Date(start))
  }
  if (end && !isNaN(new Date(end))) {
    appendQuery(template, Sequelize.Op.$lte, 'createdAt', new Date(end))
  }
  if (min && !isNaN(parseInt(min))) {
    appendQuery(template, Sequelize.Op.$gte, 'data', min)
  }
  if (max && !isNaN(parseInt(max))) {
    appendQuery(template, Sequelize.Op.$lte, 'data', max)
  }
  if (sum && parseInt(sum) >= 10 && parseInt(sum) <= 1440) {
    const now = new Date()
    appendQuery(template, Sequelize.Op.$between, 'createdAt', [new Date(now - sum * 60000), now])
    template.attributes = [[sequelize.fn('SUM', sequelize.col('data')), 'sum']]
  }
  if (avr && parseInt(avr) >= 10 && parseInt(avr) <= 1440) {
    const now = new Date()
    appendQuery(template, Sequelize.Op.$between, 'createdAt', [new Date(now - avr * 60000), now])
    template.attributes = [[sequelize.fn('AVG', sequelize.col('data')), 'avr']]
  }
  return Client.findAll(template)
}

module.exports = {
  findDataByClientId
}
