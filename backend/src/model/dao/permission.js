const { Permission } = require('../entity')

const findAllPermissions = () => Permission.findAll()

const findPermissionById = (id) => Permission.findById(id)

module.exports = {
  findAllPermissions,
  findPermissionById
}
