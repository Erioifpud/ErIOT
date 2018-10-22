const ls = window.localStorage

const storage = {
  saveItem (key, val) {
    if (typeof val === 'object') {
      ls.setItem(key, JSON.stringify(val))
    } else if (typeof val !== 'function') {
      ls.setItem(key, val)
    }
  },
  removeItem (key) {
    ls.removeItem(key)
  },
  getItem (key) {
    ls.getItem(key)
  },
  appendItem (key, val) {
    const item = this.getItem(key)
    if (!item) {
      this.saveItem(key, val)
      return
    }
    if (typeof val === 'object') {
      const obj = {...JSON.parse(item), ...val}
      this.saveItem(key, obj)
    }
  }
}

export default storage
