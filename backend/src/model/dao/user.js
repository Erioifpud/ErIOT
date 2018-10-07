const { User, Role, Permission } = require('../entity')
const { addUserHandler } = require('./inject')

const addUserByNameAndPass = (info) => User.create(info)

const findUserByUsername = (username, attrs) => {
  const query = {
    where: {
      username
    }
  }
  if (attrs) {
    query.attributes = attrs
  }
  return User.findOne(query)
}

const findUserPermissionsById = (id) => User.findOne({
  attributes: ['id', 'username'],
  where: {
    id
  },
  include: [
    {
      model: Role,
      through: { attributes: [] },
      include: [
        {
          model: Permission,
          through: { attributes: [] }
        }
      ]
    }
  ]
})

module.exports = {
  findUserPermissionsById,
  findUserByUsername,
  addUserByNameAndPass: new Proxy(addUserByNameAndPass, addUserHandler)
}
