<template>
  <div>
    <group title="可操作的设备">
      <cell
        v-for="device in devices"
        :key="device.id"
        :title="device.name"
        is-link
        :link="{ name: 'ClientPage', query: { deviceId: device.id } }"
      >
      </cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
import mixin from '@/mixin'

export default {
  mixins: [mixin.updateBar],
  components: {
    Group,
    Cell
  },
  data () {
    return {
      title: 'IoT设备管理',
      devices: []
    }
  },
  methods: {
    async getDevices () {
      const { err, data } = await this.$request('get', 'device', {
        placeId: this.$route.query.placeId
      })
      if (err) {
        this.$vux.toast.text(err.result, 'bottom')
        return
      }
      this.devices = data.devices
    }
  },
  async mounted () {
    await this.getDevices()
  }
}
</script>

<style>

</style>
