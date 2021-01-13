const url = "http://127.0.0.1:7001/admin/"
const servicePath = {
  login: `${url}login`, // 检查用户名和密码
  type: `${url}type`, // 获得文章类型信息
  add_article: `${url}add_article`, // 添加文章
  update_article: `${url}update_article`, // 修改文章
  article_list: `${url}article_list`, // 文章列表
  delete_article: `${url}delete_article/`, // 删除文章
  article: `${url}article/`, // 根据id获取文章
}
export default servicePath