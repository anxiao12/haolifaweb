export default [{
  path: '/produce',
  component: () => import(/* webpackChunkName: "process" */ './index.vue'),
    meta: { level: 2, title: '生产审批', open: false, id: 'home' },
  children: [{
    path: '',
    name: 'produceBase',
    component: () => import(/* webpackChunkName: "applybuybase" */ './base.vue'),
      meta: { level: 2, title: '生产审批', open: false, id: 'home' },
  }, {
    path: 'produceNodes',
    name: 'produceNodes',
    component: () => import(/* webpackChunkName: "applybuynodes" */ './nodes.vue')
  }]
}]
