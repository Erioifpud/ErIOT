<template>
  <div class="me-edit">
    <div class="me-edit__inputs" flex="dir:top">
      <div class="me-edit__field">
        <v-text-field
          v-model="password"
          label="旧密码"
          type="password"
        ></v-text-field>
      </div>
      <div class="me-edit__field">
        <v-text-field
          v-model="newPassword"
          label="新密码"
          type="password"
        ></v-text-field>
      </div>
      <div class="me-edit__field">
        <v-text-field
          v-model="num"
          label="学号"
        ></v-text-field>
      </div>
      <div class="me-edit__field">
        <v-text-field
          v-model="sckey"
          label="SCKEY"
          placeholder="从ServerChan获取"
        ></v-text-field>
      </div>
      <v-btn class="me-edit__confirm" color="primary" @click="handleConfirm">确定</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { State } from 'vuex-class'
import mixin from '@/mixin'

@Component({
  name: 'me-edit'
})
export default class Edit extends mixins(mixin.UpdateHeader, mixin.Utils) {
  /* props */
  /* vuex */
  @State('auth')
  auth: { 'id'?: number, 'name'?: String, 'number'?: number }
  /* data */
  header = {
    title: '编辑',
    leftBtn: {
      icon: 'arrow-back'
    }
  }

  password = ''

  newPassword = ''

  num = ''

  sckey = ''
  /* computed */
  /* methods */
  handleConfirm () {
    if (!this.password) {
      this.showMessageDialog('请填写旧密码')
      return
    }
    if (!this.newPassword && !this.num && !this.sckey) {
      this.showMessageDialog('请填写需要修改的信息')
      return
    }
    const data = this.$axios.put('/user/' + this.auth.id, {
      password: this.password,
      newPassword: this.newPassword,
      number: this.num,
      sckey: this.sckey
    })
    if (data) {
      this.showToast('修改成功')
      this.$router.back()
    }
  }
  /* lifecycle */
}
</script>

<style lang="scss" scoped>
.me-edit {
  height: 100%;

  &__inputs {
    height: 100%;
    padding: 0 1.5rem;
  }

  &__confirm {
    margin-top: 1rem;
  }
}
</style>
