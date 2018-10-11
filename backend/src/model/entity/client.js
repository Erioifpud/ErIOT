const Sequelize = require('sequelize')
const { sequelize } = require('../../db')

const Client = sequelize.define(`client`, {
  id: {
    type: Sequelize.STRING,
    // autoIncrement: true,
    primaryKey: true
  },
  place: {
    type: Sequelize.STRING,
    allowNull: false
  },
  device: {
    type: Sequelize.STRING,
    allowNull: false
  },
  data: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
})

module.exports = Client
