export default [
  {
    path: '/jiaoxiaogongzi',
    name: 'jiaoxiaogongzi-list',
    component: () =>
      import(/* webpackChunkName: "diliverylist" */ './list.vue'),
    meta: {
      level: 2,
      title: '创建工资列表',
      open: false,
      id: 'gzlb'
    }
  },
  {
    path: '/gongziList',
    name: 'gongzi-list',
    component: () =>
      import(/* webpackChunkName: "diliverylist" */ './index.vue'),
    meta: {
      level: 2,
      title: '工资查询列表',
      open: false,
      id: 'gzcxlb'
    }
  }
];
