const mqtt = require('async-mqtt')
const sleep = require('sleep')

const client = mqtt.connect('mqtt://localhost:2994')

async function run(client) {
  client.on('connect', async () => {
    // await this.client.subscribe('pub/livingroom/test/e3e7e0d1749b42055cf0628067efe9caf7a4c5e7a7ad3615c320289fee436d64')
    while (true) {
      const msg = `${(Math.random() * 10).toFixed(2)} ${+new Date()}`
      console.log(msg)
      await client.publish('pub/livingroom/test/e3e7e0d1749b42055cf0628067efe9caf7a4c5e7a7ad3615c320289fee436d64', msg)
      await client.end()
      sleep.msleep(2000)
    }
  })
}

run(client)

// const Client = require('../')

// async function run(client) {
//   while (true) {
//     client.send(`${(Math.random() * 10).toFixed(2)} ${+new Date()}`)
//     client.sleep(2000)
//   }
// }

// const client = new Client({
//   server: 'mqtt://localhost:2994',
//   place: 'livingroom',
//   device: 'test'
// })
// // client.init()
// client.receive((msg) => {
//   console.log(msg.toString())
// })
// console.log(client._channel())
// run(client)

