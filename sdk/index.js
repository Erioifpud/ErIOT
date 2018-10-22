const mqtt = require('async-mqtt')
const { machineIdSync } = require('node-machine-id')
const sleep = require('sleep')

const machineId = machineIdSync()
class Client {
  constructor(options) {
    this.options = options || {}
    this.client = mqtt.connect(this.options.server)
    this.client.subscribe(this._channel('sub'))
  }

  _init() {
    this.client.on('connect', async () => {
      console.log(`${this._channel()} connected!`)
    })
  }

  _channel(status) {
    let template = `${this.options.place}/${this.options.device}/${machineIdSync()}`
    if (status !== 'pub' && status !== 'sub') {
      return template
    } else {
      return `${status}/${template}`
    }
  }

  async isConnected() {
    return this.client && this.client.connected
  }

  send(message) {
    message = message.toString()
    if (this.isConnected()) {
      console.log('sent:', message)
      return this.client.publish(this._channel('pub'), message)
    }
  }

  sleep(ms) {
    sleep.msleep(ms)
  }

  // @checkConntected()
  // cb(msg)
  async receive(cb) {
    this.client.on('message', (topic, message) => {
      if (this._channel('sub') === topic) {
        cb && cb(message)
      }
    })
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