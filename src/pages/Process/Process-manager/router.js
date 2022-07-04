export default [{
    path: '/process-manager',
    name: 'processmanager',
    component: () => import( /* webpackChunkName: "process" */ './index.vue'),
    meta: {
      level: 2,
      title: '流程管理',
      open: false,
      id: 'lcgl'
    }
  }, {
    path: '/process-manager/info',
    name: 'processmanager-info',
    component: () => import( /* webpackChunkName: "process" */ './info.vue'),
    meta: {
      level: 2,
      title: '流程管理详情',
      open: false,
      id: 'lcgl'
    }
  }

]