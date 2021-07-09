import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'index', affix: true, noCache: true }
    }]
  },

  {
    path: '/permission-manager',
    component: Layout,
    redirect: 'noRedirect',
    name: '权限管理',
    meta: { title: '权限管理', icon: 'peoples' },
    children: [
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/permissionManager/role/main'),
        meta: { title: '角色管理', icon: '' }
      },
      {
        path: 'operator',
        name: 'Operator',
        component: () => import('@/views/permissionManager/operator'),
        meta: { title: '操作员管理', icon: '' }
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/permissionManager/menu/index'),
        meta: { title: '菜单管理', icon: '' }
      }
    ]
  },
  {
    path: '/configuration-manager',
    component: Layout,
    redirect: 'noRedirect',
    name: '配置管理',
    meta: { title: '配置管理', icon: 'peoples' },
    children: [
      {
        path: 'config-manager',
        name: 'config-manager',
        component: () => import('@/views/commonManager/configManager'),
        meta: { title: '参数配置管理', icon: '' }
      },
      {
        path: 'source-manager',
        name: 'source-manager',
        component: () => import('@/views/configurationManager/sourceManager'),
        meta: { title: '用户来源配置', icon: '' }
      },
      {
        path: 'down-manager',
        name: 'down-manager',
        component: () => import('@/views/configurationManager/downManager'),
        meta: { title: '下载页配置', icon: '' }
      },
      {
        path: 'switch-manager',
        name: 'switch-manager',
        component: () => import('@/views/configurationManager/switchManager'),
        meta: { title: '开关配置', icon: '',  }
      },
      {
        path: 'note-manager',
        name: 'note-manager',
        component: () => import('@/views/configurationManager/noteManager'),
        meta: { title: '短信配置', icon: '' }
      },
      {
        path: 'field-manager',
        name: 'field-manager',
        component: () => import('@/views/configurationManager/fieldManager'),
        meta: { title: '用户字段配置', icon: '' }
      },
      {
        path: 'advertising-config',
        name: 'advertising-config',
        component: () => import('@/views/configurationManager/advertisingConfig'),
        meta: { title: '广告配置管理', icon: '' }
      },
      {
        path: 'call-config',
        name: 'call-config',
        component: () => import('@/views/configurationManager/callConfig'),
        meta: { title: '通话设置', icon: '' }
      }
    ]
  },
  {
    path: '/user-manager',
    component: Layout,
    alwaysShow: true,
    name: '用户管理',
    redirect: 'noRedirect',
    meta: { title: '用户管理', icon: 'tree' },
    children: [
      {
        path: 'user-list',
        name: 'User-list',
        component: () => import('@/views/userManager/userList'),
        meta: { title: '用户列表', icon: '' }
      },
      {
        path: 'team-manager',
        name: 'team-manager',
        component: () => import('@/views/userManager/teamManager/teamManager'),
        meta: { title: '团队管理', icon: '' }
      },
      {
        path: 'team-manager-list',
        name: 'team-manager-list',
        component: () => import('@/views/userManager/teamManager/teamManagerList'),
        meta: { title: '团队成员列表', icon: '' }
      },
      {
        path: 'vip-list',
        name: 'vip-list',
        component: () => import('@/views/userManager/vipList'),
        meta: { title: 'VIP列表', icon: '' }
      },
      {
        path: 'vest-list',
        name: 'vest-list',
        component: () => import('@/views/userManager/vestList'),
        meta: { title: '马甲号列表', icon: '' }
      },
      {
        path: 'user-detail',
        name: 'User-detail',
        component: () => import('@/views/userManager/userDetail'),
        meta: { title: '用户详情', icon: '' }
      },
      {
        path: 'registration-code',
        name: 'registration-code',
        component: () => import('@/views/userManager/registrationCode'),
        meta: { title: '注册码管理', icon: '' }
      },
      {
        path: 'second-world-user-list',
        name: 'Second-world-user-list',
        component: () => import('@/views/userManager/secondWorldUserList'),
        meta: { title: '二重世界用户', icon: '' }
      },
      {
        path: 'user-authorize',
        name: 'User-authorize',
        component: () => import('@/views/userManager/userAuthorize'),
        meta: { title: '用户授权', icon: '' }
      }
    ]
  },
  {
    path: '/callConfig',
    component: Layout,
    alwaysShow: true,
    name: '通话配置',
    redirect: 'noRedirect',
    meta: { title: '通话配置', icon: 'tree' },
    children: [
      {
        path: 'callRecords',
        name: 'callRecords',
        component: () => import('@/views/callConfig/callRecords'),
        meta: { title: '通话记录', icon: '' }
      }
    ]
  },
  {
    path: '/customerManagement',
    component: Layout,
    alwaysShow: true,
    name: '客服管理',
    redirect: 'noRedirect',
    meta: { title: '客服管理', icon: 'tree' },
    children: [
      {
        path: 'categorySettings',
        name: 'categorySettings',
        component: () => import('@/views/customerManagement/categorySettings'),
        meta: { title: '客服类别设置', icon: '' }
      },
      {
        path: 'vestSettings',
        name: 'vestSettings',
        component: () => import('@/views/customerManagement/vestSettings'),
        meta: { title: '客服马甲设置', icon: '' }
      },
      {
        path: 'workRecord',
        name: 'workRecord',
        component: () => import('@/views/customerManagement/workRecord'),
        meta: { title: '工作记录', icon: '' }
      },
      {
        path: 'customerControl',
        name: 'customerControl',
        component: () => import('@/views/customerManagement/customerControl'),
        meta: { title: '客服监控', icon: '' }
      }
      // {
      //   path: 'customerWorkbench',
      //   name: 'customerWorkbench',
      //   component: () => import('@/views/customerManagement/customerWorkbench'),
      //   meta: { title: '客服工作台', icon: '' }
      // }
    ]
  },
  {
    path: '/live-manager',
    component: Layout,
    alwaysShow: true,
    name: '直播管理',
    redirect: 'noRedirect',
    meta: { title: '直播管理', icon: 'tree' },
    children: [
      {
        path: 'on-air-list',
        name: 'On-air-list',
        component: () => import('@/views/liveManager/onAirList'),
        meta: { title: '正在直播', icon: '' }
      },
      {
        path: 'live-history',
        name: 'Live-history',
        component: () => import('@/views/liveManager/liveHistory'),
        meta: { title: '直播记录', icon: '' }
      },
      {
        path: 'live-recommendation',
        name: 'Live-recommendation',
        component: () => import('@/views/liveManager/liveRecommendation'),
        meta: { title: '直播推荐库', icon: '' }
      }
    ]
  },
  {
    path: '/post-manager',
    component: Layout,
    alwaysShow: true,
    name: '动态管理',
    redirect: 'noRedirect',
    meta: { title: '动态管理', icon: 'tree' },
    children: [
      {
        path: 'topic-list',
        name: 'Topic-list',
        component: () => import('@/views/postManager/topicList'),
        meta: { title: '话题列表', icon: '' }
      },
      {
        path: 'topic-detail',
        name: 'Topic-detail',
        component: () => import('@/views/postManager/topicDetail'),
        meta: { title: '话题详情', icon: '' }
      },
      {
        path: 'post-list',
        name: 'Post-list',
        component: () => import('@/views/postManager/postList'),
        meta: { title: '动态列表', icon: '' }
      },
      {
        path: 'post-recommendation',
        name: 'Post-recommendation',
        component: () => import('@/views/postManager/postRecommendation'),
        meta: { title: '动态推荐库', icon: '' }
      },
      {
        path: 'follow-recommendation',
        name: 'Follow-recommendation',
        component: () => import('@/views/postManager/followRecommendation'),
        meta: { title: '关注推荐库', icon: '' }
      }
    ]
  },
  {
    path: '/gift-manager',
    component: Layout,
    alwaysShow: true,
    name: '礼物管理',
    redirect: 'noRedirect',
    meta: { title: '礼物管理', icon: 'tree' },
    children: [
      {
        path: 'gift-list',
        name: 'Gift-list',
        component: () => import('@/views/giftManager/giftList'),
        meta: { title: '礼物列表', icon: '' }
      },
      {
        path: 'gift-history',
        name: 'Gift-history',
        component: () => import('@/views/giftManager/giftHistory'),
        meta: { title: '礼物赠送记录', icon: '' }
      }
    ]
  },
  {
    path: '/audit-manager',
    component: Layout,
    alwaysShow: true,
    name: '审核管理',
    redirect: 'noRedirect',
    meta: { title: '审核管理', icon: 'tree' },
    children: [
      {
        path: 'post-audit',
        name: 'Post-audit',
        component: () => import('@/views/auditManager/postAudit'),
        meta: { title: '动态审核', icon: '' }
      },
      {
        path: 'front-cover-audit',
        name: 'Front-cover-audit',
        component: () => import('@/views/auditManager/frontCoverAudit'),
        meta: { title: '直播封面审核', icon: '' }
      },
      {
        path: 'real-name-audit',
        name: 'Real-name-audit',
        component: () => import('@/views/auditManager/realNameAudit'),
        meta: { title: '实名审核', icon: '' }
      },
      {
        path: 'live-permission-audit',
        name: 'Live-permission-audit',
        component: () => import('@/views/auditManager/livePermissionAudit'),
        meta: { title: '直播权限审核', icon: '' }
      }
    ]
  },
  {
    path: '/currency-manager',
    component: Layout,
    alwaysShow: true,
    name: '货币管理',
    redirect: 'noRedirect',
    meta: { title: '货币管理', icon: 'tree' },
    children: [
      {
        path: 'recharge-config',
        name: 'Recharge-config',
        component: () => import('@/views/currencyManager/rechargeConfig'),
        meta: { title: '充值配置', icon: '' }
      },
      {
        path: 'recharge-history',
        name: 'Recharge-history',
        component: () => import('@/views/currencyManager/rechargeHistory'),
        meta: { title: '充值记录', icon: '' }
      },
      {
        path: 'system-recharge',
        name: 'System-recharge',
        component: () => import('@/views/currencyManager/systemRecharge'),
        meta: { title: '系统充值', icon: '' }
      }
    ]
  },
  {
    path: '/question-answer-manager',
    component: Layout,
    alwaysShow: true,
    name: '问答管理',
    redirect: 'noRedirect',
    meta: { title: '问答管理', icon: 'tree' },
    children: [
      {
        path: 'question-list',
        name: 'Question-list',
        component: () => import('@/views/questionAnswerManager/questionList'),
        meta: { title: '问题列表', icon: '' }
      },
      {
        path: 'question-answer-detail',
        name: 'Question-answer-detail',
        component: () => import('@/views/questionAnswerManager/questionAnswerDetail'),
        meta: { title: '问答详情', icon: '' }
      }
    ]
  },
  {
    path: '/announcement-manager',
    component: Layout,
    alwaysShow: true,
    name: '公告管理',
    redirect: 'noRedirect',
    meta: { title: '公告管理', icon: 'tree' },
    children: [
      {
        path: 'announcement-list',
        name: 'Announcement-list',
        component: () => import('@/views/announcementManager/announcementList'),
        meta: { title: '公告列表', icon: '' }
      },
      {
        path: 'image-text-edit',
        name: 'Image-text-edit',
        component: () => import('@/views/announcementManager/imageTextEdit'),
        meta: { title: '图文编辑', icon: '' }
      }
    ]
  },
  {
    path: '/common-manager',
    component: Layout,
    alwaysShow: true,
    name: '通用管理',
    redirect: 'noRedirect',
    meta: { title: '通用管理', icon: 'tree' },
    children: [
      {
        path: 'version-update',
        name: 'Version-update',
        component: () => import('@/views/commonManager/versionUpdate'),
        meta: { title: '版本更新管理', icon: '' }
      },
      {
        path: 'agreement',
        name: 'agreement',
        component: () => import('@/views/commonManager/agreement'),
        meta: { title: '协议管理', icon: '' }
      },
      {
        path: 'user-individuality-tag',
        name: 'User-individuality-tag',
        component: () => import('@/views/commonManager/userIndividualityTag'),
        meta: { title: '用户个性标签库', icon: '' }
      },
      {
        path: 'user-impression-tag',
        name: 'User-impression-tag',
        component: () => import('@/views/commonManager/userImpressionTag'),
        meta: { title: '用户印象标签库', icon: '' }
      },
      {
        path: 'audio-sign',
        name: 'Audio-sign',
        component: () => import('@/views/commonManager/audioSign'),
        meta: { title: '语音签名库', icon: '' }
      },
      {
        path: 'accost',
        name: 'Accost',
        component: () => import('@/views/commonManager/accost'),
        meta: { title: '搭讪库', icon: '' }
      },
      {
        path: 'pull-refresh-text',
        name: 'Pull-refresh-text',
        component: () => import('@/views/commonManager/pullRefreshText'),
        meta: { title: '下拉刷新文案库', icon: '' }
      }

    ]
  },
  {
    path: '/personal-show-manager',
    component: Layout,
    alwaysShow: true,
    name: '个人秀管理',
    redirect: 'noRedirect',
    meta: { title: '个人秀管理', icon: 'tree' },
    children: [
      {
        path: 'personal-show-list',
        name: 'Personal-show-list',
        component: () => import('@/views/personalShowManager/personalShowList'),
        meta: { title: '个人秀列表', icon: '' }
      },
      {
        path: 'personal-show-audit',
        name: 'Personal-show-audit',
        component: () => import('@/views/personalShowManager/personalShowAudit'),
        meta: { title: '个人秀审核', icon: '' }
      },
      {
        path: 'personal-show-like',
        name: 'Personal-show-like',
        component: () => import('@/views/personalShowManager/personalShowLike'),
        meta: { title: '个人秀点赞列表', icon: '' }
      }
    ]
  },
  {
    path: '/experience-card-manager',
    component: Layout,
    alwaysShow: true,
    name: '体验卡管理',
    redirect: 'noRedirect',
    meta: { title: '体验卡管理', icon: 'tree' },
    children: [
      {
        path: 'book-history',
        name: 'Book-history',
        component: () => import('@/views/experienceCardManager/bookHistory'),
        meta: { title: '体验卡预约记录', icon: '' }
      },
      {
        path: 'give-out-history',
        name: 'Give-out-history',
        component: () => import('@/views/experienceCardManager/giveOutHistory'),
        meta: { title: '体验卡发放记录', icon: '' }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    hidden: true,
    redirect: '/profile/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/personalCenter/index'),
        name: '个人中心',
        meta: { title: '个人中心', noCache: true }
      }
    ]
  },
  {
    path: '/club-manager',
    component: Layout,
    alwaysShow: true,
    name: '俱乐部管理',
    redirect: 'noRedirect',
    meta: { title: '俱乐部管理', icon: 'tree' },
    children: [
      {
        path: 'club-list',
        component: () => import('@/views/clubManager/clubList'),
        name: '俱乐部列表',
        meta: { title: '俱乐部列表', noCache: true }
      },
      {
        path: 'club-detail',
        name: 'club-detail',
        component: () => import('@/views/clubManager/clubDetail'),
        meta: { title: '俱乐部详情', icon: '' }
      },
      {
        path: 'recommend-lib',
        component: () => import('@/views/clubManager/recommendLib'),
        name: '新人申请推荐库',
        meta: { title: '新人申请推荐库', noCache: true }
      },
      {
        path: 'task-record',
        component: () => import('@/views/clubManager/taskRecord'),
        name: '任务发布记录',
        meta: { title: '任务发布记录', noCache: true }
      },
      {
        path: 'mood-record',
        component: () => import('@/views/clubManager/moodRecord'),
        name: '心情发布记录',
        meta: { title: '心情发布记录', noCache: true }
      },
      {
        path: 'application-record',
        component: () => import('@/views/clubManager/applicationRecord'),
        name: '新人申请记录',
        meta: { title: '新人申请记录', noCache: true }
      },
      {
        path: 'red-packet',
        component: () => import('@/views/clubManager/redPacket'),
        name: '俱乐部红包记录',
        meta: { title: '俱乐部红包记录', noCache: true }
      },
      {
        path: 'bind-record',
        component: () => import('@/views/clubManager/bindRecord'),
        name: '绑定记录',
        meta: { title: '绑定记录', noCache: true }
      },
      {
        path: 'bind-man-num',
        component: () => import('@/views/clubManager/bindManNum'),
        name: '绑定人数',
        meta: { title: '绑定人数', noCache: true }
      }
    ]
  },
  {
    path: '/channel-manager',
    component: Layout,
    alwaysShow: true,
    name: '世界频道管理',
    redirect: 'noRedirect',
    meta: { title: '世界频道管理', icon: 'tree' },
    children: [
      {
        path: 'redpacket-grant',
        component: () => import('@/views/channelManager/redPacketGrant'),
        name: '红包发放记录',
        meta: { title: '红包发放记录', noCache: true }
      },
      {
        path: 'pay-record',
        component: () => import('@/views/channelManager/payRecord'),
        name: '付费消息记录',
        meta: { title: '付费消息记录', noCache: true }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
