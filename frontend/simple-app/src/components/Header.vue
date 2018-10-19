<template>
  <XHeader :title="title" :left-options="{ showBack: !$route.meta.hideBack }">
    <!-- <span v-if="$route.path === '/'" slot="overwrite-left" @click="toggleDrawer">
      <x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
    </span> -->
  </XHeader>
</template>

<script>
import { XHeader } from 'vux'
import { mapMutations, mapState } from 'vuex'

export default {
  methods: {
    ...mapMutations([
      'toggleDrawer'
    ])
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
