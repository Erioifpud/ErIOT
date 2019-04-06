const { User } = require('../')
const md5 = require('md5')

module.exports = {
  login (name, password) {
    return User.forge({ name })
      .fetch()
      .then(user => {
        return user.authenticate(password)
      })
  },
  register (name, password) {
    const user = new User({
      name,
      password,
      secret: md5(`${name}${+new Date()}`),
      admin_flag: false
    })
    return user.save()
  },
  findByKey (value, key) {
    return User.forge({ [key]: value }).fetch()
  },
  find (options) {
    return User.forge(options).fetch()
  }
}