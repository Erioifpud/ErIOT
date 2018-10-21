<template>
  <XHeader :title="title" :left-options="{ showBack: !$route.meta.hideBack }">
    <span v-if="$route.path === '/login'" slot="right" @click="toRegister">
      <p>注册</p>
    </span>
  </XHeader>
</template>

<script>
import { XHeader } from 'vux'
import { mapMutations, mapState } from 'vuex'

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

<style>

</style>
