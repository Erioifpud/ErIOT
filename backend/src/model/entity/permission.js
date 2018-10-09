const Sequelize = require('sequelize')
const { sequelize } = require('../../db')

const Permission = sequelize.define(
  'permission',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    rule: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    timestamps: false
  }
)

module.exports = Permission
