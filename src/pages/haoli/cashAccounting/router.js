export default [
  {
    path: '/cashAccounting',
    name: 'cashAccounting',
    component: () => import(/* webpackChunkName: "contract" */ './index.vue'),
    meta: {
      level: 2,
      title: '现金日记账',
      open: false,
      id: 'xjrjz'
    }
  }
];
