<template>
  <div>
    <group title="可操作的客户端">
      <cell v-for="client in clients" :key="client.id" :title="client.name" is-link></cell>
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
      title: 'IoT客户端管理',
      clients: []
    }
  },
  methods: {
    async getClients () {
      const { err, data } = await this.$request('get', 'client', {
        deviceId: this.$route.query.deviceId
      })
      if (err) {
        this.$vux.toast.text(err.result, 'bottom')
        return
      }
      this.clients = data.clients
    }
  },
  async mounted () {
    // await this.getClients()
  }
}
</script>

<style>

</style>
