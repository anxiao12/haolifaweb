export default [
  {
    path: '/caigoutongjiList',
    name: '/caigoutongjiList',
    component: () =>
      import(/* webpackChunkName: "suppliermanage" */ './index.vue'),
    meta: {
      level: 2,
      title: '采购合同汇总统计',
      open: false,
      id: 'cghthztj'
    }
  }
];
