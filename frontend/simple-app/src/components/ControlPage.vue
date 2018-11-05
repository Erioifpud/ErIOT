<template>
  <div>
    <group :title="`请选择${list.title}`">
      <cell
        v-for="item in list.elements"
        :key="item.id"
        :title="item.name"
        is-link
        :link="toLink(item)"
      >
      </cell>
    </group>
    <popup-dialog @onConfirm="handleDialogConfirm">
      <div slot="content">
        <cell title="设置"></cell>
        <x-input class="vux-1px-t" title="名称" v-model="newName" :placeholder="`${list.current && list.current.name}`"></x-input>
      </div>
    </popup-dialog>
  </div>
</template>

<script>
import { Group, Cell, XDialog, XInput } from 'vux'
import mixin from '@/mixin'
import { mapMutations, mapState } from 'vuex'
import PopupDialog from './PopupDialog'

export default {
  mixins: [mixin.updateBar],
  components: {
    Group,
    Cell,
    XDialog,
    XInput,
    PopupDialog
  },
  data () {
    return {
      title: 'IoT控制',
      places: [],
      newName: ''
    }
  },
  computed: {
    ...mapState([
      'userData'
    ]),
    list () {
      if (!this.userData) {
        return {}
      }
      const query = this.$route.query
      const { level } = query
      const [placeId, deviceId, clientId] = (level || '').split('|')
      if (placeId && !deviceId && !clientId) {
        const current = this.userData.places.find(item => item.id === parseInt(placeId))
        return {
          title: '设备',
          elements: current.devices,
          current
        }
      }
      if (placeId && deviceId && !clientId) {
        const current = this.userData.places.find(item => item.id === parseInt(placeId)).devices.find(item => item.id === parseInt(deviceId))
        return {
          title: '终端',
          elements: current.clients,
          current
        }
      }
      return {
        title: '地点',
        elements: this.userData.places,
        current: this.userData
      }
    }
  },
  methods: {
    ...mapMutations([
      'setUserData'
    ]),
    handleDialogConfirm () {
      this.updateName(this.newName)
    },
    async updateName (newName) {
      let url = ''
      if (this.list.title === '终端') {
        url = 'device'
      } else if (this.list.title === '设备') {
        url = 'place'
      } else {
        return
      }
      const { data, err } = await this.$request('put', `${url}/${this.list.current.id}`, {
        name: newName
      })
      if (err) {
        this.$vux.toast.text(err.result, 'bottom')
        return
      }
      const [result] = data.result
      this.$vux.toast.text(result ? '修改成功' : '修改失败', 'bottom')
      this.getPlaces()
    },
    appendLevel (level) {
      const arr = this.$route.query.level ? this.$route.query.level.split('|') : []
      arr.push(level)
      return arr.join('|')
    },
    async getPlaces () {
      const { err, data } = await this.$request('get', 'userData')
      if (err) {
        this.$vux.toast.text(err.result, 'bottom')
        return
      }
      this.setUserData(data)
    },
    toLink (item) {
      if (this.$route.query.level && this.$route.query.level.length >= 3) {
        return {
          name: 'DataPage',
          query: {
            clientId: item.id
          }
        }
      }
      return {
        name: 'ControlPage',
        query: {
          level: this.appendLevel(item.id)
        }
      }
    }
  },
  mounted () {
    this.getPlaces()
  }
}
</script>

<style scoped>

</style>
