<template>
  <div>
    <group title="用户信息">
      <x-input title="账号" v-model="username" :required="false"></x-input>
      <x-input title="密码" v-model="password" type="password" :required="false"></x-input>

    </group>
    <box gap="10px 10px">
      <x-button type="primary" @click.native="handleLogin">登陆</x-button>
      <x-button type="default" @click.native="handleRegister">注册</x-button>
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
  },
  methods: {
    async handleLogin () {
      const { data, err } = await this.$request('post', 'public/login', {
        username: this.username,
        password: this.password
      })
      if (err) {
        this.$vux.toast.text(err.result, 'bottom')
      } else if (data) {
        this.$vux.toast.text('登陆成功', 'bottom')
        this.$router.push('/')
      }
    },
    async handleRegister () {
      const { data, err } = await this.$request('post', 'public/register', {
        username: this.username,
        password: this.password
      })
      if (err) {
        this.$vux.toast.text(err.result, 'bottom')
      } else if (data) {
        this.$vux.toast.text('注册成功', 'bottom')
      }
    }
  }
}
</script>

<style>

</style>
