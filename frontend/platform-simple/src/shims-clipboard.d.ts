import Vue from 'vue'

interface Clipboard {
  (input: string | object): boolean
}

declare module 'vue/types/vue' {
  interface Vue {
    $clipboard: Clipboard
  }
}
