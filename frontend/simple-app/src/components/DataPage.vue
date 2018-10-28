<template>
  <div>
    <box gap="1rem 0">
      <card>
        <p slot="header">123</p>
        <flexbox slot="content" :gutter="0">
          <flexbox-item>
            <div class="flex-demo">1</div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">2</div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">3</div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">4</div>
          </flexbox-item>
        </flexbox>
        <!-- <div slot="content" class="card-demo-flex card-demo-content01">
          <div class="vux-1px-r">
            <span>1130</span>
            <br/>
            Point
          </div>
          <div class="vux-1px-r">
            <span>15</span>
            <br/>
            Coupon
          </div>
          <div class="vux-1px-r">
            <span>0</span>
            <br/>
            Gift card
          </div>
          <div>
            <span>88</span>
            <br/>
            Cash
          </div>
        </div> -->
      </card>
    </box>
  </div>
</template>

<script>
import mixin from '@/mixin'
import { Card, Box, Flexbox, FlexboxItem } from 'vux'

export default {
  mixins: [mixin.updateBar],
  components: {
    Card,
    Box,
    Flexbox,
    FlexboxItem
  },
  data () {
    return {
      title: '数据点'
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

.flex-demo {
  text-align: center;
  color: #fff;
  background-color: #20b907;
  border-radius: 4px;
  background-clip: padding-box;
}
</style>
