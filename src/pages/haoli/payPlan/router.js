export default [
  {
    path: '/pay/planList',
    name: '/pay-planList',
    component: () =>
      import(/* webpackChunkName: "suppliermanage" */ './index.vue'),
    meta: {
      level: 2,
      title: '付款计划',
      open: false,
      id: 'fkjh'
    }
  }
];
