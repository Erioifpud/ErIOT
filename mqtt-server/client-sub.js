var mqtt = require('mqtt')

var client = mqtt.connect('mqtt://localhost:2994')

client.subscribe('presence', {
  qos: 1
})

client.on('message', function (topic, message) {
  console.log(message)
})