const Koa = require('koa')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const router = require('./service')
const app = new Koa()

app.use(cors({
  credentials: true
}))
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())


app.listen(3000)
console.log('http://127.0.0.1:3000/')