export default [
  {
    path: '/kemuList',
    name: '/kemuList',
    component: () =>
      import(/* webpackChunkName: "suppliermanage" */ './index.vue'),
    meta: {
      level: 2,
      title: '科目管理',
      open: false,
      id: 'kmgl'
    }
  }
];
