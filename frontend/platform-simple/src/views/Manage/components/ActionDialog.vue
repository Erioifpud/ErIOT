<template>
  <div class="add-item-dialog" flex="dir:top">
    <div>
      <v-combobox
          v-model="code"
          :items="items"
          label="条件"
          item-text="text"
          item-value="value"
        ></v-combobox>
    </div>
    <div>
      <v-text-field
        v-model="threshold"
        label="阈值"
        type="number"
      ></v-text-field>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
// import {  } from 'vuex-class'
import mixin from '@/mixin'

@Component
export default class AddItemDialog extends Vue {
  /* props */
  /* vuex */
  /* data */
  code = ''

  threshold = ''

  items = [
    {
      text: '=',
      value: 0
    },
    {
      text: '<',
      value: 1
    },
    {
      text: '>',
      value: 2
    },
    {
      text: '<=',
      value: 3
    },
    {
      text: '>=',
      value: 4
    }
  ]
  /* computed */
  /* methods */
  collect () {
    return {
      code: this.code,
      threshold: this.threshold
    }
  }
  /* lifecycle */
}
</script>

<style>

</style>
