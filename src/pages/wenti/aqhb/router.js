export default [
  {
    path: '/anquanList',
    name: 'anquanList',
    component: () =>
      import(/* webpackChunkName: "anquanList" */ './list.vue'),
    meta: {
      level: 2,
      title: '安全环保管理',
      open: false,
      id: 'wtdn-aqhb'
    }
  }
];
