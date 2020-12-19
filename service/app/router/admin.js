'use strict';
module.exports = app => {
  // controller.default.home文件路径 index方法
  const adminAuth = app.middleware.adminAuth();
  const { router, controller } = app;
  router.get('/admin/index', controller.admin.main.index);
  router.post('/admin/login', controller.admin.main.checkLogin);
  router.get('/admin/type', adminAuth, controller.admin.main.getTypeInfo);

};
