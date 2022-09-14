export default [
  {
    path: '/projectList',
    name: '/projectList',
    component: () =>
      import(/* webpackChunkName: "suppliermanage" */ './index.vue'),
    meta: {
      level: 2,
      title: '项目管理',
      open: false,
      id: 'xmgl'
    }
  }
];
