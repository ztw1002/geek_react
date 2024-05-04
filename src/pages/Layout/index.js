import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { Outlet, Link, useNavigate } from 'react-router-dom'

const { Header, Sider } = Layout
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem(<Link to="/">数据概览</Link>, "/", <HomeOutlined />),
  getItem(
  <Link to="/article">内容管理</Link>,
"/article",
  <DiffOutlined />
  ),
  getItem(
    <Link to="/publish">发布文章</Link>,
"/publish",
  <EditOutlined />
  ),
  ];

const GeekLayout = () => {
  const navigate = useNavigate()
  const onMenuClick = (route) => {
    console.log(route)
    const path = route.key
    navigate(path)
  }
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">user.name</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            onClick={onMenuClick}
            items={items}
            mode="inline"
            theme="dark"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
          >
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet /> 
        </Layout>
      </Layout>
    </Layout>
  )
}

export default GeekLayout