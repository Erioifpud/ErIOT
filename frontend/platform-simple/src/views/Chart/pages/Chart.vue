<template>
  <div class="chart">
    <trigger-chart apiKey="9c1ba7f4f5847873e88fb03bd84e1bf9" fieldId="11"></trigger-chart>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
// import {  } from 'vuex-class'
import mixin from '@/mixin'
import TriggerChart from '@/components/TriggerChart'

@Component({
  components: {
    TriggerChart
  }
})
export default class Chart extends Vue {
  // header = {
  //   title: '首页'
  // }
}
</script>
