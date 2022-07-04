export default [{
  path: '/cjzr-scddlb',
  name: 'cjzr-scddlb',
  component: () => import( /* webpackChunkName: "orderlist" */ './index.vue'),
  meta: {
    level: 2,
    title: '生产订单列表',
    open: false,
    id: 'cjzr-scddlb'
  }
}, {
  path: '/cjzr-scddlb/info',
  name: 'scddlb-info',
  component: () => import( /* webpackChunkName: "orderedit" */ './info.vue'),
  meta: {
    level: 3,
    title: '详情',
    open: false,
    id: 'cjzr-scddlb'
  }
}, {
  path: '/cjzr-scddlb/checked',
  name: 'scddlb-check',
  component: () => import( /* webpackChunkName: "orderedit" */ './check.vue'),
  meta: {
    level: 3,
    title: '质检记录',
    open: false,
    id: 'cjzr-scddlb'
  }
}]