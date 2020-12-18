module.exports = app => {
  // controller.default.home文件路径 index方法

  const { router, controller } = app;
  router.get('/default/index', controller.default.home.index);
  router.get('/default/article_list', controller.default.home.getArticleList);
  router.get('/default/article_content/:id', controller.default.home.getArticleById);
};
