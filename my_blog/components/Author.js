import { Avatar, Divider } from 'antd'
import {
  GithubOutlined,
  QqOutlined,
  WechatOutlined
} from '@ant-design/icons';
import "../styles/components/author.scss"
const Author = () => {
  return (
    <div className="author-div comm-box">
      <div>
        <Avatar size={100} src="https://mrxwq.github.io/images/IMG_0467.JPG" /></div>
      <div className="author-introduction">精神小伙
        <Divider>社交账号</Divider>
        <Avatar size={28} className="account"><GithubOutlined /></Avatar>
        <Avatar size={28} className="account" ><QqOutlined /></Avatar>
        <Avatar size={28} className="account" ><WechatOutlined /></Avatar>
      </div>

    </div>
  )
}
export default Author