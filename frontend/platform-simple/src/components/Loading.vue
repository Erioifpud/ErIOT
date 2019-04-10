<template>
  <div v-show="show" class="loading" flex="dir:top main:center cross:center">
    <div class="loading__box">
      <div class="loading__spinner">
        <div class="loading__spinner-inner"></div>
      </div>
      {{ loading.text }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component({
  name: 'Loading'
})
export default class Loading extends Vue {
  /* props */
  /* vuex */
  @State('loading') loading: any
  /* data */
  /* computed */
  get show () {
    return !!this.loading.count
  }
  /* methods */
  /* lifecycle */
}
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  color: #fff;

  &__box {
    max-width: 70%;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 0.625rem;
    padding: 0.5rem 0 0.5rem 0.5rem;
    border-right: solid 0.5rem rgba(0, 0, 0, 0);
  }

  &__spinner {
    box-sizing: border-box;
    margin: auto;
    height: 70px;
    width: 70px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  &__spinner-inner {
    box-sizing: border-box;
    width: calc(70px / 7);
    height: calc(70px / 7);
    background-color: #fff;
    color: #fff;
    box-shadow: 15px 15px  0 0,
                -15px -15px  0 0,
                15px -15px  0 0,
                -15px 15px  0 0,
                0 15px  0 0,
                15px 0  0 0,
                -15px 0  0 0,
                0 -15px 0 0;
    animation: pixel-spinner-animation 2000ms linear infinite;
  }

  @keyframes pixel-spinner-animation {
    50% {
      box-shadow: 20px 20px 0px 0px,
                  -20px -20px 0px 0px,
                  20px -20px 0px 0px,
                  -20px 20px 0px 0px,
                  0px 10px 0px 0px,
                  10px 0px 0px 0px,
                  -10px 0px 0px 0px,
                  0px -10px 0px 0px;
    }
    75% {
      box-shadow: 20px 20px 0px 0px,
                  -20px -20px 0px 0px,
                  20px -20px 0px 0px,
                  -20px 20px 0px 0px,
                  0px 10px 0px 0px,
                  10px 0px 0px 0px,
                  -10px 0px 0px 0px,
                  0px -10px 0px 0px;
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
