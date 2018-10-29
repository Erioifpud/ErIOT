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
        <x-input v-model="min" type="number" :disabled="!needMin" placeholder="min"></x-input>
      </cell>
      <cell>
        <div slot="title">
          <x-switch title="最大值" v-model="needMax"></x-switch>
        </div>
        <x-input v-model="max" type="number" :disabled="!needMax" placeholder="max"></x-input>
      </cell>
      <!-- 日期 -->
      <!-- TODO: state -->
      <cell>
        <div slot="title">
          <x-switch title="起始" v-model="needMin"></x-switch>
        </div>
        <datetime-range title="" start-date="2017-01-01" end-date="2017-02-02" format="YYYY/MM/DD" v-model="startDate"></datetime-range>
      </cell>
      <cell>
        <div slot="title">
          <x-switch title="终止" v-model="needMin"></x-switch>
        </div>
        <datetime-range title="" start-date="2017-01-01" end-date="2017-02-02" format="YYYY/MM/DD" v-model="endDate"></datetime-range>
      </cell>
    </group>

  </div>
</template>

<script>
import mixin from '@/mixin'
import { Card, Box, DatetimeRange, XSwitch, XInput, Timeline, Group, Range, Cell, XButton } from 'vux'

export default {
  mixins: [mixin.updateBar],
  components: {
    Card,
    Box,
    DatetimeRange,
    XSwitch,
    XInput,
    Timeline,
    Group,
    Range,
    Cell,
    XButton
  },
  data () {
    return {
      title: '数据点',
      limit: 10,
      needMin: false,
      min: '',
      needMax: false,
      max: '',
      startDate: ['2017-01-15', '03', '05'],
      endDate: ['2017-01-15', '03', '05']
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
</style>
