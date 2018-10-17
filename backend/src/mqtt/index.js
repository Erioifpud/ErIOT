const mqtt = require('mqtt')
const mqttConfig = require('../config/mqtt.json')
const { saveTopicAndMessage } = require('../util/persistence')

const client = mqtt.connect(mqttConfig.server)

client.on('connect', function () {
  client.subscribe('pub/+/#', (err) => {
    if (!err) {
      console.log('mqtt client init!')
    }
  })
})

client.on('message', async (topic, message) => {
  // const re = /^pub\/(?<placeName>\w{64})\/(?<deviceName>\w+)\/(?<clientId>\w+)$/
  const re = /^pub\/(\w+)\/(\w+)\/(\w{64})$/
  if (re.test(topic)) {
    console.log('received:', topic, message.toString())
    const [_, placeName, deviceName, clientId] = re.exec(topic)
    await saveTopicAndMessage({ placeName, deviceName, clientId }, message.toString())
  }
})

const sendMessage = (clientId, room, deviceName, message) => {
  client.publish(`sub/${clientId}/${room}/${deviceName}`, message)
}

module.exports = {
  sendMessage
}