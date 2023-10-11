export default [
  {
    path: '/machinesupplier/list',
    name: 'machinesupplier-list',
    component: () =>
      import(/* webpackChunkName: "suppliermanage" */ './index.vue'),
    meta: {
      level: 2,
      title: '整机供应商列表',
      open: false,
      id: 'zjgys'
    }
  },
  {
    path: '/machinesupplier/add',
    name: 'machinesupplier-add',
    component: () =>
      import(/* webpackChunkName: "suppliermanage" */ './add.vue'),
    meta: {
      level: 2,
      title: '添加整机供应商',
      open: false,
      id: 'zjgys'
    }
  },
  {
    path: '/machinePurchased-order/info',
    name: 'machinePurchased-orderinfo',
    component: () =>
      import(/* webpackChunkName: "suppliermanage" */ './info.vue'),
    meta: {
      level: 2,
      title: '详情',
      open: false,
      id: 'cglb'
    }
  },
  {
    path: '/machinePurchased-order/approveProgress',
    name: 'machinePurchased-orderapproveProgress',
    component: () =>
      import(/* webpackChunkName: "suppliermanage" */ './approveProgress.vue'),
    meta: {
      level: 2,
      title: '审批进度',
      open: false,
      id: 'parent-cggl'
    }
  }
];
