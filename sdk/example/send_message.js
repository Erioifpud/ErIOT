const Client = require('../')

const client = new Client({
  server: 'mqtt://localhost:2994',
  room: 'livingroom',
  deviceName: 'test'
})
// client.init()
client.receive((msg) => {
  console.log(msg.toString())
})
client.send('test msg')
client.send('test msg2')
client.close()
