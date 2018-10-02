const _public = require('./public')

module.exports = (router, prefix) => {
  _public(router, prefix + '/public')
}
