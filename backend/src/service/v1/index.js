const _public = require('./public')
const test = require('./test')

module.exports = (router, prefix) => {
  _public(router, prefix + '/public')
  test(router, prefix + '/test')
}
