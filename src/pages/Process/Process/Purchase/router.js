export default [{
  path: '/purchase',
  component: () => import(/* webpackChunkName: "process" */ './index.vue'),
    meta: { level: 2, title: '采购审批', open: false, id: 'home' },
  children: [{
    path: '',
    name: 'purchaseBase',
    component: () => import(/* webpackChunkName: "applybuybase" */ './base.vue'),
      meta: { level: 2, title: '采购审批', open: false, id: 'home' },
  }, {
    path: '',
    name: 'purchaseNodes',
    component: () => import(/* webpackChunkName: "applybuynodes" */ './nodes.vue'),
      meta: { level: 2, title: '采购审批', open: false, id: 'home' },
  }]
}]
