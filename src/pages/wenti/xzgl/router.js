export default [
  {
    path: '/xingzhengList',
    name: 'xingzhengList',
    component: () =>
      import(/* webpackChunkName: "xingzhengList" */ './list.vue'),
    meta: {
      level: 2,
      title: '行政管理问题',
      open: false,
      id: 'wtdn-xzgl'
    }
  }
];
