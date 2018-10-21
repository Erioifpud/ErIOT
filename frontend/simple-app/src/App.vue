<template>
  <div id="app">
    <div v-transfer-dom>
      <loading :show="loading" text="请稍候..."></loading>
    </div>
    <div>
      <toast></toast>
    </div>
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import { Loading, Toast } from 'vux'
import { mapState } from 'vuex'
import Header from './components/Header'

export default {
  name: 'app',
  data () {
    return {
      // title: '456'
    }
  },
  components: {
    Header,
    Loading,
    Toast
  },
  computed: {
    ...mapState([
      'drawerVisibility',
      'loading'
    ])
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
