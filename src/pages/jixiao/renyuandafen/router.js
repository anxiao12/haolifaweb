export default [
  {
    path: '/dafenList',
    name: 'dafenList',
    component: () =>
      import(/* webpackChunkName: "diliverylist" */ './list.vue'),
    meta: {
      level: 2,
      title: '人员打分列表',
      open: false,
      id: 'jxrydfgl'
    }
  }
];
