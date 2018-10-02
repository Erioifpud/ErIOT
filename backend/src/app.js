const Koa = require('koa')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const jwt = require('koa-jwt')
// const unless = require('koa-unless')
const router = require('./service')
const app = new Koa()

app.use(cors({
  credentials: true
}))
app.use(jwt({ secret: 'd22bd517693f3bf6d15e4766f7df546f' }).unless({ path: [/^\/v\d\/public/] }))
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000)
console.log('http://127.0.0.1:3000/')
