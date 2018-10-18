const isPrimitive = (val) => {
  var type = typeof val
  return val == null || (type !== 'object' && type !== 'function')
}

const isArray = (val) => {
  return val instanceof Array
}

const format = (success, data, code) => {
  if (isPrimitive(data) || isArray(data)) {
    data = { result: data }
  }
  return {
    error: !success,
    code: success ? 200 : code,
    data
  }
}

const success = (data) => {
  return format(true, data)
}

const error = (code, data) => {
  return format(false, data, code)
}

const respSuccess = (ctx, data) => {
  ctx.body = { ...ctx.body, ...success(data) }
}

const respError = (ctx, code, data) => {
  ctx.body = { ...ctx.body, ...error(code, data) }
}

module.exports = {
  success,
  error,
  respSuccess,
  respError
}
