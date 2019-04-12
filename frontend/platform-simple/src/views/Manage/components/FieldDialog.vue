<template>
  <div class="add-item-dialog" flex="dir:top">
    <div>
      <v-text-field
        v-model="name"
        label="名称"
      ></v-text-field>
    </div>
    <div>
      <v-text-field
        v-model="unitName"
        label="单位"
      ></v-text-field>
    </div>
    <div>
      <v-text-field
        v-model="unit"
        label="单位符号"
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
  name = ''

  unitName = ''

  unit = ''
  /* computed */
  /* methods */
  collect () {
    return {
      name: this.name,
      unit: this.unit,
      unitName: this.unitName
    }
  }
  /* lifecycle */
}
</script>

<style>

</style>
