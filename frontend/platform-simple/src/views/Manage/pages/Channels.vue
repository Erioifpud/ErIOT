<template>
  <div class="channels" flex="dir:top">
    <div v-if="!channels.length" flex-box="1" flex="dir:top main:center cross:center">
      您还没有频道，新建一个吧。
    </div>
    <div v-else class="channels__cards" flex="dir:top cross:stretch">
      <v-card class="channels__card" v-for="chn in channels" :key="chn.id">
        <v-card-title primary-title>
          <div class="channels__card-title" flex="main:justify cross:stretch box:mean">
            <!-- <div flex-box="1">
              <ion-icon class="channels__chn-icon" name="cube"></ion-icon>
            </div> -->
            <div flex-box="1">
              <div class="grey--text">ID: {{ chn.id }}</div>
              <div>名称: {{ chn.name }}</div>
              <div>{{ chn.private ? '私有' : '公开'}}</div>
              <div>创建: {{ dateFormat(chn.createdAt) }}</div>
              <div>修改: {{ dateFormat(chn.updatedAt) }}</div>
            </div>
            <!-- <div flex-box="1">

            </div> -->
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="error" @click="handleApiKey(chn.key)">API-KEY</v-btn>
          <v-btn flat color="warning" @click="handleEdit(chn.id)">修改</v-btn>
          <v-btn flat color="info" @click="handleEnter(chn)">打开</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { Mutation } from 'vuex-class'
import mixin from '@/mixin'
import ChannelDialog from '@/views/Manage/components/ChannelDialog.vue'
import moment from 'moment'

@Component({
  components: {
    ChannelDialog
  }
})
export default class Channels extends mixins(mixin.UpdateHeader, mixin.Utils) {
  /* props */
  /* vuex */
  /* data */
  header = {
    title: '频道',
    rightBtn: {
      icon: 'add',
      handler: this.openAddPopup
    }
  }

  selectedId: number = NaN

  channels = []
  /* computed */
  /* methods */
  openAddPopup () {
    this.showComponentDialog((ChannelDialog as any), '新建Channel', false, {
      text: '确认',
      handler: this.handleAddConfirm
    })
  }

  async handleAddConfirm (payload: any) {
    if (!payload.name || payload.name.length > 16) {
      this.showToast('Channel名称长度必须在1至16之间')
      return true
    }
    const data = await this.$axios.post('/channel/', {
      name: payload.name,
      privateFlag: payload.privateFlag
    })
    if (!data) {
      return true
    }
    this.refreshChannels()
  }

  async refreshChannels () {
    const data = await this.$axios.get('/channel/')
    if (!data) {
      return
    }
    this.channels = (data as any).channels
  }

  dateFormat (dateStr: string) {
    return moment(new Date(dateStr)).format('YYYY-MM-DD HH:mm:ss')
  }

  handleApiKey (key: string) {
    this.showDialog('API-KEY很重要，不要随意告诉别人。', undefined, true, {
      text: '确认',
      handler: () => {
        this.$clipboard(key)
        this.showToast('已复制至剪贴板')
      }
    })
  }

  handleEdit (id: number) {
    this.selectedId = id
    this.showComponentDialog((ChannelDialog as any), '编辑Channel', false, {
      text: '确认',
      handler: this.handleEditConfirm
    })
  }

  async handleEditConfirm (payload: any) {
    if (payload.name && payload.name.length > 16) {
      this.showToast('Channel名称长度必须在1至16之间')
      return true
    }
    const data = await this.$axios.put('/channel/' + this.selectedId, {
      name: payload.name,
      private: payload.privateFlag
    })
    if (!data) {
      return
    }
    this.selectedId = NaN
    this.refreshChannels()
  }

  @Mutation('setApiKey') setApiKey: any

  handleEnter (payload: any) {
    this.$router.push({
      name: 'manage-field',
      params: {
        channelId: payload.id.toString()
      }
    })
    this.setApiKey(payload.key)
  }
  /* lifecycle */
  activated () {
    this.selectedId = NaN
    this.refreshChannels()
  }
}
</script>

<style lang="scss" scoped>
.channels {
  height: 100%;

  &__cards {
    position: relative;
    padding: 1rem;
    overflow: auto;
  }

  &__card {
    text-align: left;

    &:not(:last-of-type) {
      margin-bottom: 1rem;
    }
  }

  &__card-title {
    width: 100%;
  }

  &__chn-icon {
    font-size: 5rem;
    color: #3F51B5;
    margin: auto;
  }
}
</style>
