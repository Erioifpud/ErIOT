const Sequelize = require('sequelize')
const { sequelize } = require('../../db')

const Place = sequelize.define(`place`, {
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

module.exports = Place
