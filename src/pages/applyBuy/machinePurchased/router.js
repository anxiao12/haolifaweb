export default [
  {
    path: '/machinePurchased-order/list',
    name: 'machinePurchased-order',
    component: () =>
      import(/* webpackChunkName: "suppliermanage" */ './index.vue'),
    meta: {
      level: 2,
      title: '整机采购合同列表',
      open: false,
      id: 'zjcglb'
    }
  },
  {
    path: '/machinePurchased-order/addList',
    name: 'machinePurchased-orderaddlist',
    component: () =>
      import(/* webpackChunkName: "suppliermanage" */ './addList.vue'),
    meta: {
      level: 2,
      title: '新增整机采购合同列表',
      open: false,
      id: 'xzcght'
    }
  },
  {
    path: '/machinePurchased-order/add',
    name: 'machinePurchased-orderadd',
    component: () =>
      import(/* webpackChunkName: "suppliermanage" */ './add.vue'),
    meta: {
      level: 2,
      title: '新增整机采购',
      open: false,
      id: 'xzcght'
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
