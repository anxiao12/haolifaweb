export default [
  {
    path: '/fazuoTask',
    name: 'fazuoTask',
    component: () => import(/* webpackChunkName: "orderlist" */ './index.vue'),
    meta: {
      level: 2,
      title: '任务分配-阀座加工',
      open: false,
      id: 'rwfzjg'
    }
  }
];
