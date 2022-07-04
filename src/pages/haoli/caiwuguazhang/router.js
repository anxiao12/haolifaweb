export default [
  {
    path: '/cwgzList',
    name: '/cwgzList',
    component: () =>
      import(/* webpackChunkName: "suppliermanage" */ './index.vue'),
    meta: {
      level: 2,
      title: '财务挂账',
      open: false,
      id: 'cwgg'
    }
  }
];
