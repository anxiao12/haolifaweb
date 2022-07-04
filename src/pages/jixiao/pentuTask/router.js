export default [
  {
    path: '/pentuTask',
    name: 'pentuTask',
    component: () => import(/* webpackChunkName: "workcar" */ './index.vue'),
    meta: {
      level: 2,
      title: '任务分配-喷涂加工',
      open: false,
      id: 'rwptjglb'
    }
  }
];
