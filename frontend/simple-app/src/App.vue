<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import { Drawer } from 'vux'
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
    Drawer
  },
  computed: {
    ...mapState([
      'drawerVisibility'
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
