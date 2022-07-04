export default [
  {
    path: '/delivery-bills',
    name: 'bills-list',
    component: () => import('./index.vue'),
    meta: {
      level: 2,
      title: '发货单列表',
      open: false,
      id: 'fhdgl'
    }
  },
  {
    path: '/delivery-bills/addList',
    name: 'bills-addlist',
    component: () => import('./addList.vue'),
    meta: {
      level: 2,
      title: '新增发货单',
      open: false,
      id: 'xzfhtzd'
    }
  },
  {
    path: '/delivery-bills/add',
    name: 'bills-add',
    component: () => import('./add.vue'),
    meta: {
      level: 3,
      title: '发货单新增',
      open: false,
      id: 'xzfhtzd'
    }
  },
  {
    path: '/delivery-bills/edit',
    name: 'bills-edit',
    component: () => import('./add.vue'),
    meta: {
      level: 3,
      title: '编辑发货单',
      open: false,
      id: 'xzfhtzd'
    }
  }
];
