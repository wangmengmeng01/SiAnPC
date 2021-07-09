import { makeAPI } from './httpRequest'

// 客服工作台
const customerWorkbenchConfig = {
  // 客服-获取工作状态以及统计数据
  getWorkerTodayStatistics: {
    url: '/console/csr/desk/cs/getWorkerTodayStatistics',
    method: 'post'
  },
// 编辑资料
  findPageByUid: {
    url: '/console/userOptLog/findPageByUid',
    method: 'post'
  },
  // 客服-设置工作状态
  setWorkerStatus: {
    url: '/console/csr/desk/cs/setWorkerStatus',
    method: 'post'
  },
  // 客服-获取所有客服分类
  categories: {
    url: '/console/csr/desk/cs/categories',
    method: 'post'
  },
  // 获取客服会话列表
  sessionList: {
    url: '/console/csr/desk/cs/sessionList',
    method: 'post'
  },
  // 打开会话
  openSession: {
    url: '/console/csr/desk/cs/openSession',
    method: 'post'
  },
  // 客服备忘录-分页列表
  remarkFindByPage: {
    url: '/console/csr/desk/memos/findByPage',
    method: 'post'
  },
  // 客服备忘录-新增
  remarkAdd: {
    url: '/console/csr/desk/memos/create',
    method: 'post'
  },
  // 客服会话-历史接待分页记录
  receptionRecord: {
    url: '/console/csr/desk/session/findByPage',
    method: 'post'
  },
  // 客服会话-结束任务
  closeSession: {
    url: '/console/csr/desk/session/endTask',
    method: 'post'
  },
  // 客服-搜索用户
  searchUserPacker: {
    url: '/console/csr/desk/cs/searchUserPacker',
    method: 'post'
  },
  // 获取未联系客户列表
  findNewUserPool: {
    url: '/console/csr/desk/cs/findNewUserPool',
    method: 'post'
  },
  // 发送消息
  pushMessage: {
    url: '/console/csr/desk/cs/message/push',
    method: 'post'
  },
  // 消息列表
  messageList: {
    url: '/console/csr/desk/cs/message/list',
    method: 'post'
  }
}

export default {
  '/customerManagement/customerWorkbench': makeAPI(customerWorkbenchConfig),
  '/user-manager/user-detail': makeAPI(customerWorkbenchConfig)
}
