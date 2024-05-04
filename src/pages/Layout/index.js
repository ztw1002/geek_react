import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {clearUserInfo, fetchUserInfo} from '@/store/module/user'


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
    const path = route.key
    navigate(path)
  }

  // 反向高亮
  const location = useLocation()
  const selectedKey = location.pathname

  // 触发个人用户信息 action
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])

  const name = useSelector(state=> state.user.userInfo.name)

  // 退出登录确认
  const onConfirm = () => {
    dispatch(clearUserInfo())
    navigate('/login')
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}>
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
            selectedKeys={selectedKey}
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