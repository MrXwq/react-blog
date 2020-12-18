import Head from 'next/head'
import Header from "../components/Header"
import Author from "../components/Author"
import Advert from "../components/Advert"
import Footer from "../components/Footer"
import axios from 'axios';
import "../styles/pages/detailed.scss"
import {
  Row,
  Col,
  Breadcrumb,
  Affix
} from 'antd'
import {
  CalendarOutlined,
  YoutubeOutlined,
  FireOutlined
} from '@ant-design/icons';
// import ReactMarkdown from "react-markdown"
import MarkNav from "markdown-navbar"
import "markdown-navbar/dist/navbar.css"
import marked from 'marked'
import hljs from 'highlight.js'
import "highlight.js/styles/monokai-sublime.css"

const Detail = (props) => {
  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer: renderer,
    gfm: true, // 和github一样渲染 
    pedantic: false, // 容错，帮你改错再渲染
    sanitize: false, // 不忽略html标签，如果填true，iframe标签会报错
    table: true, // 表格样式是我们github的样式 必须有gfm
    breaks: false, // 是否支持github换行符
    smartLists: true, // 自动渲染我们的列表
    highlight: function (code) {
      return hljs.highlightAuto(code).value
    }
  })
  let html = marked(props.article_content)
  // let html = [props]
  return (
    <div>
      <Head>
        <title>Detail</title>
      </Head>
      <Header />
      <Row className="comm-main" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="/">首页</a>
                  <a href="/">视频列表</a>
                  <a href="/">XXX</a>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className="detailed-title">这是文章标题这是文章标题这是文章标题</div>
              <div className="list-icon  center">
                <CalendarOutlined />2019-06-28
                <YoutubeOutlined /> 视频教程
                <FireOutlined /> 6666
              </div>
              <div className="detailed-content" dangerouslySetInnerHTML={{ __html: html }}>
              </div>
            </div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">
                文章目录
            </div>
              <MarkNav
                className="article-menu"
                ordered={false}
              ></MarkNav>
              {/* <MarkNav
                className="article-menu"
                source={markdown}
                ordered={false}
              ></MarkNav> */}
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </div>
  )
}
Detail.getInitialProps = async (context) => {
  let id = context.query.id
  const promise = new Promise((resolve) => {
    axios(`http://127.0.0.1:7001/default/article_content/${id}`).then(res => {
      console.log(res.data.data, "resresresres")
      resolve(res.data.data[0])
    })
  })
  return await promise
}
export default Detail