'use strict';
module.exports = () => {
  return async function adminAuth(ctx, next) {
    if (ctx.session.openId) {
      await next();
    } else {
      ctx.body = { data: '没有登陆' };
    }
  };
};
