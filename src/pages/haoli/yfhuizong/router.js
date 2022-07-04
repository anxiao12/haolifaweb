export default [
  {
    path: '/yfhzList',
    name: '/yfhzList',
    component: () =>
      import(/* webpackChunkName: "suppliermanage" */ './index.vue'),
    meta: {
      level: 2,
      title: '应付汇总',
      open: false,
      id: 'yfhz'
    }
  }
];
