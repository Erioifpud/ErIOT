<template>
  <div v-transfer-dom>
    <x-dialog v-model="state">
      <div>
        <cell title="添加数据点"></cell>
        <group>
          <x-switch :title="`${isSwitch ? '开关' : '数值'}`" v-model="isSwitch"></x-switch>
          <x-switch v-if="isSwitch" title="状态" v-model="switchValue"></x-switch>
          <x-number v-else title="数据" v-model="sensorValue" fillable></x-number>
        </group>
      </div>
      <div class="action-box vux-1px-t">
        <div class="action-confirm vux-1px-r" @click="handleDialogConfirm">确认</div>
        <div class="action-cancel" @click="$emit('update:state', false)">取消</div>
      </div>
    </x-dialog>
  </div>
</template>

<script>
import { XDialog, TransferDom, XSwitch, Cell, XNumber, Group } from 'vux'
export default {
  components: {
    XDialog,
    XSwitch,
    Cell,
    XNumber,
    Group
  },
  data () {
    return {
      isSwitch: true,
      switchValue: false,
      sensorValue: 0
    }
  },
  directives: {
    TransferDom
  },
  props: {
    state: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleDialogConfirm () {
      this.$emit('onConfirm', this.isSwitch ? Number(this.switchValue) : this.sensorValue)
      this.$emit('update:state', false)
    }
  }
}
</script>

<style>
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
