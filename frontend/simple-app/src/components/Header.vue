<template>
  <XHeader class="header" :title="title" :left-options="{ showBack: !$route.meta.hideBack }">
    <!-- <span v-if="$route.path === '/login'" slot="right" @click="toRegister">
      <p>注册</p>
    </span> -->
  </XHeader>
</template>

<script>
import { XHeader } from 'vux'
import { mapState } from 'vuex'

export default {
  methods: {
    toRegister () {
      this.$router.push('/register')
    }
  },
  components: {
    XHeader
  },
  computed: {
    ...mapState([
      'title'
    ])
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  width: 100%;
  z-index: 1010;
}
</style>
