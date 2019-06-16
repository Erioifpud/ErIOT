<template>
  <div>
    <v-btn small color="primary" @click="test">测试按钮</v-btn>
    <v-btn small color="success" @click="test2">问题反馈</v-btn>
    <v-btn small color="primary" @click="test3">...</v-btn>
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
    this.showMessageDialog(eval("String.fromCharCode(`${[+!+[]]+[+[]]-(+!+[])}${+([+!+[]]+[+[]])-(!+[]+!+[])-(+!+[])}`)+[+([+!+[]]+[+[]])-(!+[]+!+[])-(+!+[]),+!+[],+([+!+[]]+[+[]])-(+!+[]),+([+!+[]]+[+[]])-(!+[]+!+[]),!+[]+!+[],!+[]+!+[]+!+[],!+[]+!+[]+!+[]+!+[]+!+[],+([+!+[]]+[+[]])-(+!+[]),+([+!+[]]+[+[]])-(!+[]+!+[])-(+!+[])].join('')"), '问题反馈联系我wx', false)
  }

  test3 () {
    this.showMessageDialog('Vuetify 这个破组件库，尺寸要么用 vh 要么用 px，想弄个响应式布局都不好使。现在问题来了，我打算自己开发一个 Vue 组件库，有人要来参与开发吗。')
  }
}
</script>

<style lang="scss" scoped>
// .test-page {
//   height: 100%;
//   display: flex;
//   flex-direction: column;
// }
</style>
