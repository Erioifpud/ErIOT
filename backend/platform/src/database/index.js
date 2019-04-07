const databaseInfo = require('../../config/database')
const knex = require('knex')(databaseInfo)
const bookshelf = require('bookshelf')(knex)

// plugins
// case converter 冲突
// bookshelf.plugin('case-converter')
bookshelf.plugin(require('bookshelf-secure-password'))

const User = bookshelf.Model.extend({
  tableName: 'user',
  hasSecurePassword: true,
  channels: function () {
    return this.hasMany(Channel)
  }
})

const Channel = bookshelf.Model.extend({
  tableName: 'channel',
  fields: function () {
    return this.hasMany(Field)
  },
  user: function () {
    return this.belongsTo(User)
  }
})

const Field = bookshelf.Model.extend({
  tableName: 'field',
  points: function () {
    return this.hasMany(Point)
  },
  channel: function () {
    return this.belongsTo(Channel)
  }
})

const Point = bookshelf.Model.extend({
  tableName: 'point'
})

module.exports = {
  User,
  Channel,
  Field,
  Point
}