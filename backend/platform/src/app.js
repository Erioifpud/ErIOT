const Koa = require('koa')
const app = new Koa()
const router = require('../router')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const koaLogger = require('koa-logger')
const log4js = require('log4js')
const authorization = require('./middleware/authorization')
const renewal = require('./middleware/renewal')
const koaSwagger = require('koa2-swagger-ui')
const MQTT = require('async-mqtt')

global.__src = __dirname

log4js.configure({
  appenders: { 
    dateFile: { type: 'dateFile', filename: 'log/koa.log', pattern: '.yyyy-MM-dd' },
    cli: { type: 'console', layout: { type: 'colored' } }
  },
  categories: { default: { appenders: ['dateFile', 'cli'], level: 'debug' } }
})
 
const logger = log4js.getLogger()


app.use(koaSwagger({
  routePrefix: '/swagger',
  swaggerOptions: {
    url: 'http://localhost:3000/api/docs',
  }
}))
app.use(async (ctx, next) => {
  ctx.logger = logger
  await next()
})
app.use(koaLogger())
app.use(async (ctx, next) => {
  var options = {
    username: 'erioifpud.cn@gmail.com',
    password: '9c8e3810',
  }
  const mqtt = MQTT.connect('mqtt://mqtt.dioty.co:1883', options)
  ctx.state.mqtt = mqtt
  await next()
})
app.use(cors())
app.use(authorization({
  whitelist: [/\/api\/common\/*/, { regex: /\/api\/channel\/\d+/, method: 'get' }, /\/api\/docs\/*/, /\/api\/datapoint\/*/]
}))
app.use(renewal({
  deadline: 1800
}))
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
