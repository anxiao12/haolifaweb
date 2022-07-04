export default [
  {
    path: '/gdzcList',
    name: 'gdzcList',
    component: () => import(/* webpackChunkName: "contract" */ './index.vue'),
    meta: {
      level: 2,
      title: '固定资产管理',
      open: false,
      id: 'gdzc'
    }
  }
];
