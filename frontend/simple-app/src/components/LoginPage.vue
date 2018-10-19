<template>
  <div>
    <group title="用户信息">
      <x-input title="账号" v-model="username" :required="false"></x-input>
      <x-input title="密码" v-model="password" type="password" :required="false"></x-input>

    </group>
    <box gap="10px 10px">
      <x-button type="primary" link="/demo">登陆</x-button>
    </box>
  </div>
</template>

<script>
import { Group, Cell, XInput, XButton, Box } from 'vux'
import mixin from '@/mixin'

export default {
  mixins: [mixin.updateBar],
  components: {
    Group,
    Cell,
    XInput,
    XButton,
    Box
  },
  data () {
    return {
      title: '用户登陆',
      username: '',
      password: ''
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
