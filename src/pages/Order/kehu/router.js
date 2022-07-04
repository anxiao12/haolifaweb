export default [
  {
    path: '/khglList',
    name: 'khgl',
    component: () => import(/* webpackChunkName: "orderlist" */ './index.vue'),
    meta: {
      level: 2,
      title: '客户管理',
      open: false,
      id: 'khgl'
    }
  }
];
