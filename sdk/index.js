const mqtt = require('mqtt')
const {
  machineIdSync
} = require('node-machine-id')

const machineId = machineIdSync()

class Client {
  constructor(options) {
    this.options = options || {}
    this.client = mqtt.connect(this.options.server)
    // this.group = group
    // this.server = server
  }

  _init() {
    this.client.on('connect', () => {
      console.log(`${this._channel()} connected!`)
    })
    this.client.on('reconnect', () => {
      console.log(`${this._channel()} reconnected!`)
    })
  }

  _channel(status) {
    let template = `${this.options.group}|${machineIdSync()}`
    if (status !== 'pub' && status !== 'sub') {
      return template
    } else {
      return `${template}|${status}`
    }
  }

  isConnected() {
    return this.client && this.client.connected
  }

  pub(message) {
    if (this.isConnected()) {
      this.client.publish(this._channel('pub'), message)
    }
  }

  // @checkConntected()
  // cb(msg)
  sub(cb) {
    if (this.isConnected()) {
      this.client.subscribe(this._channel('sub'), (err) => {
        if (err) {
          throw err
        } else {
          this.client.on('message', (channel, message) => {
            if (this._channel('sub') === channel) {
              cb && cb(message)
            }
          })
        }
      })
    }
  }

  // cb(err)
  unsub(cb) {
    if (this.isConnected()) {
      this.client.unsubscribe(this._channel('sub', cb))
    }
  }

  close() {
    this.client.end()
  }
}