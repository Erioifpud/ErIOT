<template>
  <div>
    <div class="vux-demo">
      <!-- <img class="logo" src="../assets/vux_logo.png"> -->
      <x-icon type="cloud" size="80" style="fill:#39495c;position:relative;"></x-icon>
      <h1> </h1>
    </div>
    <group title="用户信息">
      <cell title="编号" :value="user.id"></cell>
      <cell title="用户名" :value="user.username"></cell>
      <cell
        title="角色"
        is-link
        :border-intent="false"
        :arrow-direction="roleCollapsed ? 'up' : 'down'"
        @click.native="roleCollapsed = !roleCollapsed"></cell>
      <template v-if="roleCollapsed">
        <cell-box v-for="role in user.roles" :key="role.id" :border-intent="false" class="sub-item">{{ role.name }}</cell-box>
      </template>
    </group>
  </div>
</template>

<script>
import { Group, Cell, CellBox } from 'vux'
import mixin from '@/mixin'

export default {
  mixins: [mixin.updateBar],
  components: {
    Group,
    Cell,
    CellBox
  },
  data () {
    return {
      user: null,
      roleCollapsed: false
    }
  },
  async mounted () {
    const { data, err } = await this.$request('get', 'user/role')
    if (!err) {
      this.user = data
    }
  }
}
</script>

<style>
.sub-item {
  color: #888;
}

.vux-demo {
  text-align: center;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
