<template>
  <div>
    <v-btn small color="primary" @click="test">Primary</v-btn>
  </div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Vue, Component } from 'vue-property-decorator'
import { Mutation, Action } from 'vuex-class'
import mixin from '@/mixin'

@Component
export default class Test extends mixins(mixin.UpdateHeader, mixin.Utils) {
  header = {
    title: '测试',
    leftBtn: {
      icon: 'arrow-back'
    },
    rightBtn: {
      icon: 'aperture',
      handler: this.test
    }
  }

  test () {
    this.showMessageDialog('123', 'title', true)
  }
}
</script>

<style>

</style>
