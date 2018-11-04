<template>
  <XHeader class="header" :title="title" :left-options="{ showBack: !$route.meta.hideBack }">
    <span v-if="$route.meta.hasSetting" slot="right" @click="$store.commit('showSettingDialog')">
      <x-icon type="android-settings" size="22" style="fill: #fff;"></x-icon>
    </span>
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
