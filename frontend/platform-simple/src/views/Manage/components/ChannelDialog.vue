<template>
  <div class="add-item-dialog" flex="dir:top">
    <div>
      <v-text-field
        v-model="name"
        label="名称"
      ></v-text-field>
    </div>
    <div>
      <v-switch v-model="privateFlag" color="info" :label="privateFlag ? '私有': '公开'"></v-switch>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
// import { mixins } from 'vue-class-component'
// import {  } from 'vuex-class'
// import mixin from '@/mixin'

@Component
export default class AddItemDialog extends Vue {
  /* props */
  /* vuex */
  /* data */
  name = ''

  privateFlag = false
  /* computed */
  /* methods */
  collect () {
    return {
      name: this.name,
      privateFlag: this.privateFlag
    }
  }
  /* lifecycle */
}
</script>

<style>

</style>
