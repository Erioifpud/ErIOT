const { Sequelize, sequelize } = require('../../db')

const createTableByClientId = async (clientId) => {
  const Model = sequelize.define(`client_${clientId}`, {
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
  // sequelize.sync().then(async () => {
  //   return model.create({
  //     room: 'livingroom',
  //     deviceName: 'light',
  //     data: 1
  //   })
  // })
  const model = await Model.sync()
  return model
}

module.exports = {
  createTableByClientId
}