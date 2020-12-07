module.exports = app => {
  // controller.default.home文件路径 index方法 

  const { router, controller } = app
  router.get("/default/index", controller.default.home.index)
}