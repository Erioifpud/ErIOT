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
  let limit = parseInt(options.limit)
  if (!limit || limit < 1 || limit > 100) {
    limit = 10
  }
  let order = options.order.toUpperCase()
  if (order !== 'DESC' && order !== 'ASC') {
    order = 'DESC'
  }
  const template = {
    where: {
      id: clientId
    },
    include: [
      {
        order: [
          ['id', order]
        ],
        model: DataPoint,
        // attributes: { exclude: ['clientId'] },
        limit
      }
    ]
  }
  console.log(template)
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
  return Client.findOne(template)
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

const findLastestDataPointById = (id) => Client.findOne({
  where: {
    id
  },
  include: [
    {
      model: DataPoint,
      limit: 1,
      through: { attributes: [] },
      order: [
        ['createdAt', 'DESC']
      ]
    }
  ]
})

const updateClientNameById = (id, name) => Client.update({
  name
}, {
  where: {
    id
  }
})

const insertDataPointById = async (id, value) => {
  const dataPoint = await DataPoint.create({
    data: value
  })
  const client = await Client.findById(id)
  client.addDatapoints(dataPoint)
  return dataPoint
}

module.exports = {
  findDataByClientId,
  findOrAddClientByIdAndName,
  addClientByIdAndName,
  findAllClients,
  findClientById,
  findLastestDataPointById,
  updateClientNameById,
  insertDataPointById
}
