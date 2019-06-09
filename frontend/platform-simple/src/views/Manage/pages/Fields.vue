<template>
  <div class="fields" flex="dir:top">
    <div v-if="!fields.length" flex-box="1" flex="dir:top main:center cross:center">
      您还没有作用域，新建一个吧。
    </div>
    <div v-else class="fields__cards" flex="dir:top cross:stretch">
      <v-card class="fields__card" v-for="field in fields" :key="field.id">
        <v-card-title primary-title v-long-press="handleRemove(field.id)">
          <div class="fields__card-title" flex="main:justify cross:stretch box:mean">
            <!-- <div flex-box="1">
              <ion-icon class="channels__chn-icon" name="cube"></ion-icon>
            </div> -->
            <div flex-box="1">
              <div class="grey--text">ID: {{ field.id }}</div>
              <div>名称: {{ field.name }}</div>
              <div>单位名称: {{ field.unitName || '暂无' }}</div>
              <div>单位符号: {{ field.unit || '暂无' }}</div>
              <div>创建: {{ dateFormat(field.createdAt) }}</div>
              <div>修改: {{ dateFormat(field.updatedAt) }}</div>
            </div>
            <!-- <div flex-box="1">

            </div> -->
          </div>
        </v-card-title>
        <v-card-actions>
          <!-- <v-btn flat color="error" @click="handleApiKey(chn.key)">API-KEY</v-btn> -->
          <v-btn flat color="warning" @click="handleEdit(field.id)">修改</v-btn>
          <v-btn flat color="info" @click="handleEnter(field.id)">打开</v-btn>
          <v-btn flat color="indigo" @click="handleAction(field.id)">动作</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { State } from 'vuex-class'
import mixin from '@/mixin'
import FieldDialog from '@/views/Manage/components/FieldDialog.vue'
import moment from 'moment'

@Component
export default class Fields extends mixins(mixin.UpdateHeader, mixin.Utils) {
  /* props */
  /* vuex */
  @State('apiKey')
  apiKey: string
  /* data */
  header = {
    title: '作用域',
    leftBtn: {
      icon: 'arrow-back'
    },
    rightBtn: {
      icon: 'add',
      handler: this.openAddPopup
    }
  }

  fields = []

  selectedId = NaN
  /* computed */
  /* methods */
  // async getApiKey () {
  //   const data = await this.$axios.get('/channel/' + this.$route.params.channelId)
  //   this.apiKey = data.key
  // }

  async refreshFields () {
    // await this.getApiKey()
    const data = await this.$axios.get('/field/', {
      headers: {
        'api-key': this.apiKey
      }
    })
    if (!data) {
      return
    }
    this.fields = (data as any).fields
  }

  openAddPopup () {
    this.showComponentDialog((FieldDialog as any), '新建Field', false, {
      text: '确认',
      handler: this.handleAddConfirm
    })
  }

  async handleAddConfirm (payload: any) {
    if (!payload.name || payload.name.length > 16) {
      this.showToast('Field名称长度必须在1至16之间')
      return true
    }
    if (payload.unitName && payload.unitName.length > 8) {
      this.showToast('单位名称长度不能超过8位')
      return true
    }
    if (payload.unit && payload.unit.length > 16) {
      this.showToast('单位符号长度不能超过4位')
      return true
    }
    const data = await this.$axios.post('/field/', {
      name: payload.name,
      unit: payload.unit,
      unitName: payload.unitName
    }, {
      headers: {
        'api-key': this.apiKey
      }
    })
    if (!data) {
      return true
    }
    this.refreshFields()
  }

  dateFormat (dateStr: string) {
    return moment(new Date(dateStr)).format('YYYY-MM-DD HH:mm:ss')
  }

  handleEdit (id: number) {
    this.selectedId = id
    this.showComponentDialog((FieldDialog as any), '编辑Field', false, {
      text: '确认',
      handler: this.handleEditConfirm
    })
  }

  async handleEditConfirm (payload: any) {
    if (payload.name && payload.name.length > 16) {
      this.showToast('Field名称长度必须在1至16之间')
      return true
    }
    if (payload.unitName && payload.unitName.length > 8) {
      this.showToast('单位名称长度不能超过8位')
      return true
    }
    if (payload.unit && payload.unit.length > 16) {
      this.showToast('单位符号长度不能超过4位')
      return true
    }
    const data = await this.$axios.put('/field/' + this.selectedId, {
      name: payload.name,
      unit: payload.unit,
      unitName: payload.unitName
    }, {
      headers: {
        'api-key': this.apiKey
      }
    })
    if (!data) {
      return true
    }
    this.selectedId = NaN
    this.refreshFields()
  }
  handleEnter (id: number) {
    this.$router.push({
      name: 'manage-datapoint',
      params: {
        fieldId: id.toString()
      }
    })
  }

  handleAction (id: number) {
    this.$router.push({
      name: 'manage-action',
      params: {
        fieldId: id.toString()
      }
    })
  }

  handleRemove (id: number) {
    return (ev: Element) => {
      this.selectedId = id
      this.showDialog('真的要删除🐴?', undefined, true, {
        text: '确认',
        handler: () => {
          this.remove(id, this.apiKey)
        }
      }, {
        text: '不了不了'
      })
    }
  }

  async remove (id: number, key: string) {
    const data = await this.$axios.delete('/field/' + id, {
      headers: {
        'api-key': key
      }
    })
    if (data) {
      this.refreshFields()
    }
  }
  /* lifecycle */
  activated () {
    if (!this.apiKey) {
      this.$router.push('/')
    }
    this.selectedId = NaN
    this.refreshFields()
  }
}
</script>

<style lang="scss" scoped>
.fields {
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
