export default [
  {
    path: '/jiaoxiaogongxu',
    name: 'jiaoxiaogongxu-list',
    component: () =>
      import(/* webpackChunkName: "diliverylist" */ './list.vue'),
    meta: {
      level: 2,
      title: '工序明细列表',
      open: false,
      id: 'gxlb'
    }
  }
];
