<template>
  <ve-line :data="chartData" :settings="chartSettings"></ve-line>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
// import {  } from 'vuex-class'
import mixin from '@/mixin'
import MQTT from 'async-mqtt'
import { VeLine } from 'v-charts/lib/index.esm'
import moment from 'moment'

@Component({
  components: {
    VeLine
  }
})
export default class TriggerChart extends Vue {
  /* props */
  @Prop(String)
  readonly apiKey!: string

  @Prop(String)
  readonly fieldId !: string
  /* vuex */
  /* data */
  server = 'mqtt.dioty.co'
  port = 8080
  client: any = null
  root = '/erioifpud.cn@gmail.com/'

  chartSettings = {
    labelMap: {
      'date': '日期',
      'data': '数据'
    }
  }

  points: Array<any> = []

  chartData = {
    columns: ['date', 'data'],
    rows: []
  }
  /* computed */
  get link () {
    return `mqtt://${this.server}:${this.port}`
  }

  get topic () {
    return `${this.apiKey}|${this.fieldId}`
  }
  /* methods */
  formatDate (dateStr: string) {
    return moment(new Date(dateStr)).format('HH:mm:ss')
  }

  async initChart () {
    await this.initHistoryPoints()

    var options = {
      // clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
      username: 'erioifpud.cn@gmail.com',
      password: '9c8e3810'
    }
    this.client = MQTT.connect(this.link, options)
    this.client.on('connect', async () => {
      console.log('connected')
      await this.client.subscribe(this.root + this.topic)
      this.client.on('message', (topic: string, message: string) => {
        console.log(topic, message)
        this.addPoint(message.toString())
      })
    })
  }

  async initHistoryPoints () {
    let params = {
      id: this.fieldId,
      start: undefined,
      desc: true
    }
    // this.newestDate && (params.start = +this.newestDate)
    const data = await this.$axios.get('/datapoint/', {
      params,
      headers: {
        'api-key': this.apiKey
      }
    })
    if (!data) {
      return
    }
    const points = (data as any).datapoints
    this.points.splice(0, points.length)
    this.points = this.points.concat(points)
    this.points.reverse()

    this.$set(this.chartData, 'rows', this.points.map((point: any) => {
      return {
        'date': this.formatDate(point.createdAt),
        'data': point.value
      }
    }))
  }

  addPoint (points: string) {
    if (this.points.length >= 10) {
      this.points.shift()
    }
    console.log(points)
    const [createdAt, value] = points.split('|')
    this.points.push({
      createdAt,
      value
    })

    this.$set(this.chartData, 'rows', this.points.map((point: any) => {
      return {
        'date': this.formatDate(point.createdAt),
        'data': point.value
      }
    }))
  }

  async destroyChart () {
    if (this.client) {
      await this.client.unsubscribe(this.topic)
      await this.client.end()
      this.client = null
    }
  }
  /* lifecycle */
  async mounted () {
    if (this.apiKey && this.fieldId) {
      await this.initChart()
    }
    // console.log('init')
  }

  beforeDestroy () {
    this.destroyChart()
    // console.log('destroy')
  }
}
</script>

<style>

</style>
