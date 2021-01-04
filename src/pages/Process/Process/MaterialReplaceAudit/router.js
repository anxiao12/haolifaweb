export default [{
  path: '/replace',
  component: () => import(/* webpackChunkName: "process" */ './index.vue'),
    meta: { level: 2, title: '替换料审批', open: false, id: 'home' },
  children: [{
    path: '',
    name: 'replaceBase',
    component: () => import(/* webpackChunkName: "applybuybase" */ './base.vue'),
      meta: { level: 2, title: '生产审批', open: false, id: 'home' },
  }]
}]
