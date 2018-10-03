const isPrimitive = (val) => {
  var type = typeof val
  return val == null || (type !== 'object' && type !== 'function')
}

const isArray = (val) => {
  return val instanceof Array
}

const format = (success, data, code) => {
  if (isPrimitive(data) || isArray(data)) {
    data = { msg: data }
  }
  if (success) {
    return { data }
  } else {
    return {
      error: { code, data }
    }
  }
}

module.exports = {
  success (data) {
    return format(true, data)
  },
  error (code, data) {
    return format(false, data, code)
  }
}
