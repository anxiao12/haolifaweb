export default [
  {
    path: '/jiaoxiaobanzu',
    name: 'jiaoxiaobanzu-list',
    component: () =>
      import(/* webpackChunkName: "diliverylist" */ './list.vue'),
    meta: {
      level: 2,
      title: '班组列表',
      open: false,
      id: 'bzlb'
    }
  }
];
