const _public = require('./public')
const test = require('./test')
const client = require('./client')
const place = require('./place')
const device = require('./device')
const query = require('./query')

module.exports = (router, prefix) => {
  _public(router, prefix + '/public')
  test(router, prefix + '/test')
  client(router, prefix + '/client')
  place(router, prefix + '/place')
  device(router, prefix + '/device')
  query(router, prefix + '/query')
}
