const Client = require('../')

async function run(client) {
  client.send(`1.5 ${+new Date()}`)
  client.sleep(1000)
  client.send(`2.3 ${+new Date()}`)
  client.sleep(1000)
  client.send(`3.2 ${+new Date()}`)
  client.sleep(1000)
  client.send(`4.7 ${+new Date()}`)
  client.sleep(1000)
  client.close()
}

const client = new Client({
  server: 'mqtt://localhost:2994',
  place: 'livingroom',
  device: 'test'
})
// client.init()
client.receive((msg) => {
  console.log(msg.toString())
})
console.log(client._channel())
run(client)

