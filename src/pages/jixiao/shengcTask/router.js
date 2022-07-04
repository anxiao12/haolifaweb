export default [
  {
    path: '/shengcTask',
    name: 'shengcTask',
    component: () => import(/* webpackChunkName: "orderlist" */ './index.vue'),
    meta: {
      level: 2,
      title: '任务分配-生产订单',
      open: false,
      id: 'rwscddlb'
    }
  }
];
