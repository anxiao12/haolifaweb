export default [{
  path: '/supplierAudit',
  component: () => import(/* webpackChunkName: "process" */ './index.vue'),
    meta: { level: 2, title: '供应商合格审批', open: false, id: 'home' },
  children: [{
    path: '',
    name: 'supplierAuditBase',
    component: () => import(/* webpackChunkName: "applybuybase" */ './base.vue'),
      meta: { level: 2, title: '供应商合格审批', open: false, id: 'home' },
  }]
}, {
    path: '/process/supplier/:id',
    name: 'supplier-info',
    component: () => import( /* webpackChunkName: "supplieradd" */ './info.vue'),
    meta: {level: 2,title: '供应商详情', open: false, id: 'home'}
}]
