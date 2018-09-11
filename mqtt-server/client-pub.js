const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost:2994')

client.on('connect', function () {
  client.subscribe('presence', function (err) {
    console.log('connected')
    if (!err) {
      client.publish('presence', 'Hello mqtt 1', {
        qos: 1,
        retain: true
      })
      client.publish('presence', 'Hello mqtt 2', {
        qos: 1,
        retain: true
      })
      client.publish('presence', 'Hello mqtt 3', {
        qos: 1,
        retain: true
      })
      client.publish('presence', 'Hello mqtt 4', {
        qos: 1,
        retain: true
      })
      client.end()
    }
  })
})