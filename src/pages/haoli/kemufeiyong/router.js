export default [
  {
    path: '/kemufeiyongList',
    name: '/kemufeiyongList',
    component: () =>
      import(/* webpackChunkName: "suppliermanage" */ './index.vue'),
    meta: {
      level: 2,
      title: '科目费用预算',
      open: false,
      id: 'kmfyys'
    }
  }
];
