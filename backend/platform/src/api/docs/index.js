const { response } = require('../../util')
const fs = require('fs')
const path = require('path')

async function index (ctx) {
  const buffer = fs.readFileSync(path.resolve(global.__src, '../docs/swagger.json')) || ''
  ctx.body = buffer.toString()
}

module.exports = {
  prefix: '/docs',
  routes: {
    '/': {
      handler: index,
      method: 'get'
    }
  }
}