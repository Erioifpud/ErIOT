module.exports = {
  async callback (ctx, next) {
    await next()
    const callback = ctx.query.callback
    if (callback) {
      ctx.body = `${callback}(${JSON.stringify(ctx.body.data.result || ctx.body.data)})`
    }
  }
}
