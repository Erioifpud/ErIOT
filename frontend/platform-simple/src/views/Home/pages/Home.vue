<template>
  <div class="home">
    这里还没想好要放些什么
    <div>
      <router-link to="/home/test">测试</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
// import {  } from 'vuex-class'
import mixin from '@/mixin'

@Component
export default class Home extends mixins(mixin.UpdateHeader) {
  header = {
    title: '首页'
  }
}
</script>
