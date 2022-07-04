export default [
  {
    path: '/khzb',
    name: 'khzb-list',
    component: () =>
      import(/* webpackChunkName: "diliverylist" */ './list.vue'),
    meta: {
      level: 2,
      title: '考核指标列表',
      open: false,
      id: 'khzb'
    }
  }
];
