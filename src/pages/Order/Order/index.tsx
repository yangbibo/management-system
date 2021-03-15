import React, { Fragment, useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import moment from 'moment';
import { Card, Divider,Popconfirm,message, InputNumber,Modal, Input,Row,Col,Button,Form, DatePicker, Select, Table } from 'antd';
import {queryRule,deleteRule,markRule,chargeBackRule,exportRule,alarmRule,cancleRule,queryUserRule} from './service';

export type TableListItem = {
  id: number;//订单编号
  user: { icon: string, id: number, name: string, phone: string },
  userName: string,//姓名
  telNumber: number;//手机
  detailInfo: string;//地址
  inviteUser: string;//推广员
  dinnerCount: number;//剩余配送次数
  dates: string[];//配送日期
  status: string;//'用餐中' | '取消' | '待支付';//状态
  createdAt: string;//创建时间
  payAt: string;//付款时间
  priceRMB: number;//商品价格
  deliveryRMB: number;//配送费
  comment: string;//评论
};

const Index = () => {
  const [form] = Form.useForm();
  const [list, setList] = useState<TableListItem[]>([]);
  const [pageInfo,setPageInfo] = useState({page:1,pageSize:1,total:0});
  const [filterCondition,setFilterCondition] = useState({keyword:'',start_date:'',end_date:'',inviteUser:''});//筛选条件
  const [chargeBackInfo,setChargeBackInfo] = useState<{visible:boolean,info?:{id:number,money:number}}>({visible:false})//退单弹窗
  const [markInfo,setMarkInfo] = useState<{visible:boolean,info?:{id:number,comment:string}}>({visible:false})//备注弹窗
  const [userList,setUserList] = useState<{id:number,name:string}[]>([])
  const columns = [
    {
      title: '订单编号',
      dataIndex: 'id',
      width: 100
    },
    {
      title: '头像',
      dataIndex: 'user',
      render: (info: { icon: string, id: number, name: string, phone: string }) => {
        return <div>
          <img src={info.icon} alt="用户头像" />
          <p>{info.name}</p>
        </div>
      }
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      width: 100
    },
    {
      title: '手机',
      dataIndex: 'telNumber',
      width: 100
    },
    {
      title: '地址',
      dataIndex: 'detailInfo',
      width: 100
    },
    {
      title: '推广员',
      dataIndex: 'inviteUser',
      width: 100
    },
    {
      title: '剩余配送次数',
      dataIndex: 'dinnerCount',
      render: (count: number, record: TableListItem) => {
        return <div>
          {count}次
          <div>{record.dates}</div>
        </div>
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status: '用餐中' | '取消' | '待支付') => {
        switch (status) {
          case '取消':
            return <span style={{ color: 'red' }}>{status}</span>
          case '待支付':
            return <span style={{ color: 'rgb(18, 0, 255)' }}>{status}</span>
          default:
            return <span style={{ color: 'rgb(122, 139, 195)' }}>{status}</span>
        }
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
    {
      title: '付款时间',
      dataIndex: 'payAt',
      width: 100
    },
    {
      title: '支付金额',
      dataIndex: 'priceRMB',
      render: (price: number, record: TableListItem) => {
        return price + record.deliveryRMB
      }
    },
    {
      title: '操作',
      dataIndex: 'status',
      render: (status: '用餐中' | '取消' | '待支付',record:TableListItem) => {
        switch (status) {
          case '取消':
            return <Fragment>
              <Popconfirm
                title='确定要删除此订单吗？'
                onConfirm={()=>{deleteRequest(record.id)}}
              >
                <span style={{ color: 'red' }}>删除</span>
              </Popconfirm>
              <Divider type='vertical'/>
              <span style={{ color: '#1890ff',cursor:'pointer' }} 
                onClick={()=>{setMarkInfo({visible:true,info:{id:record.id,comment:record.comment}})}}
              >备注</span>
            </Fragment>
          case '待支付':
            return <Fragment>
              <span style={{ color: 'red',cursor:'pointer' }} 
                onClick={()=>{setChargeBackInfo({visible:true,info:{id:record.id,money:record.priceRMB+record.deliveryRMB}})}}
              >退单</span>
              <Divider type='vertical'/>
              <span style={{ color: '#1890ff',cursor:'pointer' }} 
                onClick={()=>{setMarkInfo({visible:true,info:{id:record.id,comment:record.comment}})}}
              >备注</span>
            </Fragment>
          default:
            return <Fragment>
              <Popconfirm
                title='确定要提醒支付吗？'
                onConfirm={()=>{alarmRequest(record.id)}}
              >
                <span style={{ color: '#1890ff' }}>提醒支付</span>
              </Popconfirm>
              <Divider type='vertical'/>
              <span style={{ color: '#1890ff',cursor:'pointer' }} 
                onClick={()=>{setMarkInfo({visible:true,info:{id:record.id,comment:record.comment}})}}
              >备注</span>
              <Divider type='vertical'/>
              <Popconfirm
                title='确定要取消此订单吗？'
                onConfirm={()=>{cancelRequest(record.id)}}
              >
                <span style={{ color: 'red' }}>取消</span>
              </Popconfirm>
            </Fragment>
        }
      }
    },
  ]
  useEffect(() => {
    getList();
    getUserList();
  },[])
  useEffect(()=>{
    getList(false);
  },[pageInfo])
  const getUserList = async () => {
    let list = [
      {id:1,name:'zahngsan'},
      {id:2,name:'lisi'},
      {id:3,name:'wangwu'}
    ]
    // const list = await queryUserRule();
    setUserList(list)
  }
  const getList = async (startPage = true) => {
    let params = {
      ...filterCondition,
      page:pageInfo.page,
      pageSize:pageInfo.pageSize
    }
    if(startPage){
      params.page = 1;
    }
    const list = [
      {
        id: 121,//订单编号
        user: { icon: '', id: 1222, name: 'lietou', phone: '12222222' },
        userName: 'sansan',//姓名
        telNumber: 13122220090,//手机
        detailInfo: 'wenzhijie',//地址
        inviteUser: 'zhangchongming',//推广员
        dinnerCount: 5,
        dates: ['8-22','1-7'],
        status: '待支付',
        createdAt: '2020-11-12',
        payAt: '2020-12-11',
        priceRMB: 16,
        deliveryRMB: 3,
        comment: 'zhishipinglun',
      },
      {
        id: 99,//订单编号
        user: { icon: '', id: 1222, name: 'lietou', phone: '12222222' },
        userName: 'sansan',//姓名
        telNumber: 13122220090,//手机
        detailInfo: 'wenzhijie',//地址
        inviteUser: 'zhangchongming',//推广员
        dinnerCount: 5,
        dates: ['8-22','1-7'],
        status: '取消',
        createdAt: '2020-11-12',
        payAt: '2020-12-11',
        priceRMB: 16,
        deliveryRMB: 3,
        comment: 'zhishipinglun',
      }
    ]
    // const list =await queryRule(params);
    setList(list);
    // setPageInfo()
  }
  const deleteRequest = async (id:number) => {
    console.log(id);
    const success = await deleteRule({id})
    if(success){
      message.success('删除成功');
      getList();
    }
  }
  //提醒
  const alarmRequest = async (id:number) => {
    const success = await alarmRule({id})
    if(success){
      message.success('提醒成功');
      getList();
    }
  }
  //取消订单
  const cancelRequest = async (id:number) => {
    const success = await cancleRule({id})
    if(success){
      message.success('取消成功');
      getList();
    }
  }
  const handleChangeMoney = (money:number) => {
    setChargeBackInfo({
      visible:true,
      info:{
        id:chargeBackInfo.info?.id as number,
        money
      }
    })
  }
  //退单
  const chargeBackRequest = async() => {
    const success = await chargeBackRule({id:chargeBackInfo.info?.id,money:chargeBackInfo.info?.money})
    if(success){
      message.success('退单成功');
      setChargeBackInfo({visible:false})
      getList();
    }
  }
  const handleChangeComment = (e:any) => {
    setMarkInfo({
      visible:true,
      info:{
        id:chargeBackInfo.info?.id as number,
        comment:e.target.value
      }
    })
  }
  //备注
  const commentRequest = async() => {
    const success = await markRule({id:markInfo.info?.id,comment:markInfo.info?.comment})
    if(success){
      setMarkInfo({visible:false})
      getList();
    }
  }
  //导出
  const exportRequest = async() => {
    let params = {
      ...filterCondition
    }
    const success =await exportRule(params);
    if(success){
      console.log('执行导出操作')
    }
  }
  //重置
  const onReset = () => {
    form.resetFields();
    setFilterCondition({keyword:'',start_date:'',end_date:'',inviteUser:''})
  }
  //翻页
  const handleTableChange = (pagination:any) => {
    setPageInfo({
      page:pagination.current,
      pageSize:pagination.pageSize,
      total:pageInfo.total
    })
  }
  const onFormChange = (ChangeValue:any,values:any) => {
    console.log(ChangeValue,values)
    let filterCondition = {
      keyword:values.id as string,
      start_date:values.date?moment(values.date[0]).format('YYYYMMDD'):'',
      end_date:values.date?moment(values.date[1]).format('YYYYMMDD'):'',
      inviteUser:values.user as string
    }
    setFilterCondition(filterCondition);
  }
  const onFinish = () => {
    console.log(filterCondition);
    getList();
  }
  return <PageHeaderWrapper title={false}>
    <Card>
      <Row>
        <Col span={22}>
          <Form 
            layout='inline'
            form={form}
            onFinish={onFinish}
            onValuesChange={onFormChange}
            style={{marginBottom:10}}
          >
            <Form.Item name='id' label='查询订单'>
              <Input placeholder='请输入订单ID或手机号'/>
            </Form.Item>
            <Form.Item name='date' label='查询范围'>
              <DatePicker.RangePicker format='YYYY-MM-DD'/>
            </Form.Item>
            <Form.Item name='user' label='推广员'>
              <Select style={{width:160}}>
                {
                  userList.map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)
                }
              </Select>
            </Form.Item>
            <Form.Item><Button htmlType='submit'>查询</Button></Form.Item>
            <Form.Item><Button htmlType='button' onClick={onReset}>重置</Button></Form.Item>
          </Form>
        </Col>
        <Col span={2}><Button onClick={exportRequest}>导出</Button></Col>
      </Row>
      <Table rowKey='id' columns={columns} dataSource={list} pagination={{current:pageInfo.page,pageSize:pageInfo.pageSize}} onChange={handleTableChange}/>
    </Card>
    <Modal
      title='退单'
      visible={chargeBackInfo.visible}
      onCancel={()=>{setChargeBackInfo({visible:false})}}
      onOk={chargeBackRequest}
    >
      退款金额：<InputNumber value={chargeBackInfo.info?.money} onChange={handleChangeMoney}/>
    </Modal>
    <Modal
      title='修改备注'
      visible={markInfo.visible}
      onCancel={()=>{setMarkInfo({visible:false})}}
      onOk={commentRequest}
    >
      退款金额：<Input.TextArea value={markInfo.info?.comment} onChange={handleChangeComment}/>
    </Modal>
  </PageHeaderWrapper>
}

export default Index;