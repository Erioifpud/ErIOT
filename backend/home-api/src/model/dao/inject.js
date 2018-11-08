const { User, Role } = require('../entity')

const addUserHandler = {
  apply: async (target, object, args) => {
    const info = args[0]
    const user = await User.create(info)
    const member = await Role.findOne({ where: { name: 'member' } })
    user.addRoles(member)
  }
}

module.exports = {
  addUserHandler
}
