const _public = require('./public')
const test = require('./test')
const client = require('./client')

module.exports = (router, prefix) => {
  _public(router, prefix + '/public')
  test(router, prefix + '/test')
  client(router, prefix + '/client')
}
