export default [
  {
    path: '/autoControlList',
    name: 'autoControlList',
    component: () => import(/* webpackChunkName: "workcar" */ './index.vue'),
    meta: {
      level: 2,
      title: '自控委托加工',
      open: false,
      id: 'zkwtjglb'
    }
  },
  {
    path: '/autoControl/add-list',
    name: 'autoControl-add-list',
    component: () => import(/* webpackChunkName: "workcar" */ './addList.vue'),
    meta: {
      level: 2,
      title: '新增自控委托加工',
      open: false,
      id: 'xzzkwtjg'
    }
  },
  {
    path: '/autoControl/scadd-list',
    name: 'autoControl-scadd-list',
    component: () =>
      import(/* webpackChunkName: "workcar" */ './scaddList.vue'),
    meta: {
      level: 2,
      title: '自控加工列表',
      open: false,
      id: 'scgc-zkjglb'
    }
  },
  {
    path: '/autoControl/zjadd-list',
    name: 'autoControl-zjadd-list',
    component: () =>
      import(/* webpackChunkName: "workcar" */ './zjaddList.vue'),
    meta: {
      level: 2,
      title: '新增自控质检',
      open: false,
      id: 'xzzkzj'
    }
  },
  {
    path: '/autoControl/zj-list',
    name: 'autoControl-zj-list',
    component: () => import(/* webpackChunkName: "workcar" */ './zjindex.vue'),
    meta: {
      level: 2,
      title: '自控质检列表',
      open: false,
      id: 'zkzjlb'
    }
  }
];
