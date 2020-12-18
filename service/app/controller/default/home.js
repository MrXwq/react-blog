'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi';
  }
  async getArticleList() {
    const sql = `SELECT article.id as id,
              article.title as title,
              article.introduce as introduce,
              FROM_UNIXTIME(article.addTime,'%Y:%m:%d %H:%i:%s')  as addTime,
              article.view_count as view_count,
              type.typeName as typeName
              FROM article LEFT JOIN type ON article.type_id = type.Id
    `;
    const results = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: results,
    };
  }
  async getArticleById() {
    const id = this.ctx.params.id;
    const sql = `SELECT article.id as id,
    article.title as title,
    article.introduce as introduce,
    article.article_content as article_content,
    FROM_UNIXTIME(article.addTime,'%Y:%m:%d %H:%i:%s')  as addTime,
    article.view_count as view_count,
    type.typeName as typeName,
    type.id as typeId
    FROM article LEFT JOIN type ON article.type_id = type.Id 
    WHERE article.id = ${id}
`;
    const results = await this.app.mysql.query(sql);
    console.log(results, 'resultsresultsresults');
    this.ctx.body = {
      data: results,
    };
  }
}

module.exports = HomeController;
