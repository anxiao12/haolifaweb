export default [
  {
    path: '/jingyingList',
    name: 'jingyingList',
    component: () =>
      import(/* webpackChunkName: "jingyingList" */ './list.vue'),
    meta: {
      level: 2,
      title: '经营管理问题',
      open: false,
      id: 'wtdn-jygl'
    }
  }
];
