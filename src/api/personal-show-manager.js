import { makeAPI } from './httpRequest'

// 个人秀审核
const personalShowAuditConfig = {
  getList: {
    url: '/console/userShow/findUploadShowByPage',
    method: 'post'
  },
  audit: {
    url: '/console/userShow/auditShow',
    method: 'post'
  }
}

// 个人秀点赞列表
const personalShowLike = {
  getList: {
    url: '/console/userShow/findLikeShowByPage',
    method: 'post'
  }
}
// 个人秀列表
const personalShowList = {
  getList: {
    url: '/console/userShow/showByPage',
    method: 'post'
  },
  online: {
    url: '/console/userShow/online',
    method: 'post'
  },
  offline: {
    url: '/console/userShow/offline',
    method: 'post'
  },
}

export default {
  '/personal-show-manager/personal-show-list': makeAPI(personalShowList),
  '/personal-show-manager/personal-show-audit': makeAPI(personalShowAuditConfig),
  '/personal-show-manager/personal-show-like': makeAPI(personalShowLike)
}
