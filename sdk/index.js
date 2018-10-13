const mqtt = require('async-mqtt')
const {
  machineIdSync
} = require('node-machine-id')

const machineId = machineIdSync()
// TODO: 改成Promise
class Client {
  constructor(options) {
    this.options = options || {}
    this.client = mqtt.connect(this.options.server)
    this.client.subscribe(this._channel('sub'))
  }

  _init() {
    this.client.on('connect', async () => {
      console.log(`${this._channel()} connected!`)
      // await this.client.subscribe(this._channel('sub'), (err) => {
      //   if (!err) {
      //     console.log(`${this._channel()} subscribed!`)
      //   }
      // })
    })
  }

  _channel(status) {
    let template = `${machineIdSync()}/${this.options.room}/${this.options.deviceName}`
    if (status !== 'pub' && status !== 'sub') {
      return template
    } else {
      return `${status}/${template}`
    }
  }

  async isConnected() {
    return this.client && this.client.connected
  }

  async send(message) {
    if (this.isConnected()) {
      console.log('sent:', message)
      await this.client.publish(this._channel('pub'), message)
    }
  }

  // @checkConntected()
  // cb(msg)
  async receive(cb) {
    this.client.on('message', (topic, message) => {
      if (this._channel('sub') === topic) {
        cb && cb(message)
      }
    })
    // if (this.isConnected()) {
    //   this.client.subscribe(this._channel('sub'), (err) => {
    //     if (!err) {
    //       this.client.on('message', (topic, message) => {
    //         if (this._channel('sub') === topic) {
    //           cb && cb(message)
    //         }
    //       })
    //     }
    //   })
    // }
  }

  // cb(err)
  async unsub(cb) {
    if (this.isConnected()) {
      await this.client.unsubscribe(this._channel('sub', cb))
    }
  }

  async close() {
    await this.client.end()
  }
}

module.exports = Client