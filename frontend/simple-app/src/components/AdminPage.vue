<template>
  <div>
    <group title="视图">
      <popup-picker title="主题" :data="topics" v-model="selectedTopic" :columns="1" placeholder="123"></popup-picker>
    </group>
  </div>
</template>

<script>
import mixin from '@/mixin'
import { PopupPicker, Group } from 'vux'

export default {
  mixins: [mixin.updateBar],
  data () {
    return {
      title: '关系管理',
      topics: [
        {
          name: '权限',
          value: 'permission'
        },
        {
          name: '所有者',
          value: 'owner'
        },
        {
          name: '设备',
          value: 'device'
        }
      ],
      selectedTopic: []
    }
  },
  components: {
    PopupPicker,
    Group
  }
}
</script>

<style>

</style>
