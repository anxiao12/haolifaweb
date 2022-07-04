export default [
  {
    path: '/jiaoxiaogongshi',
    name: 'jiaoxiaogongshi-list',
    component: () =>
      import(/* webpackChunkName: "diliverylist" */ './list.vue'),
    meta: {
      level: 2,
      title: '工时定额列表',
      open: false,
      id: 'gsdelb'
    }
  }
];
