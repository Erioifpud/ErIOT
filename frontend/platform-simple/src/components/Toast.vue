<template>
  <transition name="fade">
    <div v-show="shouldShowToast" class="toast">
      <div class="toast__box">
        {{ toast.text }}
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
// import { mixins } from 'vue-class-component'
import { State, Getter } from 'vuex-class'
// import mixin from '@/mixin'

@Component({
  name: 'Toast'
})
export default class Toast extends Vue {
  /* props */
  /* vuex */
  @Getter('shouldShowToast') shouldShowToast: any
  @State('toast') toast: any
  /* data */
  /* computed */
  /* methods */
  /* lifecycle */
}
</script>

<style lang="scss" scoped>
.toast {
  position: absolute;
  width: 100%;
  top: 80%;

  &__box {
    color: #fff;
    font-size: 0.9rem;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 0.25rem;
    padding: 0.3rem 0.4rem;
    max-width: 70%;
    width: fit-content;
    margin: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: width 0.2s linear;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
