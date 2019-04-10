<template>
  <div class="account">
    <v-text-field
      v-model="name"
      label="用户名"
      required
      class="account__input"
    ></v-text-field>
    <v-text-field
      v-model="password"
      label="密码"
      required
      class="account__input"
    ></v-text-field>
    <v-btn color="primary" class="account__action-btn" block @click="handleClick">{{ loginText[+isLogin] }}</v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
// import {  } from 'vuex-class'
import mixin from '@/mixin'

@Component
export default class Me extends mixins(mixin.UpdateHeader, mixin.UpdateMenu) {
  /* props */
  /* vuex */
  /* data */
  header = {
    title: '登录/注册',
    rightBtn: {
      icon: 'person',
      handler: this.toggleLoginOrRegister
    }
  }

  menu = {
    show: false
  }

  loginText = ['注册', '登录']

  isLogin = true

  name = ''

  password = ''
  /* computed */
  /* methods */
  toggleLoginOrRegister () {
    this.isLogin = !this.isLogin
  }

  handleClick () {
    if (this.isLogin) {
      this.handleLogin()
    } else {
      this.handleRegister()
    }
  }

  async handleLogin () {
    const data = await this.$axios.post('/common/login', {
      username: this.name,
      password: this.password
    })
    if (data) {
      this.$router.push('/home')
      const auth = await this.$axios.get('/user')
      this.$store.commit('setAuth', auth)
    }
  }

  async handleRegister () {
    await this.$axios.post('/common/register', {
      username: this.name,
      password: this.password
    })
  }
  /* lifecycle */
}
</script>

<style lang="scss" scoped>
.account {
  padding: 1rem;

  &__input {

  }
}
</style>
