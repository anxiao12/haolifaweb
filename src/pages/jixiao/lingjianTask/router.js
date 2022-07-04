export default [
  {
    path: '/lingjianTask',
    name: 'lingjianTask',
    component: () =>
      import(/* webpackChunkName: "partmanufacturing" */ './index.vue'),
    meta: { level: 2, title: '任务分配-零件加工', open: false, id: 'rwljjggl' }
  }
];
