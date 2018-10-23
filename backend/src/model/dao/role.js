const { Role } = require('../entity')

const findAllRoles = () => Role.findAll()

module.exports = {
  findAllRoles
}
