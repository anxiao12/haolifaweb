export default [
  {
    path: '/material',
    name: 'material-list',
    component: () =>
      import(/* webpackChunkName: "materiallist" */ './index.vue'),
    meta: {
      level: 2,
      title: '零件管理',
      open: false,
      id: 'ljgl'
    }
  },
  {
    path: '/material/add',
    name: 'material-add',
    component: () => import(/* webpackChunkName: "materialadd" */ './add.vue'),
    meta: {
      level: 3,
      title: '新增零件',
      open: false,
      id: 'ljgl'
    }
  },
  {
    path: '/material/edit',
    name: 'material-edit',
    component: () => import(/* webpackChunkName: "materialedit" */ './add.vue'),
    meta: {
      level: 3,
      title: '编辑零件',
      open: false,
      id: 'ljgl'
    }
  },
  {
    path: '/material/entryMaterial',
    name: 'entryMaterial-list',
    component: () =>
      import(/* webpackChunkName: "entryMateriallist" */ './entryMaterial.vue'),
    meta: {
      level: 3,
      title: '零件入库',
      open: false,
      id: 'ljgl'
    }
  },
  {
    path: '/material/outMaterial',
    name: 'outMaterial-list',
    component: () =>
      import(/* webpackChunkName: "outMateriallist" */ './outMaterial.vue'),
    meta: {
      level: 3,
      title: '零件出库',
      open: false,
      id: 'ljgl'
    }
  },
  {
    path: '/material/entryInfo',
    name: 'entryInfo-list',
    component: () =>
      import(/* webpackChunkName: "entryInfolist" */ './entryInfo.vue'),
    meta: {
      level: 3,
      title: '零件入库详情',
      open: false,
      id: 'ljgl'
    }
  },
  {
    path: '/material/outInfo',
    name: 'outInfo-list',
    component: () =>
      import(/* webpackChunkName: "outInfolist" */ './outInfo.vue'),
    meta: {
      level: 3,
      title: '零件出库详情',
      open: false,
      id: 'ljgl'
    }
  },
  {
    path: '/materialquery',
    name: 'material-query',
    component: () =>
      import(/* webpackChunkName: "outInfolist" */ './materialQuery.vue'),
    meta: {
      level: 2,
      title: '库存查询',
      open: false,
      id: 'kccx'
    }
  }
];
