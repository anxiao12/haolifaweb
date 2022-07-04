export default [
  {
    path: '/bankAccounting',
    name: 'bankAccounting',
    component: () => import(/* webpackChunkName: "contract" */ './index.vue'),
    meta: {
      level: 2,
      title: '银行日记账',
      open: false,
      id: 'yhrjz'
    }
  }
];
