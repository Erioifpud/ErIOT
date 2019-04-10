<template>
  <v-app>
    <div id="app" flex="dir:top">
      <div flex-box="0">
        <!-- header -->
        <Header></Header>
      </div>
      <div flex-box="1" flex="dir:top">
        <router-view/>
      </div>
      <div flex-box="0">
        <!-- menu -->
        <Menu></Menu>
      </div>
      <toast></toast>
      <er-dialog></er-dialog>
      <loading></loading>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter, State } from 'vuex-class'
import Header from '@/components/Header.vue'
import Loading from '@/components/Loading.vue'
import Menu from '@/components/Menu.vue'
import Toast from '@/components/Toast.vue'
import ErDialog from '@/components/Dialog.vue'

@Component({
  components: {
    Loading,
    Header,
    Menu,
    Toast,
    ErDialog
  }
})
export default class App extends Vue {
  /* props */
  /* vuex */
  /* data */
  /* computed */
  /* methods */
  /* lifecycle */
}
</script>

<style lang="scss">
html, body, #app {
  margin: 0;
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  transition: all 0.3s ease-in-out;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
