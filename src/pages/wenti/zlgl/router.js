export default [
  {
    path: '/zhiliangList',
    name: 'zhiliangList',
    component: () =>
      import(/* webpackChunkName: "diliverylist" */ './list.vue'),
    meta: {
      level: 2,
      title: '质量管理',
      open: false,
      id: 'wtdn-zlgl'
    }
  }
];
