<template>
  <div v-transfer-dom>
    <x-dialog v-model="state" class="dialog-demo">
      <div class="img-box">
        <img src="https://ws1.sinaimg.cn/large/663d3650gy1fq6824ur1dj20ia0pydlm.jpg" style="max-width:100%">
      </div>
      <div @click="$emit('update:state', false)">
        <span class="vux-close">123</span>
        456
      </div>
    </x-dialog>
  </div>
</template>

<script>
import { XDialog, TransferDom } from 'vux'
export default {
  components: {
    XDialog
  },
  directives: {
    TransferDom
  },
  props: {
    state: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style>

</style>
