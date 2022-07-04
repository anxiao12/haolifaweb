export default [
  {
    path: '/fazuo-room',
    name: 'fazuo-list',
    component: () => import(/* webpackChunkName: "roomlist" */ './index.vue'),
    meta: { level: 2, title: '阀座待入库', open: false, id: 'fzdrk' }
  },
  {
    path: '/scgc-fzjglb-list',
    name: 'scgc-fzjglb-list',
    component: () => import(/* webpackChunkName: "roomlist" */ './fzjglb.vue'),
    meta: { level: 2, title: '阀座加工列表', open: false, id: 'scgc-fzjglb' }
  },
  {
    path: '/fzwtjgList',
    name: 'fzwtjgList',
    component: () =>
      import(/* webpackChunkName: "roomlist" */ './fzwtjglb.vue'),
    meta: { level: 2, title: '阀座委托加工', open: false, id: 'fzwtjglb' }
  },
  {
    path: '/xzfzwtjg/add-list',
    name: 'xzfzwtjg-add-list',
    component: () =>
      import(/* webpackChunkName: "roomlist" */ './xzfzwtjg.vue'),
    meta: { level: 2, title: '新增阀座委托加工', open: false, id: 'xzfzwtjg' }
  },
  {
    path: '/fzzj/zj-list',
    name: 'fzzj-zj-list',
    component: () => import(/* webpackChunkName: "roomlist" */ './zjList.vue'),
    meta: { level: 2, title: '阀座质检列表', open: false, id: 'fzzjlb' }
  },
  {
    path: '/fzzj/zjadd-list',
    name: 'fzzj-zjadd-list',
    component: () =>
      import(/* webpackChunkName: "roomlist" */ './zjAddList.vue'),
    meta: { level: 2, title: '新增阀座质检', open: false, id: 'xzfzzj' }
  }
];
