const { DataPoint } = require('../entity')

const addDataPointByData = (data) => DataPoint.create({ data })

module.exports = {
  addDataPointByData
}
