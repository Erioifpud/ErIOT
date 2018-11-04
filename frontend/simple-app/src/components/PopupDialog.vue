<template>
  <x-dialog v-model="settingDialog">
    <div>
      <slot name="content"></slot>
    </div>
    <div class="action-box vux-1px-t">
      <div class="action-confirm vux-1px-r" @click="handleDialogConfirm">确认</div>
      <div class="action-cancel" @click="handleDialogCancel">取消</div>
    </div>
  </x-dialog>
</template>

<script>
import { Cell, XDialog, XInput } from 'vux'
import { mapMutations, mapState } from 'vuex'

export default {
  components: {
    XDialog,
    XInput,
    Cell
  },
  methods: {
    ...mapMutations([
      'closeSettingDialog'
    ]),
    handleDialogConfirm () {
      this.$emit('onConfirm')
      this.closeSettingDialog()
    },
    handleDialogCancel () {
      this.$emit('onCancel')
      this.closeSettingDialog()
    }
  },
  computed: {
    ...mapState([
      'settingDialog'
    ])
  }
}
</script>

<style scoped>
.action-box {
  display: flex;
  height: 2.5rem;
  line-height: 2.5rem;
  font-size: 1rem;
}

.action-confirm {
  flex: 1;
  color: #01b20a;
  line-height: inherit;
}

.action-cancel {
  flex: 1;
  line-height: inherit;
}
</style>
