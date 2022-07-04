export default [
  {
    path: '/baoxiaoList',
    name: 'baoxiaoList',
    component: () => import(/* webpackChunkName: "contract" */ './index.vue'),
    meta: {
      level: 2,
      title: '报销申请',
      open: false,
      id: 'bxsq'
    }
  },
  {
    path: '/bxzfList',
    name: 'bxzfList',
    component: () => import(/* webpackChunkName: "contract" */ './zhifu.vue'),
    meta: {
      level: 2,
      title: '报销支付',
      open: false,
      id: 'bxzf'
    }
  }
];
