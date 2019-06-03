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
      type="password"
    ></v-text-field>
    <div class="account__captcha" ref="captcha">
      <v-btn color="info" block>
        点此显示验证码
      </v-btn>
    </div>
    <v-btn color="primary" class="account__action-btn" block @click="handleClick">{{ loginText[+isLogin] }}</v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
// import {  } from 'vuex-class'
import mixin from '@/mixin'

@Component
export default class Me extends mixins(mixin.UpdateHeader, mixin.UpdateMenu, mixin.Utils) {
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

  captcha = null

  captchaData = null

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
    if (!this.captchaData) {
      this.showToast('请完成验证码')
      return
    }
    if (this.isLogin) {
      this.handleLogin()
    } else {
      this.handleRegister()
    }
  }

  async handleLogin () {
    const data = await this.$axios.post('/common/login', {
      username: this.name,
      password: this.password,
      data: this.captchaData
    })
    if (data) {
      this.$router.push('/home')
      const auth = await this.$axios.get('/user')
      this.$store.commit('setAuth', auth)
    }
  }

  async handleRegister () {
    const data = await this.$axios.post('/common/register', {
      username: this.name,
      password: this.password,
      data: this.captchaData
    })
    if (data) {
      this.showToast('注册成功，请登陆')
      this.isLogin = true
      this.$router.push('/home')
      const auth = await this.$axios.get('/user')
      this.$store.commit('setAuth', auth)
    }
  }

  async onCaptcha (payload: any) {
    this.captchaData = payload
  }

  /* lifecycle */
  activated () {
    const TencentCaptcha = (window as any).TencentCaptcha
    this.captcha = new TencentCaptcha(this.$refs.captcha, '2095678355', this.onCaptcha)
  }

  deactivated () {
    this.captcha = null
    this.captchaData = null
  }
}
</script>

<style lang="scss" scoped>
.account {
  padding: 1rem;

  &__input {

  }
}
</style>
