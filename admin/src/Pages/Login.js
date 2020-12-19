import React, {useState} from 'react'
import 'antd/dist/antd.css'
import {Card,Input,Button,Spin,message} from 'antd'
import { UserOutlined,KeyOutlined } from '@ant-design/icons';
import axios from 'axios'
import servicePath from "../config/apiUrl"
import "../static/css/Login.css"
function Login(props) {
  const [userName,setUserName] = useState('')
  const [password,setPassword] = useState('')
  const [isLoading,setInLoading] = useState(false)

  const checkLogin = () => {
    setInLoading(true)
    if(!userName) {
      message.error("用户名不能为空")
      setInLoading(false)
      return false
    }else if(!password) {
      message.error("密码不能为空")
      setInLoading(false)
      return false
    }
    let dataProps = {
      userName,password
    }
    axios({
      method: 'post',
      url: servicePath.login,
      data: dataProps,
      withCredentials: true, // 共享session
    }).then(res => {
      setInLoading(false)
      if(res.data.data === "登陆成功") {
        localStorage.setItem("openId",res.data.openId )
        props.history.push('/index')
      }else {
        setInLoading(false)
        message.error("用户名密码错误")
      }
    })
  }
  return (
    <div className="login-div">
      <Spin tip="Loading..." spinning={isLoading}>
        <Card title="Default">
          <Input 
          id="userName" 
          size="large" 
          placeholder="Enter your userName" 
          prefix={<UserOutlined/>}
          onChange={e => {setUserName(e.target.value)}}
          />
          <Input 
          id="password" 
          size="large" 
          placeholder="Enter your password" 
          prefix={<KeyOutlined />}
          onChange={e => {setPassword(e.target.value)}}
          />
          <br/><br/>
          <Button type="primary" size="large" block onClick={checkLogin}>Login in </Button>
        </Card>
      </Spin>
      </div>
  )
}
export default Login