const mqtt = require('mqtt')
const mqttConfig = require('../config/basic.json')

const client = mqtt.connect(mqttConfig.server)

client.on('connect', function () {
  client.subscribe('$pub/+/#', function (err) {
    if (!err) {
      // client.publish('presence', 'Hello mqtt')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  if (/^pub\/\w{64}\/\w+\/\w+$/.test(message.toString())) {

  }
})

const sendMessage = (device, fullPath, message) => {
  client.publish(`sub/${device}/${fullPath}`, message)
}

module.exports = {
  sendMessage
}