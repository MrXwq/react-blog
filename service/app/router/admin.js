'use strict';
module.exports = app => {
  // controller.default.home文件路径 index方法
  const adminAuth = app.middleware.adminAuth();
  const { router, controller } = app;
  router.get('/admin/index', controller.admin.main.index);
  router.post('/admin/login', controller.admin.main.checkLogin);
  router.get('/admin/type', adminAuth, controller.admin.main.getTypeInfo);
  router.post('/admin/add_article', adminAuth, controller.admin.main.addArticle);
  router.post('/admin/update_article', adminAuth, controller.admin.main.updateArticle);
  router.get('/admin/article_list', adminAuth, controller.admin.main.getArticleList);
  router.get('/admin/delete_article/:id', adminAuth, controller.admin.main.delArticle);
  router.get('/admin/article/:id', adminAuth, controller.admin.main.getArticleById);

};
