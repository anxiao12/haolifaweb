export default [{
  path: '/entrust',
  component: () => import(/* webpackChunkName: "process" */ './index.vue'),
    meta: { level: 2, title: '机加工审批', open: false, id: 'home' },
  children: [{
    path: '',
    name: 'entrustBase',
    component: () => import(/* webpackChunkName: "applybuybase" */ './base.vue'),
      meta: { level: 2, title: '机加工审批', open: false, id: 'home' },
  }, {
    path: '',
    name: 'entrustNodes',
    component: () => import(/* webpackChunkName: "applybuynodes" */ './nodes.vue'),
      meta: { level: 2, title: '机加工审批', open: false, id: 'home' },
  }]
}]
