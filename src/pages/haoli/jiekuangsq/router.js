export default [
  {
    path: '/jksqList',
    name: 'jksqList',
    component: () => import(/* webpackChunkName: "contract" */ './index.vue'),
    meta: {
      level: 2,
      title: '借款申请',
      open: false,
      id: 'jksq'
    }
  },
  {
    path: '/jkfkList',
    name: 'jkfkList',
    component: () => import(/* webpackChunkName: "contract" */ './fukList.vue'),
    meta: {
      level: 2,
      title: '借款付款',
      open: false,
      id: 'jkfk'
    }
  }
];
