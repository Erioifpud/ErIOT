const Client = require('../')

async function run(client) {
  await client.send(1.5)
  client.sleep(1000)
  await client.send(2.3)
  await client.send(3.2)
  await client.send(4.7)
  await client.close()
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

