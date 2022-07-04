export default [
  {
    path: '/zikongTask',
    name: 'zikongTask',
    component: () => import(/* webpackChunkName: "orderlist" */ './index.vue'),
    meta: {
      level: 2,
      title: '任务分配-自控加工',
      open: false,
      id: 'rwzkjg'
    }
  }
];
