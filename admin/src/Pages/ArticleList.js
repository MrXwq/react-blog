import React, {useState,useEffect} from 'react'
import {List, Row,Col,Button,Modal,message} from 'antd'
import axios from 'axios'
import servicePath from "../config/apiUrl"
import "../static/css/ArticleList.css"
const {confirm } = Modal

function ArticleList(props) {
  const [list,setList] = useState([])
  useEffect(() => {
    getList()
  },[])
  // 获取文章列表
  const getList = () => {
    axios({
      method: 'get',
      url: servicePath.article_list,
      withCredentials: true
    }).then(res=> {
      setList(res.data.data)
    })
  }
  // 删除文章
  const delArticle = (id) => {
    confirm({
      title: '确认删除吗？',
      content: "文章将永远删除",
      onOk() {
        axios(`${servicePath.delete_article}${id}`,{withCredentials:true}).then(() => {
          message.success("删除成功")
          getList()
        })
      },
      onCancel() {
        message.success("文章无改变")
      }
    })
    axios()
  }

  // 修改文章跳转路由
  const updateArticle = (id) => {
    props.history.push(`/index/add/${id}`)
  }
  return (
    <div>
      <List 
      header={
        <Row className="list-div">
          <Col span={8}>
            <b>标题</b>
          </Col>
          <Col span={4}>
            <b>类别</b>
          </Col>
          <Col span={4}>
            <b>发布时间</b>
          </Col>
          <Col span={4}>
            <b>浏览量</b>
          </Col>
          <Col span={4}>
            <b>操作</b>
          </Col>
        </Row>
      }
      bordered
      dataSource={list}
      renderItem={item => (
        <List.Item>
          <Row className="list-div">
          <Col span={8}>
            <b>{item.title}</b>
          </Col>
          <Col span={4}>
            <b>{item.typeName}</b>
          </Col>
          <Col span={4}>
            <b>{item.addTime}</b>
          </Col>
          <Col span={4}>
            <b>{item.view_count}</b>
          </Col>
          <Col span={4}>
            <Button type="primary" onClick={() => updateArticle(item.id)}>修改</Button>&nbsp;
            <Button onClick={() => delArticle(item.id)}>删除</Button>
          </Col>
        </Row>
        </List.Item>
      )}
      />
    </div>
  )
}
export default ArticleList