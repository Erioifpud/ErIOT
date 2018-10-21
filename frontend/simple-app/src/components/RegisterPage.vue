<template>
  <div>
    <group title="用户信息">
      <x-input title="账号" v-model="username" :required="false"></x-input>
      <x-input title="密码" v-model="password" type="password" :required="false"></x-input>

    </group>
    <box gap="10px 10px">
      <x-button type="primary" @click.native="handleRegister">注册</x-button>
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
      title: '用户注册',
      username: '',
      password: ''
    }
  },
  methods: {
    async handleRegister () {

    }
  }
}
</script>

<style>

</style>
