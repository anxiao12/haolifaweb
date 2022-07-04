export default [
  {
    path: '/jiaoxiaodafen',
    name: 'jiaoxiaodafen-list',
    component: () =>
      import(/* webpackChunkName: "diliverylist" */ './list.vue'),
    meta: {
      level: 2,
      title: '考核打分列表',
      open: false,
      id: 'khdf'
    }
  }
];
