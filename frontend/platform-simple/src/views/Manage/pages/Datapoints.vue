<template>
  <div class="datapoints">
    <ve-line :data="chartData" :settings="chartSettings"></ve-line>
    <v-btn color="info" block @click="handleUpload">上传测试数据</v-btn>
    <v-btn color="success" block @click="handleRefresh">刷新图表</v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { State } from 'vuex-class'
import mixin from '@/mixin'
// import VeLine from 'v-charts/lib/line.common'
import { VeLine } from 'v-charts/lib/index.esm'
import moment from 'moment'
import PointDialog from '@/views/Manage/components/PointDialog.vue'

@Component({
  components: {
    VeLine,
    PointDialog
  }
})
export default class Datapoints extends mixins(mixin.UpdateHeader, mixin.Utils) {
  /* props */
  /* vuex */
  @State('apiKey')
  apiKey: string
  /* data */
  header = {
    title: '数据点',
    leftBtn: {
      icon: 'arrow-back'
    },
    rightBtn: {
      icon: 'information-circle',
      handler: this.showMessageDialog.bind(this, '系统还未完全部署，暂时只能手动进行图表数据的更新。')
    }
  }

  chartSettings = {
    labelMap: {
      'date': '日期',
      'data': '数据'
    }
  }

  chartData = {
    columns: ['date', 'data'],
    rows: []
  }

  field: any = undefined

  points = []

  newestDate: Date | undefined = undefined
  /* computed */
  /* methods */
  // async getApiKey () {
  //   const data = await this.$axios.get('/channel/' + this.$route.params.channelId)
  //   this.apiKey = data.key
  // }

  async getField () {
    const data = await this.$axios.get('/field/' + this.$route.params.fieldId, {
      headers: {
        'api-key': this.apiKey
      }
    })
    if (!data) {
      return
    }
    this.field = data
    // this.chartData.columns[1] = data.name
    this.$set(this.chartSettings, 'labelMap', {
      data: this.field.name
    })
  }

  async refreshDatapoints () {
    let params = {
      id: this.$route.params.fieldId,
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

    this.$set(this.chartData, 'rows', this.points.map((point: any) => {
      return {
        'date': this.formatDate(point.createdAt),
        'data': point.value
      }
    }).reverse())
    this.setNeweastDate()
  }

  handleUpload () {
    this.showComponentDialog((PointDialog as any), '测试数据', false, {
      text: '确认',
      handler: this.handleUploadTestPoint
    })
  }

  async handleUploadTestPoint (payload: any) {
    const data = await this.$axios.post('/datapoint/', {
      id: this.$route.params.fieldId,
      value: payload.value
    }, {
      headers: {
        'api-key': this.apiKey
      }
    })
    if (!data) {
      return
    }
    this.refreshDatapoints()
  }

  setNeweastDate () {
    const length = this.points.length
    if (length) {
      const point: any = this.points[length - 1]
      this.newestDate = new Date(point.createdAt)
    }
  }

  async getNewPoints () {
    const data = await this.$axios.get('/datapoint/', {
      params: {
        id: this.$route.params.fieldId
      },
      headers: {
        'api-key': this.apiKey
      }
    })
  }

  formatDate (dateStr: string) {
    return moment(new Date(dateStr)).format('HH:mm:ss')
  }

  handleRefresh () {
    this.refreshDatapoints()
  }

  // resetAll () {
  //   this.$set(this.chartData, 'rows', [])
  //   this.field = undefined
  //   this.newestDate = undefined
  // }
  /* lifecycle */
  activated () {
    if (!this.apiKey) {
      this.$router.push('/')
    }
    this.getField()
    // this.refreshDatapoints()
  }

  deactivated () {
    this.$destroy()
  }
}
</script>

<style lang="scss" scoped>
.datapoints {
  padding: 1rem;
  position: relative;
  overflow: auto;
}
</style>
