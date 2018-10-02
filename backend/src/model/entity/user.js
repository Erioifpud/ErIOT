const {
  Sequelize,
  sequelize
} = require('../../db')

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING(32),
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING(60),
    allowNull: false
  }
}, {
  timestamps: false
})

module.exports = User
