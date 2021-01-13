import React, {useState,useEffect} from 'react'
import marked from 'marked'
import "../static/css/AddArticle.css"
import {Row,Col,Input,Select,Button,DatePicker,message} from 'antd'
import axios from 'axios'
import servicePath from "../config/apiUrl"
const {Option} = Select
const {TextArea} = Input

function AddArticle(props) {
  const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
   const [articleTitle,setArticleTitle] = useState('')   //文章标题
   const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
   const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
   const [introducemd,setIntroduced] = useState()            //简介的markdown内容
   const [introduceHtml,setIntroduceHtml] = useState('等待编辑') //简介的html内容
   const [showDate,setShowDate] = useState()   //发布日期
   const [updateDate,setUpdateDate] = useState() //修改日志的日期
   const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
   const [selectedType,setSelectType] = useState(['请选择类型']) //选择的文章类别

   useEffect(()=> {
    getTypeInfo()
    let tmpId = props.match.params.id
    if(tmpId) {
      setArticleId(tmpId)
      getArticleById(tmpId)
    }
   },[])
   marked.setOptions({
    renderer: marked.Renderer(),
    gfm: true, // 和github一样渲染 
    pedantic: false, // 容错，帮你改错再渲染
    sanitize: false, // 不忽略html标签，如果填true，iframe标签会报错
    table: true, // 表格样式是我们github的样式 必须有gfm
    breaks: false, // 是否支持github换行符
    smartLists: true, // 自动渲染我们的列表
    smartypants: false,
  })

  const changeContent = (e) => {
    setArticleContent(e.target.value) 
    let html = marked(e.target.value)
    setMarkdownContent(html)
  }
  const changeIntroduce = e => {
    setIntroduced(e.target.value)
    let html  = marked(e.target.value)
    setIntroduceHtml(html)
  }

  const getTypeInfo = () => {
    axios({
      method:'get',
      url: servicePath.type,
      withCredentials: true
    }).then(res => {
      if(res.data.data === "没有登陆") {
        localStorage.removeItem('openId')
        props.history.push('/')
      }else {
        setTypeInfo(res.data.data)
      }
    })
  } 

  const selectTypeHandler = value => {

    setSelectType(value)
  }

  const saveArticle = ()  => {
    if(!selectedType) {
      message.error('必须选择文章类型')
      return
    }else if(!articleTitle) {
      message.error("标题不能为空")
      return
    }
    else if(!articleContent) {
      message.error("内容不能为空")
      return
    }
    else if(!introducemd) {
      message.error("简介不能为空")
      return
    }
    else if(!showDate) {
      message.error("发布时间不能为空")
      return
    }
let dataProps = {}
dataProps.type_id = selectedType
dataProps.title = articleTitle
dataProps.article_content = articleContent
dataProps.introduce = introducemd
let dateText = showDate.replace('-','/')
dataProps.addTime = (new Date(dateText).getTime())/ 1000

if(articleId === 0) {
  dataProps.view_count = 0;
  axios({
    method: 'post',
    url: servicePath.add_article,
    data: dataProps,
    withCredentials: true // 中间件才能起作用
  }).then(
    res => {
      setArticleId(res.data.insertId) 
      if(res.data.insertSuccess) {
        message.success("保存成功")
      }else {
        message.error("保存失败")
      }
    }
  )
}else {
  dataProps.id = articleId
  axios({
    method: 'post',
    url: servicePath.update_article,
    data: dataProps,
    withCredentials: true // 中间件才能起作用
  }).then(res => {
    if(res.data.updateSuccess) {
      message.success("修改成功")
    }else {
      message.error("保存失败")
    }
    
  })
}
  }

  // 根据id获取文章
  const getArticleById = (id) => {
    axios(servicePath.article + id,
      {withCredentials:true}
    ).then( res => {
      let articleInfo = res.data.data[0]
      setArticleTitle(articleInfo.title)
      setArticleContent(articleInfo.article_content) 
      if(articleInfo.article_content) {

        let html = marked(articleInfo.article_content)
        setMarkdownContent(html)
      }
      setIntroduced(articleInfo.introduce)
      if(articleInfo.introduce) {

        let introduceHtml  = marked(articleInfo.introduce)
        setIntroduceHtml(introduceHtml)
      }
      setShowDate(articleInfo.addTime)
      setSelectType(articleInfo.typeId)
    })
  }
  return (
    <div>
      <Row getter={5}> 
        <Col span={18}>
          <Row getter={10}> 
          <Col span={20}>
            <Input 
            value={articleTitle}
            placeholder="输入标题"
             size="large" onChange={e=> {
              setArticleTitle(e.target.value)
            }}/>
          </Col>
          <Col span={4}>
            &nbsp;
            <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
              {
                typeInfo.map((item,index) => {
                  return ( <Option key={index} value={item.Id}> {item.typeName}</Option>)
                })
              }
             
            </Select>
          </Col>
          </Row>
          <br/>
          <Row gutter={10}>
            <Col span={12}>
              <TextArea 
              className="markdown-content" 
              rows={35} 
              placeholder="文章内容"
              value={articleContent}
              onChange={changeContent}
              />
            </Col>
            <Col span={12}>
              <div className="show-html" dangerouslySetInnerHTML={{__html: markdownContent}}></div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span="24">
              <Button size="large">暂存文章</Button> &nbsp;
              <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
            </Col>
            <Col>
              <br/>
              <TextArea 
              rows={4}
              placeholder="文章简介"
              value={introducemd}
              onChange={changeIntroduce}
              />
              <br/>
              <br/>
              <div className="introduce-html"
                dangerouslySetInnerHTML={{__html:introduceHtml}}
              >

              </div>
            </Col>
            <Col span={12}>
              <div className="data-select">
                <DatePicker 
                onChange={(data,dataString) => {
                  setShowDate(dataString)
                }}
                  placeholder="发布日期"  
                  size="large"
                />
                <DatePicker 
                onChange={(data,dataString) => {
                  setUpdateDate(dataString)
                }}
                  placeholder="更新时间"  
                  size="large"
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
export default AddArticle