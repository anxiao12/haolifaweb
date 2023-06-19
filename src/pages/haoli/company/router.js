export default [
  {
    path: '/companyList',
    name: '/companyList',
    component: () =>
      import(/* webpackChunkName: "suppliermanage" */ './index.vue'),
    meta: {
      level: 2,
      title: '对公账号管理',
      open: false,
      id: 'gsdw'
    }
  }
];
