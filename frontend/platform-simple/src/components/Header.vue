<template>
  <div v-if="header.show" class="header" flex="main:justify cross:center">
    <div class="header__left" flex-box="0">
      <div v-if="header.leftBtn" class="header__left-btn" flex="cross:center">
        <ion-icon v-if="header.leftBtn.icon" :name="header.leftBtn.icon" @click="handleLeft"></ion-icon>
        <span v-else-if="header.leftBtn.text" class="header__btn-text">{{ header.leftBtn.text }}</span>
      </div>
    </div>
    <div class="header__title" flex-box="1">
      {{ header.title }}
    </div>
    <div class="header__right" flex-box="0">
      <div v-if="header.rightBtn" class="header__right-btn" flex="cross:center">
        <ion-icon v-if="header.rightBtn.icon" :name="header.rightBtn.icon" @click="handleRight"></ion-icon>
        <span v-else-if="header.rightBtn.text" class="header__btn-text">{{ header.rightBtn.text }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class Header extends Vue {
  /* props */
  /* vuex */
  @State('header') header: any
  /* data */
  /* computed */
  /* methods */
  handleLeft () {
    const leftBtn = this.header.leftBtn
    if (!leftBtn) {
      return
    }
    if (leftBtn.handler) {
      leftBtn.handler()
    } else {
      this.$router.back()
    }
  }

  handleRight () {
    const rightBtn = this.header.rightBtn
    if (!rightBtn) {
      return
    }
    if (rightBtn.handler) {
      rightBtn.handler()
    }
  }
  /* lifecycle */
}
</script>

<style lang="scss" scoped>
@import '../assets/vars';

.header {
  background-color: $mainColor;
  height: 3rem;
  padding: 0 0.3rem;
  color: $fontColor;

  &__title {
    font-size: 0.9rem;
  }

  &__left, &__right {
    width: 1.5rem;
  }

  &__left-btn, &__right-btn {
    font-size: 1.5rem;
    border-radius: 1rem;

    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }

  &__btn-text {
    font-size: 0.9rem;
  }
}
</style>
