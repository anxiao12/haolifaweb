export default [
  {
    path: '/zikongwuzhiList',
    name: 'zikongwuzhiList',
    component: () =>
      import(/* webpackChunkName: "earlywarning" */ './index.vue'),
    meta: {
      level: 2,
      title: '自控物资管理',
      open: false,
      id: 'zkwzgl'
    }
  },
  {
    path: '/zikongwuzhiAdd',
    name: 'zikongwuzhiAdd',
    component: () => import(/* webpackChunkName: "earlywarning" */ './add.vue'),
    meta: {
      level: 2,
      title: '自控物资添加',
      open: false,
      id: 'zkwzgl'
    }
  },
  {
    path: '/zikongwuzhiOut',
    name: 'zikongwuzhiOut',
    component: () =>
      import(/* webpackChunkName: "earlywarning" */ './outScattered.vue'),
    meta: {
      level: 2,
      title: '自控物资出库记录',
      open: false,
      id: 'zkwzgl'
    }
  },
  {
    path: '/zikongwuzhiEntry',
    name: 'zikongwuzhiEntry',
    component: () =>
      import(/* webpackChunkName: "earlywarning" */ './entryScattered.vue'),
    meta: {
      level: 2,
      title: '自控物资入库记录',
      open: false,
      id: 'zkwzgl'
    }
  }
];
