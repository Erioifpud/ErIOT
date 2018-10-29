<template>
  <div>
    <group title="可操作的内容">
      <cell
        v-for="item in list"
        :key="item.id"
        :title="item.name"
        is-link
        :link="toLink(item)"
      >
      </cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
import mixin from '@/mixin'
import { mapMutations, mapState } from 'vuex'

export default {
  mixins: [mixin.updateBar],
  components: {
    Group,
    Cell
  },
  data () {
    return {
      title: 'IoT控制',
      places: []
    }
  },
  computed: {
    ...mapState([
      'userData'
    ]),
    list () {
      if (!this.userData) {
        return []
      }
      const query = this.$route.query
      const { level } = query
      const [placeId, deviceId, clientId] = (level || '').split('|')
      if (placeId && !deviceId && !clientId) {
        return this.userData.places.find(item => item.id === parseInt(placeId)).devices
      }
      if (placeId && deviceId && !clientId) {
        return this.userData.places.find(item => item.id === parseInt(placeId)).devices.find(item => item.id === parseInt(deviceId)).clients
      }
      return this.userData.places
    }
  },
  methods: {
    ...mapMutations([
      'setUserData'
    ]),
    appendLevel (level) {
      const arr = this.$route.query.level ? this.$route.query.level.split('|') : []
      arr.push(level)
      return arr.join('|')
    },
    async getPlaces () {
      const { err, data } = await this.$request('get', 'userData')
      if (err) {
        this.$vux.toast.text(err.result, 'bottom')
        return
      }
      this.setUserData(data)
    },
    toLink (item) {
      if (this.$route.query.level && this.$route.query.level.length >= 3) {
        return {
          name: 'DataPage',
          query: {
            clientId: item.id
          }
        }
      }
      return {
        name: 'ControlPage',
        query: {
          level: this.appendLevel(item.id)
        }
      }
    }
  },
  mounted () {
    this.getPlaces()
  }
}
</script>

<style>
</style>
