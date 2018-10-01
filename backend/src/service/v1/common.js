async function test(ctx) {
  ctx.body = 'aaa'
}

module.exports =  (router, prefix) => {
  router.get(prefix + '/test', test)

}