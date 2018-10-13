const mosca = require("mosca")
const setting = require('./setting.json')
const {
  authenticate,
  authorizePublish,
  authorizeSubscribe,
  loadAuthorizer
} = require('./auth')

const redisSetting = {
  type: 'redis',
  redis: require('redis'),
  db: setting.REDIS_DB || 12,
  port: setting.REIDS_PORT || 6379,
  return_buffers: true, // 处理二进制的payload
  host: setting.HOST || "localhost",
  password: setting.PASS || ''
}

const moscaSetting = {
  port: 2994,
  // backend: redisSetting,
  // persistence: {
  //   factory: mosca.persistence.Redis
  // },
  http: {
    port: 2995,
    bundle: true,
    static: "./"
  }
}

var server = new mosca.Server(moscaSetting)

server.on("ready", () => {
  // server.authenticate = authenticate
  // server.authorizePublish = authorizePublish
  // server.authorizeSubscribe = authorizeSubscribe

  // loadAuthorizer('./credentials.json', (err, authorizer) => {
  //   if (err) {
  //     console.error(err)
  //   }

  //   if (authorizer) {
  //     server.authenticate = authorizer.authenticate
  //     server.authorizeSubscribe = authorizer.authorizeSubscribe
  //     server.authorizePublish = authorizer.authorizePublish
  //   }
  // })
  console.log("Mosca server is up and running")
})

server.on("clientConnected", function (client) {
  console.log("Client Connected:", client.id)
})

server.on('published', function (packet, client) {
  console.log('Published', packet.topic, packet.payload)
  // console.log(client.subscriptions)
})

// const persistence = mosca.persistence.Mongo({
//   url: setting.MONGO_URL
// }, function () {
//   console.log('Persistence Ready')
//   persistence.wire(server)
// })