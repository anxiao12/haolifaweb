export default [
  {
    path: '/caiwuList',
    name: 'caiwuList',
    component: () =>
      import(/* webpackChunkName: "caiwuList" */ './list.vue'),
    meta: {
      level: 2,
      title: '财务管理问题',
      open: false,
      id: 'wtdn-cwgl'
    }
  }
];
