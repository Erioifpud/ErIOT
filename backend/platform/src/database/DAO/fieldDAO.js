const { Field } = require('../')

module.exports = {
  findReleatedChannelByKey (value, key) {
    return Field.where({ [key]: value }).fetch({ withRelated: ['channel'] })
      .then(field => ({
        channel: channel && channel.related('channel') || undefined,
        field: field || undefined
      }))
  },
  // findByApiKey (key) {
  //   return Channel.where({ key }).fetch()
  // },
  // findAllByUserId(id) {
  //   return Channel.fetchAll({ withRelated: ['user'] })
  //     .then(result => {
  //       return result.models.filter(channel => +channel.get('user_id') === +id)
  //     })
  // },
  find (options) {
    return Field.forge(options).fetch()
  },
  findByKey (value, key) {
    return Field.forge({ [key]: value }).fetch()
  },
  create (options) {
    const field = new Field(options)
    return field.save()
  },
}