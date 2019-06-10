<template>
  <div class="point-dialog" flex="dir:top">
    <div>
      <v-slider
        thumb-label
        v-model="value"
      ></v-slider>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
// import {  } from 'vuex-class'
import mixin from '@/mixin'

@Component
export default class PointDialog extends Vue {
  /* props */
  /* vuex */
  /* data */
  value = 50
  /* computed */
  /* methods */
  collect () {
    return {
      value: this.value
    }
  }
  /* lifecycle */
}
</script>

<style>

</style>
