const { Action } = require('../')

module.exports = {
  findAllByFieldId(id) {
    return Action.fetchAll({ withRelated: ['field'] })
      .then(result => {
        return result.models.filter(actiion => +actiion.get('field_id') === +id)
      })
  },
  find (options) {
    return Action.forge(options).fetch()
  },
  findAll (options) {
    return Action.where(options).fetchAll()
  },
  create (options) {
    const action = new Action(options)
    return action.save()
  },
  destroy (options) {
    return Action.where(options).destroy()
  }
}