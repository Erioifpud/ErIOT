<template>
  <tabbar style="position: fixed;">
    <tabbar-item selected link="/">
      <x-icon type="home" slot="icon"></x-icon>
      <span slot="label">Home</span>
    </tabbar-item>
    <tabbar-item link="/control">
      <x-icon type="wifi" slot="icon"></x-icon>
      <span slot="label">IOT</span>
    </tabbar-item>
    <tabbar-item v-if="roles.includes('admin')" link="/admin">
      <x-icon type="aperture" slot="icon"></x-icon>
      <span slot="label">Admin</span>
    </tabbar-item>
  </tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'

export default {
  data () {
    return {
      roles: []
    }
  },
  components: {
    Tabbar,
    TabbarItem
  },
  async mounted () {
    const { data, err } = await this.$request('get', 'user/role')
    if (!err) {
      this.roles = data.roles.map(item => item.name)
    }
  }
}
</script>

<style>
.vux-x-icon {
  fill: #09BB07;
}
</style>
