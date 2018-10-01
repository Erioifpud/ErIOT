const Router = require('koa-router')
const router = new Router()
const v1 = require('./v1')

v1(router, '/v1')

module.exports = router