const { Field, Point } = require('../')

module.exports = {
  // findReleatedChannelByKey (value, key) {
  //   return Field.where({ [key]: value }).fetch({ withRelated: ['channel'] })
  //     .then(field => ({
  //       channel: channel && channel.related('channel') || undefined,
  //       field: field || undefined
  //     }))
  // },
  // findByApiKey (key) {
  //   return Channel.where({ key }).fetch()
  // },
  findAllByFieldId(id) {
    return Point.fetchAll({ withRelated: ['field'] })
      .then(result => {
        return result.models.filter(point => +point.get('field_id') === +id)
      })
  },
  find (options) {
    return Point.forge(options).fetch()
  },
  findAll (options, limit, start, end, desc) {
    return Point.forge(options).query(function (qb) {
      start && qb.where('created_at', '>=', new Date(parseInt(start, 10)))
      end && qb.where('created_at', '<', new Date(parseInt(end, 10)))
      desc && qb.orderBy('id', 'DESC')
      qb.limit(limit)
    }).fetchAll()
  },
  // findByKey (value, key) {
  //   return Field.forge({ [key]: value }).fetch()
  // },
  create (options) {
    const point = new Point(options)
    return point.save()
  },
}