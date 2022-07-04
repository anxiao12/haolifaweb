export default [
  {
    path: '/fukuang/list',
    name: '/fukuang-list',
    component: () =>
      import(/* webpackChunkName: "suppliermanage" */ './index.vue'),
    meta: {
      level: 2,
      title: '新增付款申请',
      open: false,
      id: 'xzfksq'
    }
  },
  {
    path: '/fukuangsq/list',
    name: '/fukuangsq-list',
    component: () =>
      import(/* webpackChunkName: "suppliermanage" */ './list.vue'),
    meta: {
      level: 2,
      title: '付款申请列表',
      open: false,
      id: 'fksqlb'
    }
  }
];
