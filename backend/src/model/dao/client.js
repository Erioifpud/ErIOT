const Sequelize = require('sequelize')
const { Client, DataPoint } = require('../entity')

const addClientByIdAndName = (id, name) => Client.create({ id, name })

const findAllClients = () => Client.findAll()

const appendQuery = (template, op, key, val) => {
  if (!template.include[0].where) {
    template.include[0].where = {}
  }
  const includeWhere = template.include[0].where
  includeWhere[key] = {
    ...includeWhere[key],
    [op]: val
  }
}

const findDataByClientId = (clientId, options, raw = false) => {
  const template = {
    where: {
      id: clientId
    },
    include: [
      {
        model: DataPoint,
        attributes: { exclude: ['clientId'] }
      }
    ]
  }
  template.limit = options.limit || 10
  const { start, end, min, max } = options
  if (start && !isNaN(new Date(start))) {
    appendQuery(template, Sequelize.Op.gte, 'createdAt', new Date(start))
  }
  if (end && !isNaN(new Date(end))) {
    appendQuery(template, Sequelize.Op.lte, 'createdAt', new Date(end))
  }
  if (min && !isNaN(parseInt(min))) {
    appendQuery(template, Sequelize.Op.gte, 'data', min)
  }
  if (max && !isNaN(parseInt(max))) {
    appendQuery(template, Sequelize.Op.lte, 'data', max)
  }
  if (raw) {
    template.raw = true
    template.nest = true
  }
  // if (sum && parseInt(sum) >= 10 && parseInt(sum) <= 1440) {
  //   const now = new Date()
  //   appendQuery(template, Sequelize.Op.between, 'createdAt', [new Date(now - sum * 60000), now])
  //   template.include[0].attributes = [[sequelize.fn('SUM', sequelize.col('data')), 'sum']]
  // }
  // if (avr && parseInt(avr) >= 10 && parseInt(avr) <= 1440) {
  //   const now = new Date()
  //   appendQuery(template, Sequelize.Op.between, 'createdAt', [new Date(now - avr * 60000), now])
  //   template.attributes = [[sequelize.fn('AVG', sequelize.col('data')), 'avr']]
  // }
  return Client.findAll(template)
}

const findOrAddClientByIdAndName = (id, name, transaction) => {
  return Client.findOrCreate({
    where: {
      id
    },
    defaults: {
      id,
      name
    },
    transaction
  })
}

const findClientById = (id) => Client.findById(id)

module.exports = {
  findDataByClientId,
  findOrAddClientByIdAndName,
  addClientByIdAndName,
  findAllClients,
  findClientById
}
