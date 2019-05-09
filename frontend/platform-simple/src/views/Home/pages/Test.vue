<template>
  <div>
    <v-btn small color="primary" @click="test">莫名其妙的按钮</v-btn>
    <v-btn small color="success" @click="test2">联系方式</v-btn>
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
    this.showMessageDialog('大白菜', '胡萝卜🥕', true)
  }

  test2 () {
    this.showMessageDialog(eval("String.fromCharCode(`${[+!+[]]+[+[]]-(+!+[])}${+([+!+[]]+[+[]])-(!+[]+!+[])-(+!+[])}`)+[+([+!+[]]+[+[]])-(!+[]+!+[])-(+!+[]),+!+[],+([+!+[]]+[+[]])-(+!+[]),+([+!+[]]+[+[]])-(!+[]+!+[]),!+[]+!+[],!+[]+!+[]+!+[],!+[]+!+[]+!+[]+!+[]+!+[],+([+!+[]]+[+[]])-(+!+[]),+([+!+[]]+[+[]])-(!+[]+!+[])-(+!+[])].join('')"), '有问题联系我wx', false)
  }
}
</script>

<style>

</style>
