export default [
  {
    path: '/paymentApply',
    name: 'paymentApply',
    component: () =>
      import(/* webpackChunkName: "suppliermanage" */ './index.vue'),
    meta: {
      level: 2,
      title: '付款申请审批',
      open: false,
      id: 'home'
    }
  },
  {
    path: '/jkfkEntrust',
    name: 'jkfkEntrust',
    component: () =>
      import(/* webpackChunkName: "suppliermanage" */ './jkfkEntrust.vue'),
    meta: {
      level: 2,
      title: '借款申请审批',
      open: false,
      id: 'home'
    }
  },
  {
    path: '/baoxiaoEntrust',
    name: 'baoxiaoEntrust',
    component: () =>
      import(/* webpackChunkName: "suppliermanage" */ './baoxiaoEntrust.vue'),
    meta: {
      level: 2,
      title: '报销申请审批',
      open: false,
      id: 'home'
    }
  }
];
