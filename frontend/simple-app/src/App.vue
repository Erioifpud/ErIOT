<template>
  <div id="app">
    <div v-transfer-dom>
      <loading :show="loading" text="请稍候..."></loading>
    </div>
    <div v-transfer-dom>
      <toast></toast>
    </div>
    <view-box body-padding-bottom="55px" body-padding-top="46px">
      <Header slot="header"></Header>
      <router-view></router-view>
      <tab-bar slot="bottom" v-if="$route.name !== 'LoginPage'"></tab-bar>
    </view-box>
  </div>
</template>

<script>
import { Loading, Toast, TransferDom, ViewBox } from 'vux'
import { mapState } from 'vuex'
import Header from './components/Header'
import TabBar from './components/TabBar'

export default {
  name: 'app',
  data () {
    return {
      roles: []
    }
  },
  components: {
    Header,
    Loading,
    Toast,
    TabBar,
    ViewBox
  },
  directives: {
    TransferDom
  },
  computed: {
    ...mapState([
      'drawerVisibility',
      'loading',
      'transition'
    ])
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}

@keyframes slideInLeft {
  from {
    transform: translate3d(-100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes slideOutLeft {
  from {
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes slideInRight {
  from {
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0)
  }
}

@keyframes slideOutRight {
  from {
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(100%, 0, 0)
  }
}

@keyframes inRight {
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes outRight {
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
}

.slide-in-enter-active, .slide-out-leave-active {
  position: absolute;
  width: 100%;
  // top: 0;
  animation-duration: .5s;
  animation-fill-mode: both;
}

.show-enter, .show-leave-to {
  opacity: 0;
}

.slide-out-leave {
  transform: translate(0, 0);
}

.slide-in-enter-active {
  animation-name: inRight;
}

.slide-out-leave-active {
  animation-name: outRight;
}
</style>
