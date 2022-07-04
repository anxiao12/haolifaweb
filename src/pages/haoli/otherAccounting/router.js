export default [
  {
    path: '/otherAccounting',
    name: 'otherAccounting',
    component: () => import(/* webpackChunkName: "contract" */ './index.vue'),
    meta: {
      level: 2,
      title: '其他货币资金日记账',
      open: false,
      id: 'qtrjz'
    }
  }
];
