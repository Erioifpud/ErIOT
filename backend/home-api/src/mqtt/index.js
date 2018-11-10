const mqtt = require('mqtt')
const mqttConfig = require('../config/mqtt.json')
const { saveTopicAndMessage } = require('../util/persistence')

const client = mqtt.connect(mqttConfig.server)

client.on('connect', function () {
  client.subscribe('+/#', (err) => {
    if (!err) {
      console.log('mqtt client init!')
    }
  })
})

client.on('message', async (topic, message) => {
  // const re = /^pub\/(?<placeName>\w{64})\/(?<deviceName>\w+)\/(?<clientId>\w+)$/
  const re = /^(\w+)\/(\w+)\/(\w{64})$/
  if (re.test(topic)) {
    console.log('received:', topic, message.toString())
    const [, placeName, deviceName, clientId] = re.exec(topic)
    await saveTopicAndMessage(client.options.clientId, { placeName, deviceName, clientId }, message.toString())
  }
})

const sendMessage = (place, deviceName, clientId, message) => {
  client.publish(`${place}/${deviceName}/${clientId}`, message.toString())
}

module.exports = {
  sendMessage
}
