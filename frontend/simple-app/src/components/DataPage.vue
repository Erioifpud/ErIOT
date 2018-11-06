<template>
  <div>
    <card >
      <cell class="vux-1px-b" slot="header" title="当前状态">
        <x-button type="primary" mini @click.native="handleShowAddDialog">添加</x-button>
      </cell>
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-r">
          <span>{{ latest.data }}</span>
          <br/>
          数据
        </div>
        <div class="vux-1px-r">
          <span>{{ sqlDate(latest.createdAt).format('YYYY/MM/DD') }}</span>
          <br/>
          日期
        </div>
        <div class="">
          <span>{{ sqlDate(latest.createdAt).format('HH:mm:ss') }}</span>
          <br/>
          时间
        </div>
      </div>
    </card>

    <group title="查询条件">
      <cell title="界限" :inline-desc="limit" primary="content">
        <range :min="1" :max="100" v-model="limit"></range>
      </cell>
      <!-- 排序 -->
      <cell title="排序" :inline-desc="desc ? '降序' : '升序'" primary="content">
        <x-switch title="" v-model="desc"></x-switch>
      </cell>
      <!-- 最大最小值 -->
      <cell>
        <div slot="title">
          <x-switch title="最小值" style="padding-left: 0" v-model="needMin"></x-switch>
        </div>
        <!-- <x-input v-model="min" type="number" :disabled="!needMin" placeholder="min"></x-input> -->
        <x-number title="" style="padding-right: 0" v-model="min" fillable></x-number>
      </cell>
      <cell>
        <div slot="title">
          <x-switch title="最大值" style="padding-left: 0" v-model="needMax"></x-switch>
        </div>
        <!-- <x-input v-model="max" type="number" :disabled="!needMax" placeholder="max"></x-input> -->
        <x-number title="" style="padding-right: 0" v-model="max" fillable></x-number>
      </cell>
      <!-- 日期 -->
      <cell>
        <div slot="title">
          <x-switch title="起始" style="padding-left: 0" v-model="needStartDate"></x-switch>
        </div>
        <datetime-range title="" :start-date="`${new Date().getFullYear()}-01-01`" :end-date="`${new Date().getFullYear()}-12-31`" format="YYYY/MM/DD" v-model="startDate"></datetime-range>
      </cell>
      <cell>
        <div slot="title">
          <x-switch title="终止" style="padding-left: 0" v-model="needEndDate"></x-switch>
        </div>
        <datetime-range title="" :start-date="`${new Date().getFullYear()}-01-01`" :end-date="`${new Date().getFullYear()}-12-31`" format="YYYY/MM/DD" v-model="endDate"></datetime-range>
      </cell>
    </group>

    <box gap="0.625rem 0.625rem">
      <x-button type="primary" @click.native="search">搜索</x-button>
    </box>

    <divider>查询结果</divider>
    <timeline class="timeline">
			<timeline-item v-for="(point, i) in datapoints" :key="i">
				<!-- <h4 class="recent">序号: {{ index }}</h4> -->
				<h4 class="recent">{{ point.data }}</h4>
				<p class="recent">{{ sqlDate(point.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</p>
			</timeline-item>
		</timeline>
    <add-point-dialog :state.sync="showAddDialog" @onConfirm="handleAddPoint"></add-point-dialog>
    <popup-dialog @onConfirm="handleSettingConfirm">
      <div slot="content">
        <cell title="客户端设置"></cell>
        <x-input class="vux-1px-t" title="名称" v-model="newName" :placeholder="clientName"></x-input>
      </div>
    </popup-dialog>
  </div>
</template>

<script>
import mixin from '@/mixin'
import {
  Card,
  DatetimeRange,
  XSwitch,
  XNumber,
  Timeline,
  TimelineItem,
  Group,
  Range,
  Cell,
  XButton,
  Divider,
  Box,
  TransferDom,
  XDialog,
  XInput
} from 'vux'
import moment from 'moment'
import AddPointDialog from './AddPointDialog'
import PopupDialog from './PopupDialog'

export default {
  mixins: [mixin.updateBar],
  components: {
    Card,
    DatetimeRange,
    XSwitch,
    XNumber,
    Timeline,
    TimelineItem,
    Group,
    Range,
    Cell,
    XButton,
    Divider,
    Box,
    TransferDom,
    XDialog,
    AddPointDialog,
    PopupDialog,
    XInput
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      title: '数据点',
      limit: 10,
      needMin: false,
      min: 0,
      needMax: false,
      max: 0,
      needStartDate: false,
      startDate: [moment().format('YYYY-MM-DD'), '00', '00'],
      needEndDate: false,
      endDate: [moment().format('YYYY-MM-DD'), '23', '59'],
      datapoints: [],
      latest: {},
      showAddDialog: false,
      newName: '',
      clientName: '',
      desc: true
    }
  },
  methods: {
    handleAddPoint (value) {
      console.log(123)
      this.addPoint(value)
    },
    handleSettingConfirm () {
      this.updateName(this.newName)
    },
    async updateName (newName) {
      const { data, err } = await this.$request('put', `client/${this.$route.query.clientId}`, {
        name: newName
      })
      if (err) {
        this.$vux.toast.text(err.result, 'bottom')
        return
      }
      const [result] = data.result
      this.$vux.toast.text(result ? '修改成功' : '修改失败', 'bottom')
    },
    async addPoint (value) {
      const { err } = await this.$request('post', `client/${this.$route.query.clientId}`, {
        value
      })
      if (err) {
        this.$vux.toast.text(err.result, 'bottom')
        return
      }
      this.$vux.toast.text('添加成功', 'bottom')
      this.refreshAll()
    },
    search () {
      this.refreshAll()
    },
    handleShowAddDialog () {
      this.showAddDialog = true
    },
    formatDateArr (dateArr) {
      const [date, hour, minute] = dateArr
      return `${date} ${hour}:${minute}`
    },
    sqlDate (date) {
      return moment(new Date(date))
    },
    async getLatest () {
      const { err, data } = await this.$request('get', `client/${this.$route.query.clientId}/latest`)
      if (err) {
        this.$vux.toast.text(err.result, 'bottom')
        return
      }
      const [result] = data.datapoints.length === 0 ? [{
        data: NaN,
        createdAt: 0
      }] : data.datapoints
      this.latest = result
      this.initClientName(data.name)
    },
    initClientName (name) {
      this.clientName = name
    },
    refreshAll () {
      this.getDataPoints()
      this.getLatest()
    },
    async getDataPoints () {
      const params = {
        limit: this.limit,
        order: this.desc ? 'desc' : 'asc'
      }
      if (this.needMin) {
        params.min = this.min
      }
      if (this.needMax) {
        params.max = this.max
      }
      if (this.needStartDate) {
        params.start = this.formatDateArr(this.startDate)
      }
      if (this.needEndDate) {
        params.end = this.formatDateArr(this.endDate)
      }
      const { err, data } = await this.$request('get', `client/${this.$route.query.clientId}`, params)
      if (err) {
        this.$vux.toast.text(err.result, 'bottom')
        return
      }
      this.datapoints = data.datapoints
      this.initClientName(data.name)
    }
  },
  mounted () {
    this.refreshAll()
  }
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';

.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}

.timeline {
	p {
		color: #888;
		font-size: 0.8rem;
	}
	h4 {
		color: #666;
		font-weight: normal;
	}
	.recent {
		color: rgb(4, 190, 2)
	}
}
</style>
