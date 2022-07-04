export default [
  {
    path: '/ryjtList',
    name: 'ryjtList',
    component: () =>
      import(/* webpackChunkName: "diliverylist" */ './list.vue'),
    meta: {
      level: 2,
      title: '管理人员计提列表',
      open: false,
      id: 'glryjtlb'
    }
  }
];
