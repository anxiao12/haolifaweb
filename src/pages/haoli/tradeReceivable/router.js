export default [
  {
    path: '/tradeReceivable',
    name: '/tradeReceivable',
    component: () =>
      import(/* webpackChunkName: "suppliermanage" */ './index.vue'),
    meta: {
      level: 2,
      title: '应收货款',
      open: false,
      id: 'yskx'
    }
  }
];
