<template>
  <div>
    <!-- <group title="视图">
      <popup-picker title="主题" :data="topics" v-model="selectedTopic" :columns="1" placeholder=""></popup-picker>
    </group> -->
    <div style="padding: 1rem;">
      <button-tab v-model="selectedTopic">
        <button-tab-item v-for="(topic, i) in topics" :key="i" @on-item-click="handleTabClick(topic.value)">{{ topic.name }}</button-tab-item>
      </button-tab>
    </div>

    <group>
      <popup-picker title="关系" :data="associates" v-model="currentAssociate"></popup-picker>
    </group>
    <box gap="1rem 1rem">
      <x-button plain type="primary" style="border-radius:99px;">添加</x-button>
    </box>
    <div>
      <swipeout class="vux-1px-t">
        <swipeout-item transition-mode="follow">
          <div slot="right-menu">
            <swipeout-button @click.native="onButtonClick('fav')" type="primary">11</swipeout-button>
            <swipeout-button @click.native="onButtonClick('delete')" type="warn">22</swipeout-button>
          </div>
          <div slot="content" class="vux-1px-t">
            <cell-box>
              33
            </cell-box>
          </div>
        </swipeout-item>

        <swipeout-item transition-mode="follow">
          <div slot="right-menu">
            <swipeout-button @click.native="onButtonClick('fav')" type="primary">11</swipeout-button>
            <swipeout-button @click.native="onButtonClick('delete')" type="warn">22</swipeout-button>
          </div>
          <div slot="content" class="vux-1px-tb">
            <cell-box>
              33
            </cell-box>
          </div>
        </swipeout-item>
      </swipeout>
    </div>
  </div>
</template>

<script>
import mixin from '@/mixin'
import { PopupPicker, Group, ButtonTab, ButtonTabItem, XButton, Box, Swipeout, SwipeoutItem, SwipeoutButton, CellBox } from 'vux'

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
      currentAssociate: []
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
    CellBox
  },
  methods: {
    async handleTabClick (topic) {
      const { err, data } = await this.$request('get', '/admin/associate', { topic })
      if (err) {
        this.$vux.toast.text(err.result, 'bottom')
      }
      if (data) {
        const { users, roles, permissions } = data
        this.associates = [this.mapList(users, 'username'), this.mapList(roles), this.mapList(permissions, 'rule')]
      }
    },
    mapList (list, name = 'name', value = 'id') {
      return list.map(item => ({
        name: `${item[name]}`,
        value: `${item[value]}`
      }))
    },
    onButtonClick (val) {
      console.log(val)
    }
  },
  mounted () {
    this.handleTabClick(this.topics[this.selectedTopic].value)
  }
}
</script>

<style>
.demo-content {
  padding: 10px 10px;
}
</style>
