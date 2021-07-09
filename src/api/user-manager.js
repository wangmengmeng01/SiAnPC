import { makeAPI } from './httpRequest'

// 用户列表
const userListConfig = {
  // 分页查询用户list
  getList: {
    url: '/console/user/findByPage',
    method: 'post'
  },
// 组织选项下拉
  option: {
    url: '/console/organization/option',
    method: 'post'
  },
  // 封禁解封用户
  ban: {
    url: '/console/user/ban',
    method: 'post'
  }
}

// 用户详情
const userDetailConfig = {
  // 编辑资料
  findPageByUid: {
    url: '/console/userOptLog/findPageByUid',
    method: 'post'
  },
  findUserDetailByUid: {
    url: '/console/user/findUserDetailByUid',
    method: 'post'
  },
  editByUid: {
    url: '/console/user/editByUid',
    method: 'post'
  },
  deleteVoiceSignature: {
    url: '/console/user/deleteVoiceSignature',
    method: 'post'
  },
  deleteAnswer: {
    url: '/console/user/deleteAnswer',
    method: 'post'
  }
}

// 二重世界用户列表
const secondWorldUserListConfig = {
  // 分页查询用户list
  getList: {
    url: '/console/userVipIdentityRole/findByPage',
    method: 'post'
  }
}

// 用户授权
const userAuthorizeConfig = {
  // 分页查询用户list
  getList: {
    url: '/console/userAuthIdentity/findByPage',
    method: 'post'
  },
  // 为用户授权
  grantAuthIdentity: {
    url: '/console/userAuthIdentity/grantAuthIdentity',
    method: 'post'
  },
  // 取消授权
  cancelAuthIdentity: {
    url: '/console/userAuthIdentity/cancelAuthIdentity',
    method: 'post'
  }
}
// 团队管理
const teamManager = {
  // 分页查询用户list
  getList: {
    url: '/console/organization/pageList',
    method: 'post'
  },
  // 创建
  create: {
    url: '/console/organization/create',
    method: 'post'
  },
  // 组织选项下拉
  option: {
    url: '/console/organization/option',
    method: 'post'
  },
// 组织管理员/成员下拉
  userOption: {
    url: '/console/organization/userOption',
    method: 'post'
  },

}
// 团队成员列表
const peopleList = {
  // 获取成员
  getList: {
    url: '/console/organization/memberList',
    method: 'post'
  },
  // 绑定成员时可选用户列表
  userOption: {
    url: '/console/organization/userOption',
    method: 'post'
  },
  // 添加成员
  addMember: {
    url: '/console/organization/addMember',
    method: 'post'
  }
}

export default {
  '/user-manager/user-list': makeAPI(userListConfig),
  '/user-manager/user-detail': makeAPI(userDetailConfig),
  '/user-manager/second-world-user-list': makeAPI(secondWorldUserListConfig),
  '/user-manager/user-authorize': makeAPI(userAuthorizeConfig),
  '/user-manager/team-manager': makeAPI(teamManager),
  '/user-manager/team-manager-list': makeAPI(peopleList)
}
