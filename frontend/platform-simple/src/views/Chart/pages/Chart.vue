<template>
  <div class="chart">
    <trigger-chart :apiKey="apiKey" :fieldId="id"></trigger-chart>
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
export default class Chart extends mixins(mixin.Utils) {
  /* props */
  /* vuex */
  /* data */
  /* computed */
  get apiKey () {
    return this.$route.query.key
  }

  get id () {
    return this.$route.query.id
  }
  /* methods */
  /* lifecycle */
  activated () {
    this.showToast(`${this.apiKey} | ${this.id}`)
  }
}
</script>
