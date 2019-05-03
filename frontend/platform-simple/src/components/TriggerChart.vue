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
  server = 'test.mosca.io'
  port = 80
  client: any = null

  chartSettings = {
    labelMap: {
      'date': '日期',
      'data': '数据'
    }
  }

  points: Array<number> = []

  chartData = {
    columns: ['date', 'data'],
    rows: []
  }
  /* computed */
  get link () {
    return `tcp://${this.server}:${this.port}`
  }

  get topic () {
    return `${this.apiKey}|${this.fieldId}`
  }
  /* methods */
  formatDate (dateStr: string) {
    return moment(new Date(dateStr)).format('HH:mm:ss')
  }

  async initChart () {
    this.client = MQTT.connect(this.link)
    await this.client.subscribe(this.topic)
    this.client.on('message', (topic: string, message: string) => {
      const point = parseInt(message.toString())
      if (!isNaN(point)) {
        this.addPoint(point)
      }
    })
  }

  addPoint (points: number) {
    this.points.shift()
    this.points.push(points)

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
    this.initChart()
  }

  beforeDestroy () {
    this.destroyChart()
  }
}
</script>

<style>

</style>
