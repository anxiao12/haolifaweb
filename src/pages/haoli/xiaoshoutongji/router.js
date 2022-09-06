export default [
  {
    path: '/xiaoshoutongjiList',
    name: '/xiaoshoutongjiList',
    component: () =>
      import(/* webpackChunkName: "suppliermanage" */ './index.vue'),
    meta: {
      level: 2,
      title: '销售合同汇总统计',
      open: false,
      id: 'xshthztj'
    }
  }
];
