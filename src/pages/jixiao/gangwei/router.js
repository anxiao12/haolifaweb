export default [
  {
    path: '/gangwei',
    name: 'gangwei',
    component: () =>
      import(/* webpackChunkName: "diliverylist" */ './list.vue'),
    meta: {
      level: 2,
      title: '岗位列表',
      open: false,
      id: 'bmlb'
    }
  }
];
