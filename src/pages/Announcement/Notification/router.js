export default [{
  path: '/notification',
  name: 'notification',
  component: () => import(/* webpackChunkName: "notification" */ './index.vue'),
  meta: { level: 2, title: '通知管理', open: false, id: 'tzgl' }
},{
  path: '/notification/add',
  name: 'notification-add',
  component: () => import(/* webpackChunkName: "notification" */ './add.vue'),
  meta: { level: 2, title: '新增通知', open: false, id: 'tzgl' }
},{
  path: '/notification/edit',
  name: 'notification-edit',
  component: () => import(/* webpackChunkName: "notification" */ './add.vue'),
  meta: { level: 2, title: '编辑通知', open: false, id: 'tzgl' }
},{
  path: '/notification/info',
  name: 'notification-info',
  component: () => import(/* webpackChunkName: "notification" */ './info.vue'),
  meta: { level: 2, title: '通知详情', open: false, id: 'tzgl' }
}]
