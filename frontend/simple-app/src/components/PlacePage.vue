<template>
  <div>
    <group title="可操作的地点">
      <cell
        v-for="place in places"
        :key="place.id"
        :title="place.name"
        is-link
        :link="{ name: 'DevicePage', query: { placeId: place.id } }"
      ></cell>
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
      title: 'IoT地点管理',
      places: []
    }
  },
  methods: {
    async getPlaces () {
      const { err, data } = await this.$request('get', 'place')
      if (err) {
        this.$vux.toast.text(err.result, 'bottom')
        return
      }
      this.places = data.places
    }
  },
  async mounted () {
    await this.getPlaces()
  }
}
</script>

<style>

</style>
