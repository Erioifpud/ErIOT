<template>
  <div class="docs">
    <vue-markdown :source="content">Nothing...</vue-markdown>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
// import {  } from 'vuex-class'
import mixin from '@/mixin'
import VueMarkdown from 'vue-markdown'

@Component({
  components: {
    VueMarkdown
  }
})
export default class Docs extends mixins(mixin.UpdateHeader) {
  /* props */
  /* vuex */
  /* data */
  header = {
    title: '文档'
  }

  content = ''
  /* computed */
  /* methods */
  /* lifecycle */
  async activated () {
    const data = await this.$axios.get('/docs')
    if (data) {
      this.content = data.content
    }
  }
}
</script>

<style lang="scss" scoped>
.docs {
  height: 100%;
  text-align: left;
  padding: 1rem;
}
</style>
