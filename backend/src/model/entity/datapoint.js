const Sequelize = require('sequelize')
const { sequelize } = require('../../db')

const DataPoint = sequelize.define(`datapoint`, {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  data: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = DataPoint
