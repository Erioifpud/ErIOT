<template>
  <div class="me-edit">
    <v-container>
      <v-layout row wrap>

        <v-flex xs12 sm6 md3>
          <v-text-field
            label="Regular"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
// import {  } from 'vuex-class'
import mixin from '@/mixin'

@Component
export default class Edit extends mixins(mixin.UpdateHeader) {
  header = {
    title: '编辑',
    leftBtn: {
      icon: 'arrow-back'
    }
  }
}
</script>

<style>

</style>
