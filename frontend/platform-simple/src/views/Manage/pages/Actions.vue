<template>
  <div class="actions" flex="dir:top">
    <div v-if="!actions.length" flex-box="1" flex="dir:top main:center cross:center">
      您还没有动作，新建一个吧。
    </div>
    <div v-else class="actions__cards" flex="dir:top cross:stretch">
      <v-card class="actions__card" v-for="action in actions" :key="action.id">
        <v-card-title primary-title>
          <div class="actions__card-title" flex="main:justify cross:stretch box:mean">
            <!-- <div flex-box="1">
              <ion-icon class="channels__chn-icon" name="cube"></ion-icon>
            </div> -->
            <div flex-box="1">
              <div class="grey--text">ID: {{ action.id }}</div>
              <div>条件: {{ actionTable[+action.code] }}</div>
              <div>阈值: {{ action.threshold }}</div>
              <div>创建: {{ dateFormat(action.createdAt) }}</div>
              <div>修改: {{ dateFormat(action.updatedAt) }}</div>
            </div>
            <!-- <div flex-box="1">

            </div> -->
          </div>
        </v-card-title>
        <v-card-actions>
          <!-- <v-btn flat color="error" @click="handleApiKey(chn.key)">API-KEY</v-btn> -->
          <v-btn flat color="error" @click="handleRemove(action.id)">删除</v-btn>
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
import ActionDialog from '@/views/Manage/components/ActionDialog.vue'
import moment from 'moment'

@Component
export default class Actions extends mixins(mixin.UpdateHeader, mixin.Utils) {
  /* props */
  /* vuex */
  @State('apiKey')
  apiKey: string
  /* data */
  header = {
    title: '动作',
    leftBtn: {
      icon: 'arrow-back'
    },
    rightBtn: {
      icon: 'add',
      handler: this.openAddPopup
    }
  }

  actions = []

  selectedId = NaN

  actionTable = {
    0: '=',
    1: '<',
    2: '>',
    3: '<=',
    4: '>='
  }
  /* computed */
  /* methods */

  async refreshActions () {
    // await this.getApiKey()
    const data = await this.$axios.get('/action/', {
      headers: {
        'api-key': this.apiKey
      },
      params: {
        id: this.$route.params.fieldId
      }
    })
    if (!data) {
      return
    }
    this.actions = (data as any).actions
  }

  openAddPopup () {
    this.showComponentDialog((ActionDialog as any), '新建Action', false, {
      text: '确认',
      handler: this.handleAddConfirm
    })
  }

  async handleAddConfirm (payload: any) {
    if (payload.code === '') {
      this.showToast('条件不能为空')
      return true
    }
    if (payload.threshold === '') {
      this.showToast('阈值不能为空')
      return true
    }
    const data = await this.$axios.post('/action/', {
      code: payload.code.value,
      threshold: payload.threshold,
      id: this.$route.params.fieldId
    }, {
      headers: {
        'api-key': this.apiKey
      }
    })
    if (!data) {
      return true
    }
    this.refreshActions()
  }

  dateFormat (dateStr: string) {
    return moment(new Date(dateStr)).format('YYYY-MM-DD HH:mm:ss')
  }

  async handleRemove (id: number) {
    this.showDialog('真的要删除🐴?', undefined, false, {
      text: '确认',
      handler: () => {
        this.remove(id)
      }
    }, {
      text: '不了不了'
    })
  }

  async remove (id: number) {
    const data = await this.$axios.delete('/action/' + id, {
      headers: {
        'api-key': this.apiKey
      }
    })
    this.refreshActions()
  }
  /* lifecycle */
  activated () {
    if (!this.apiKey) {
      this.$router.push('/')
    }
    this.selectedId = NaN
    this.refreshActions()
  }
}
</script>

<style lang="scss" scoped>
.actions {
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
