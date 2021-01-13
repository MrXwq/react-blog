'use strict';
const Controller = require('egg').Controller;

class MainController extends Controller {
  async index() {
    this.ctx.body = 'hi';
  }
  async checkLogin() {
    const userName = this.ctx.request.body.userName;
    const password = this.ctx.request.body.password;
    const sql = `SELECT userName FROM admin_user
     WHERE userName = "${userName}" AND password = "${password}"`;
    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      const openId = new Date().getTime();
      this.ctx.session.openId = { openId };
      this.ctx.body = { data: '登陆成功', openId };
    } else {
      this.ctx.body = { data: '登陆失败' };
    }
  }
  async getTypeInfo() {
    const resType = await this.app.mysql.select('type');
    this.ctx.body = { data: resType };
  }
  // 添加文章
  async addArticle() {
    const tempArticle = this.ctx.request.body;
    const result = await this.app.mysql.insert('article', tempArticle);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    this.ctx.body = {
      insertSuccess,
      insertId,
    };
  }
  // 修改文章
  async updateArticle() {
    const tempArticle = this.ctx.request.body;
    const result = await this.app.mysql.update('article', tempArticle);
    console.log(result, 'resultresult');
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      updateSuccess,
    };
  }
  // 获取文章列表
  async getArticleList() {
    const sql = `SELECT article.id as id,
              article.title as title,
              article.introduce as introduce,
              FROM_UNIXTIME(article.addTime,'%Y:%m:%d %H:%i:%s')  as addTime,
              article.view_count as view_count,
              type.typeName as typeName
              FROM article LEFT JOIN type ON article.type_id = type.Id 
              ORDER BY article.id DESC
    `;
    const results = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: results,
    };
  }

  // 删除文章
  async delArticle() {
    const id = this.ctx.params.id;
    const results = await this.app.mysql.delete('article', { id });
    this.ctx.body = {
      data: results,
    };
  }

  // 根据id获取文章
  async getArticleById() {
    const id = this.ctx.params.id;
    const sql = `SELECT article.id as id,
              article.title as title,
              article.article_content as article_content,
              article.introduce as introduce,
              FROM_UNIXTIME(article.addTime,'%Y:%m:%d')  as addTime,
              article.view_count as view_count,
              type.typeName as typeName,
              type.id as typeId
              FROM article LEFT JOIN type ON article.type_id = type.Id 
              WHERE article.id=${id}`;
    const results = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: results,
    };
  }
}
module.exports = MainController;
