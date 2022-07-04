export default [
  {
    path: '/spray/inspect-form/list',
    name: 'spray-inspect-list',
    component: () =>
      import(/* webpackChunkName: "diliverylist" */ './index.vue'),
    meta: {
      level: 2,
      title: '喷涂质检',
      open: false,
      id: 'ptzjlb'
    }
  },
  {
    path: '/spray/inspect-form/addList',
    name: 'spray-list-add',
    component: () =>
      import(/* webpackChunkName: "diliverylist" */ './addList.vue'),
    meta: {
      level: 2,
      title: '新增喷涂质检',
      open: false,
      id: 'xzptzj'
    }
  }
];
