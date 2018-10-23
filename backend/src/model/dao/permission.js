const { Permission } = require('../entity')

const findAllPermissions = () => Permission.findAll()

module.exports = {
  findAllPermissions
}
