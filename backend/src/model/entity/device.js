const Sequelize = require('sequelize')
const { sequelize } = require('../../db')

const Device = sequelize.define(`device`, {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Device
