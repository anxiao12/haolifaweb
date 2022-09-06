export default [
  {
    path: '/companyList',
    name: '/companyList',
    component: () =>
      import(/* webpackChunkName: "suppliermanage" */ './index.vue'),
    meta: {
      level: 2,
      title: '公司单位',
      open: false,
      id: 'gsdw'
    }
  }
];
