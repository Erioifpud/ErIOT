<template>
  <div>
    <div style="padding: 1rem;">
      <button-tab v-model="selectedTopic">
        <button-tab-item v-for="(topic, i) in topics" :key="i" @on-item-click="handleTabClick(topic.value)">{{ topic.name }}</button-tab-item>
      </button-tab>
    </div>

    <group>
      <popup-picker title="关系" :data="associates" v-model="currentAssociate"></popup-picker>
    </group>
    <box gap="1rem 1rem">
      <x-button plain type="primary" @click.native="handleAdd" style="border-radius:99px;">添加</x-button>
    </box>
    <div>
      <swipeout>

        <swipeout-item v-for="(asso, i) in allAssociates" :key="i" transition-mode="follow">
          <div slot="right-menu">
            <swipeout-button @click.native="handleDelete(asso.level)" type="warn">删除</swipeout-button>
          </div>
          <div slot="content" class="vux-1px-tb">
            <cell-box>
              {{ asso.title }}
            </cell-box>
          </div>
        </swipeout-item>

      </swipeout>
    </div>
  </div>
</template>

<script>
import mixin from '@/mixin'
import { PopupPicker, Group, ButtonTab, ButtonTabItem, XButton, Box, Swipeout, SwipeoutItem, SwipeoutButton, CellBox, Cell } from 'vux'

export default {
  mixins: [mixin.updateBar],
  data () {
    return {
      title: '关系管理',
      topics: [
        {
          name: '权限',
          value: 'permission'
        },
        {
          name: '所有者',
          value: 'owner'
        },
        {
          name: '设备',
          value: 'device'
        }
      ],
      selectedTopic: 0,
      associates: [],
      currentAssociate: [],
      allAssociates: []
    }
  },
  components: {
    PopupPicker,
    Group,
    ButtonTab,
    ButtonTabItem,
    XButton,
    Box,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    CellBox,
    Cell
  },
  computed: {
    currentTopic () {
      return this.topics[this.selectedTopic]
    }
  },
  methods: {
    async handleAdd () {
      if (this.currentAssociate.length === 0) {
        this.$vux.toast.text('关系为空', 'bottom')
        return
      }
      const topic = this.currentTopic.value
      const { err } = await this.$request('post', `/admin/associate/${topic}`, { ids: this.currentAssociate })
      if (err) {
        this.$vux.toast.text(err.result, 'bottom')
      }
      this.refreshSwipeList(topic)
    },
    async handleTabClick (topic) {
      this.currentAssociate = []
      this.refreshPickup(topic)
      this.refreshSwipeList(topic)
    },
    async refreshPickup (topic) {
      const { err, data } = await this.$request('get', '/admin/associate', { topic })
      if (err) {
        this.$vux.toast.text(err.result, 'bottom')
        return
      }
      if (!data) {
        return
      }
      this.associates = Object.values(data).map(this.mapList)
    },
    async refreshSwipeList (topic) {
      if (topic === 'permission') {
        const result = await this.getAllAssociates(topic)
        result.forEach(user => {
          user.roles.forEach(role => {
            role.permissions.forEach(per => {
              this.allAssociates.push({
                title: `${user.username} ${role.name} ${per.rule}`,
                level: [user.id, role.id, per.id]
              })
            })
          })
        })
      } else if (topic === 'device') {
        const result = await this.getAllAssociates(topic)
        result.forEach(place => {
          place.devices.forEach(device => {
            device.clients.forEach(client => {
              this.allAssociates.push({
                title: `${place.name} ${device.name} ${client.name}`,
                level: [place.id, device.id, client.id]
              })
            })
          })
        })
      } else if (topic === 'owner') {
        const result = await this.getAllAssociates(topic)
        console.log('result', result)
        result.forEach(user => {
          user.places.forEach(place => {
            this.allAssociates.push({
              title: `${user.username} ${place.name}`,
              level: [user.id, place.id]
            })
          })
        })
      }
    },
    async getAllAssociates (topic) {
      const { err, data } = await this.$request('get', `/admin/associate/${topic}`)
      if (err) {
        this.$vux.toast.text(err.result, 'bottom')
      }
      const result = data.result
      this.allAssociates = []
      if (result.length === 0) {
        return []
      }
      return result
    },
    mapList (list) {
      return list.map(item => ({
        name: `${item.name || item.username || item.rule}`,
        value: `${item.id}`
      }))
    },
    handleDelete (level) {
      level = level.filter(item => typeof item === 'number')
      console.log(level)
    }
  },
  mounted () {
    this.handleTabClick(this.currentTopic.value)
  }
}
</script>

<style>
.demo-content {
  padding: 10px 10px;
}
</style>
