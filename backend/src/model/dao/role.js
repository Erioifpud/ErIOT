const { Role } = require('../entity')

const findAllRoles = () => Role.findAll()

const findRoleById = (id) => Role.findById(id)

module.exports = {
  findAllRoles,
  findRoleById
}
