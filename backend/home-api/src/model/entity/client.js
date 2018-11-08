const Sequelize = require('sequelize')
const { sequelize } = require('../../db')

const Client = sequelize.define(`client`, {
  id: {
    type: Sequelize.STRING,
    // autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: false
})

module.exports = Client
