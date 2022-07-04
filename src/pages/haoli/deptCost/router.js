export default [
  {
    path: '/deptCost',
    name: '/deptCost',
    component: () =>
      import(/* webpackChunkName: "suppliermanage" */ './index.vue'),
    meta: {
      level: 2,
      title: '部门费用预算',
      open: false,
      id: 'bmfyys'
    }
  }
];
