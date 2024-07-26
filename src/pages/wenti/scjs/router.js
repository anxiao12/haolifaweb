export default [
  {
    path: '/shengchanjishuList',
    name: 'shengchanjishuList',
    component: () =>
      import(/* webpackChunkName: "diliverylist" */ './list.vue'),
    meta: {
      level: 2,
      title: '生产技术管理',
      open: false,
      id: 'wtdn-scjs'
    }
  }
];
