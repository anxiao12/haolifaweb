export default [
  {
    path: '/hkfenjie',
    name: 'hkfenjie',
    component: () => import(/* webpackChunkName: "orderlist" */ './index.vue'),
    meta: {
      level: 2,
      title: '回款分解',
      open: false,
      id: 'ddhkfj'
    }
  },
  {
    path: '/fenjieList',
    name: 'fenjieList',
    component: () =>
      import(/* webpackChunkName: "orderlist" */ './fenjieList.vue'),
    meta: {
      level: 2,
      title: '回款分解详情',
      open: false,
      id: 'ddhkfj'
    }
  },
  {
    path: '/fjshList',
    name: 'fjshList',
    component: () =>
      import(/* webpackChunkName: "orderlist" */ './shindex.vue'),
    meta: {
      level: 2,
      title: '分解审核',
      open: false,
      id: 'fjsh'
    }
  },
  {
    path: '/shDetail',
    name: 'shDetail',
    component: () =>
      import(/* webpackChunkName: "orderlist" */ './shDetail.vue'),
    meta: {
      level: 2,
      title: '分解详情',
      open: false,
      id: 'fjsh'
    }
  }
];
