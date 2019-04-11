<template>
  <div v-if="menu.show" class="menu" flex="main:justify cross:center box:mean">
    <div
      v-for="route in routes"
      :key="route.path"
      class="menu__item"
      :class="{ 'menu__item--selected': menu.current === route.path }"
      flex="dir:top main:center cross:center"
      @click="handleClick(route)"
      v-ripples="{ color: 'rgba(0, 0, 0, 0.2)' }"
    >
      <ion-icon class="menu__icon" :name="route.icon"></ion-icon>
      <div class="menu__title">
        {{ route.title }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
// import { mixins } from 'vue-class-component'
import { State } from 'vuex-class'
// import mixin from '@/mixin'

@Component
export default class Menu extends Vue {
  /* props */
  /* vuex */
  @State('menu') menu: any
  /* data */
  /* computed */
  get routes () {
    const routes = (this.$router as any).options.routes
    return routes.filter((route: any) => route.meta && route.meta.inMenu).map((route: any) => ({
      path: route.path,
      title: route.meta.inMenu.title || route.path,
      icon: route.meta.inMenu.icon || 'help'
    }))
  }
  /* methods */
  handleClick (route: any) {
    this.$router.push(route.path)
  }
  /* lifecycle */
}
</script>

<style lang="scss" scoped>
@import '../assets/vars';

.menu {
  position: relative;
  height: 3rem;
  box-shadow: 0 0.02rem 0.12rem rgba(0, 0, 0, 0.2),
              0 0.02rem 0.08rem rgba(0, 0, 0, 0.2);
  z-index: 1090;

  &__item {
    &--selected {
      color: $mainColor;
    }
  }

  &__icon {
    font-size: 1.5rem;
  }

  &__title {
    font-size: 0.8rem;
  }
}
</style>
