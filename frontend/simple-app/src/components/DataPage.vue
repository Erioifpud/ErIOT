<template>
  <div>
    <card >
      <cell class="vux-1px-b" slot="header" title="当前状态">
        <x-button type="primary" mini>添加</x-button>
      </cell>
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-r">
          <span>1130</span>
          <br/>
          数据
        </div>
        <div class="vux-1px-r">
          <span>2018/10/28</span>
          <br/>
          日期
        </div>
        <div class="">
          <span>23:45:37</span>
          <br/>
          时间
        </div>
      </div>
    </card>

    <group title="查询条件">
      <cell title="Default" :inline-desc="limit" primary="content">
        <range :min="1" :max="100" v-model="limit"></range>
      </cell>
      <!-- 最大最小值 -->
      <cell>
        <div slot="title">
          <x-switch title="最小值" v-model="needMin"></x-switch>
        </div>
        <!-- <x-input v-model="min" type="number" :disabled="!needMin" placeholder="min"></x-input> -->
        <x-number title="" v-model="min" fillable></x-number>
      </cell>
      <cell>
        <div slot="title">
          <x-switch title="最大值" v-model="needMax"></x-switch>
        </div>
        <!-- <x-input v-model="max" type="number" :disabled="!needMax" placeholder="max"></x-input> -->
        <x-number title="" v-model="max" fillable></x-number>
      </cell>
      <!-- 日期 -->
      <!-- TODO: state -->
      <cell>
        <div slot="title">
          <x-switch title="起始" v-model="needStartDate"></x-switch>
        </div>
        <datetime-range title="" :start-date="`${new Date().getFullYear()}-01-01`" :end-date="`${new Date().getFullYear()}-12-31`" format="YYYY/MM/DD" v-model="startDate"></datetime-range>
      </cell>
      <cell>
        <div slot="title">
          <x-switch title="终止" v-model="needEndDate"></x-switch>
        </div>
        <datetime-range title="" :start-date="`${new Date().getFullYear()}-01-01`" :end-date="`${new Date().getFullYear()}-12-31`" format="YYYY/MM/DD" v-model="endDate"></datetime-range>
      </cell>
    </group>

    <divider>查询结果</divider>
    <timeline class="timeline">
			<timeline-item>
				<h4 class="recent">【广东】 广州市 已发出</h4>
				<p class="recent">2016-04-17 12:00:00</p>
			</timeline-item>
			<timeline-item>
				<h4> 申通快递员 广东广州 收件员 xxx 已揽件</h4>
				<p>2016-04-16 10:23:00</p>
			</timeline-item>
			<timeline-item>
				<h4> 商家正在通知快递公司揽件</h4>
				<p>2016-04-15 9:00:00</p>
			</timeline-item>
      <timeline-item>
				<h4> 商家正在通知快递公司揽件</h4>
				<p>2016-04-15 9:00:00</p>
			</timeline-item>
      <timeline-item>
				<h4> 商家正在通知快递公司揽件</h4>
				<p>2016-04-15 9:00:00</p>
			</timeline-item>
      <timeline-item>
				<h4> 商家正在通知快递公司揽件</h4>
				<p>2016-04-15 9:00:00</p>
			</timeline-item>
      <timeline-item>
				<h4> 商家正在通知快递公司揽件</h4>
				<p>2016-04-15 9:00:00</p>
			</timeline-item>
		</timeline>
  </div>
</template>

<script>
import mixin from '@/mixin'
import { Card, DatetimeRange, XSwitch, XNumber, Timeline, TimelineItem, Group, Range, Cell, XButton, Divider } from 'vux'
import moment from 'moment'

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
    Divider
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
      endDate: [moment().format('YYYY-MM-DD'), '23', '59']
    }
  },
  methods: {
    async getDataPoints () {
      const { err, data } = await this.$request('get', `client/${this.$route.query.clientId}`)
      if (err) {
        this.$vux.toast.text(err.result, 'bottom')
        return
      }
      console.log(data)
    }
  },
  mounted () {
    this.getDataPoints()
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
