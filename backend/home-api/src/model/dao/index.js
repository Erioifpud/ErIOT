const userDAO = require('./user')
const placeDAO = require('./place')
const deviceDAO = require('./device')
const clientDAO = require('./client')
const dataPointDAO = require('./datapoint')
const roleDAO = require('./role')
const permissionDAO = require('./permission')

module.exports = {
  userDAO,
  placeDAO,
  deviceDAO,
  clientDAO,
  dataPointDAO,
  roleDAO,
  permissionDAO
}
