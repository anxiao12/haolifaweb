export default [
  {
    path: '/jiaoxiaonengli',
    name: 'jiaoxiaonengli-list',
    component: () =>
      import(/* webpackChunkName: "diliverylist" */ './list.vue'),
    meta: {
      level: 2,
      title: '生产能力列表',
      open: false,
      id: 'scnl'
    }
  }
];
