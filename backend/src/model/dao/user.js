const { User, Role, Permission, Place, Device, Client } = require('../entity')
const { addUserHandler } = require('./inject')

const addUserByNameAndPass = (info) => User.create(info)

const findAllUsers = () => {
  return User.findAll({
    attributes: {
      exclude: ['password']
    }
  })
}

const findAllUserPermissions = () => User.findAll({
  attributes: ['id', 'username'],
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

const findAllUserPlaces = () => User.findAll({
  attributes: ['id', 'username'],
  include: [
    {
      model: Place,
      through: { attributes: [] }
    }
  ]
})

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

const findUserRoleById = (id, options) => User.findOne({
  attributes: ['id', 'username'],
  where: {
    id
  },
  include: [
    {
      model: Role,
      through: { attributes: [] }
    }
  ],
  ...options
})

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

const findPlaceById = (id) => User.findOne({
  attributes: ['id', 'username'],
  required: true,
  where: {
    id
  },
  include: [
    {
      model: Place,
      required: true,
      through: { attributes: [] }
    }
  ]
})

const findDeviceById = (id) => User.findOne({
  attributes: ['id', 'username'],
  required: true,
  where: {
    id
  },
  include: [
    {
      model: Place,
      required: true,
      through: { attributes: [] },
      include: [
        {
          model: Device,
          required: true,
          attributes: { exclude: ['placeId'] }
        }
      ]
    }
  ]
})

const findClientByIdAndClientId = (id, clientId) => User.findOne({
  attributes: ['id', 'username'],
  required: true,
  where: {
    id
  },
  include: [
    {
      model: Place,
      required: true,
      through: { attributes: [] },
      include: [
        {
          model: Device,
          required: true,
          attributes: { exclude: ['placeId'] },
          include: [
            {
              model: Client,
              where: {
                id: clientId
              },
              required: true,
              through: { attributes: [] }
            }
          ]
        }
      ]
    }
  ]
})

const findDeviceByIdAndDeviceId = (id, deviceId) => User.findOne({
  attributes: ['id', 'username'],
  required: true,
  where: {
    id
  },
  include: [
    {
      model: Place,
      required: true,
      through: { attributes: [] },
      include: [
        {
          where: {
            id: deviceId
          },
          model: Device,
          required: true,
          attributes: { exclude: ['placeId'] }
        }
      ]
    }
  ]
})

const findPlaceByIdAndPlaceId = (id, placeId) => User.findOne({
  attributes: ['id', 'username'],
  required: true,
  where: {
    id
  },
  include: [
    {
      where: {
        id: placeId
      },
      model: Place,
      required: true,
      through: { attributes: [] }
    }
  ]
})

const findAllDataFromPlaceById = (id) => User.findOne({
  attributes: ['id', 'username'],
  where: {
    id
  },
  include: [
    {
      model: Place,
      through: { attributes: [] },
      include: [
        {
          model: Device,
          attributes: { exclude: ['placeId'] },
          include: [
            {
              model: Client,
              through: { attributes: [] }
            }
          ]
        }
      ]
    }
  ]
})

const findUserById = (id) => User.findById(id)

module.exports = {
  findUserPermissionsById,
  findUserByUsername,
  addUserByNameAndPass: new Proxy(addUserByNameAndPass, addUserHandler),
  findPlaceById,
  findUserRoleById,
  findAllUsers,
  findAllUserPermissions,
  findAllUserPlaces,
  findUserById,
  findDeviceById,
  findClientByIdAndClientId,
  findDeviceByIdAndDeviceId,
  findPlaceByIdAndPlaceId,
  findAllDataFromPlaceById
}
