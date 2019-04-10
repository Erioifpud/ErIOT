<template>
  <keep-alive :name="exclude">
    <router-view flex-box="1" v-transition></router-view>
  </keep-alive>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
// import { mixins } from 'vue-class-component'
// import {  } from 'vuex-class'
// import mixin from '@/mixin'

@Component
export default class Index extends Vue {
  exclude = []
}
</script>

<style lang="scss" scoped>

</style>
