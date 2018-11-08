const mqtt = require('mqtt')

function connect(channel, server, port, place, device, client) {
  
  if ( channel && server && port && place && device && client) {
    return mqtt.connect(`mqtt://${server}:${port}`)
  }
  return undefined
}

function initCanvas(ctx) {
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
        data: [
         
        ],
        label: 'data',
        borderColor: [
          'rgba(26, 188, 156, 0.8)'
        ],
        backgroundColor: [
          'rgba(22, 160, 133, 0.4)'
        ]
      }]
    },
    options: {
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            displayFormats: {
              quarter: 'h:mm a'
            }
          }
        }]
      }
    }
  })
  return chart
}

function updateChart(chart, point) {
  // console.log(point);
  chart.data.datasets[0].data.push(point)
  chart.update()
}

window.onload = () => {
  const points = []
  const ctx = document.querySelector("#chart").getContext('2d')
  const chart = initCanvas(ctx)

  document.querySelector('#connectBtn').addEventListener('click', () => {
    const channel = document.querySelector('#channel').value
    const server = document.querySelector('#server').value
    const port = document.querySelector('#port').value
    const place = document.querySelector('#place').value
    const device = document.querySelector('#device').value
    const client = document.querySelector('#client').value

    const mqttClient = connect(channel, server, port, place, device, client)
    if (!mqttClient) {
      return
    }
    mqttClient.on('connect', () => {
      console.log('connected')
      mqttClient.subscribe(`${channel}/${place}/${device}/${client}`)
      mqttClient.on('message', (topic, payload) => {
        console.log(topic, payload.toString())
        // points.push(parseFloat(payload.toString()))
        // console.log(points)
        const [value, time] = payload.toString().split(' ')
        updateChart(chart, {
          x: new Date(parseInt(time)),
          y: parseFloat(value)
        })
      })
    })
  })
}