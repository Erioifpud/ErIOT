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
app.use(cors())
app.use(authorization({
  whitelist: [/\/api\/common\/*/, { regex: /\/api\/channel\/\d+/, method: 'get' }, /\/api\/docs\/*/]
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
