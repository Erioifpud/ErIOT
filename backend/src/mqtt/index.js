const mqtt = require('mqtt')
const mqttConfig = require('../config/mqtt.json')

const client = mqtt.connect(mqttConfig.server)

client.on('connect', function () {
  client.subscribe('pub/+/#', (err) => {
    if (!err) {
      console.log('mqtt client init!')
    }
  })
})

client.on('message', (topic, message) => {
  if (/^pub\/\w{64}\/\w+\/\w+$/.test(topic)) {
    console.log(topic)
    console.log(message.toString())
  }
})

const sendMessage = (clientId, room, deviceName, message) => {
  client.publish(`sub/${clientId}/${room}/${deviceName}`, message)
}

module.exports = {
  sendMessage
}