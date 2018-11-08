const Sequelize = require('sequelize')
const { sequelize } = require('../../db')

const Role = sequelize.define('role', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(32),
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false
})

module.exports = Role
