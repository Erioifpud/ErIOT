<template>
  <div class="me">
    <v-container grid-list-md>
      <v-layout column wrap>
        <v-flex xs12 sm6 md8 align-center justify-center layout text-xs-center>
          <v-avatar
            :size="100"
            color="grey lighten-4"
          >
            <img src="/img/8306955.png" alt="avatar">
          </v-avatar>
        </v-flex>

        <template v-if="Object.keys(auth).length">
          <!-- <v-flex xs12 sm6 md8 align-center justify-center layout text-xs-center>
            <v-label>用户ID: </v-label>
            <v-label>{{ auth.id }}</v-label>
          </v-flex> -->
          <div flex="main:justify box:mean cross:center">
            <span>用户ID: </span>
            <span>{{ auth.id }}</span>
          </div>
          <div flex="main:justify box:mean cross:center">
            <span>用户名: </span>
            <span>{{ auth.name }}</span>
          </div>
          <div flex="main:justify box:mean cross:center">
            <span>学号: </span>
            <span>{{ auth.number || '空' }}</span>
          </div>
          <div flex="main:justify box:mean cross:center">
            <span>SCKEY: </span>
            <span>{{ auth.sckey ? '已填写' : '未填写' }}</span>
          </div>
        </template>

      </v-layout>
      <v-btn color="error" class="me__logout-btn" block @click="handleClick">注销</v-btn>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { State } from 'vuex-class'
import mixin from '@/mixin'

@Component
export default class Me extends mixins(mixin.UpdateHeader) {
  /* props */
  /* vuex */
  @State('auth')
  auth: { 'id'?: number, 'name'?: String, 'number'?: number }
  /* data */
  header = {
    title: '我的',
    rightBtn: {
      icon: 'create',
      handler: this.showEditPage
    }
  }
  /* computed */
  /* methods */
  showEditPage () {
    this.$router.push('/me/edit')
  }
  /* lifecycle */
  activated () {
    this.$nextTick(async () => {
      const auth = await this.$axios.get('/user')
      this.$store.commit('setAuth', auth)
    })
  }

  handleClick () {
    this.$store.commit('setAuth', {})
    this.$router.push('/login')
  }
}
</script>

<style lang="scss" scoped>

</style>
