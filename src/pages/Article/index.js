import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm } from 'antd'
// import 'moment/locale/zh-cn'
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import img404 from '@/assets/error.png'

// 引入汉化包，时间选择器
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'
import { useChannel } from '@/hooks/useChannel'
import { delArticleAPI, getArticleListAPI } from '@/apis/article'
import { useEffect, useState } from 'react'

const { Option } = Select
const { RangePicker } = DatePicker


const Article = () => {
  const navigate = useNavigate()
  const {channelList} = useChannel()

  // 数据
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width:120,
      render: cover => {
        return <img src={cover || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      // data - 后端返回的状态 status，根据他做条件渲染
      render: data => data === 1 ? <Tag color="warning">待审核</Tag> : <Tag color="green">审核通过</Tag>
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} 
              onClick={() => navigate(`/publish?id=${data.id}`)} 
            />
              <Popconfirm
                title="删除文章"
                description="确认要删除当前文章吗?"
                onConfirm={() => onConfirm(data)}
                onCancel={null}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="primary"
                  danger
                  shape="circle"
                  icon={<DeleteOutlined />}
                />
              </Popconfirm>
          </Space>
        )
      }
    }
  ]

  const data = [
      {
          id: '8218',
          comment_count: 0,
          cover: {
            images:['http://geek.itheima.net/resources/images/15.jpg'],
          },
          like_count: 0,
          pubdate: '2019-03-11 09:00:00',
          read_count: 2,
          status: 2,
          title: 'wkwebview离线化加载h5资源解决方案' 
      }
  ]

    //筛选
    const [reqData, setReqData] = useState({
      status: '',
      channel_id:'',
      begin_pubdate:'',
      end_pubdate:'',
      page: 1,
      per_page: 4
    })

  const [list, setList] = useState([])
  const [count, setCount] = useState(0)


  useEffect(() => {
    async function getList() {
      const res = await getArticleListAPI(reqData)
      setList(res.data.results)
      setCount(res.data.total_count)
    }
    getList()
  },[reqData])



  // 获取筛选数据
  const onFinish = (formValue) => {
    // 把表单收集到的数据放到参数中
    setReqData({
      ...reqData,
      channel_id: formValue.channel_id,
      status: formValue.status,
      begin_pubdate: formValue.date[0].format("YYYY-MM-DD"),
      end_pubdate: formValue.date[1].format("YYYY-MM-DD"),
    })

    // 重新拉取文章列表 复用
  }

  const onPageChange = (page) => {
    // 修改参数依赖项，引发数据的重新获取列表渲染
    setReqData({
      ...reqData,
      page: page
    })
  }

  const onConfirm = async (data) => {
    await delArticleAPI(data.id)
    setReqData({
      ...reqData
    })
  }

  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: '' }} onFinish={onFinish} >
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={null}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              defaultValue="推荐"
              style={{ width: 120 }}
            >
              {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      
      {/* 表格区域 */}
      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={list} pagination={{
          total: count,
          pageSize:reqData.per_page,
          onChange: onPageChange
        }}/>
      </Card>
    </div>
  )
}

export default Article