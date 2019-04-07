const { Channel } = require('../')

module.exports = {
  findReleatedUserByKey (value, key) {
    return Channel.where({ [key]: value }).fetch({ withRelated: ['user'] })
      .then(channel => ({
        user: channel && channel.related('user') || undefined,
        channel: channel || undefined
      }))
  },
  findByApiKey (key) {
    return Channel.where({ key }).fetch()
  },
  findAllByUserId(id) {
    return Channel.fetchAll({ withRelated: ['user'] })
      .then(result => {
        return result.models.filter(channel => +channel.get('user_id') === +id)
      })
  },
  findByKey (value, key) {
    return Channel.forge({ [key]: value }).fetch()
  },
  create (options) {
    const channel = new Channel(options)
    return channel.save()
  },
  // findReleatedFieldsByKey (value, key) {
  //   return Channel.where({ [key]: value }).fetch({ withRelated: ['fields'] })
  //     .then(channel => channel.related('fields'))
  // },
}