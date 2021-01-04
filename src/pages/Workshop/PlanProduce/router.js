export default [{
  path: '/jhgl-scddlb-list',
  name: 'jhgl-scddlb',
  component: () => import( /* webpackChunkName: "orderlist" */ './index.vue'),
  meta: {
    level: 2,
    title: '生产订单列表',
    open: false,
    id: 'jhgl-scddlb'
  }
}, {
    path: '/jhgl-scddlb/info',
    name: 'scddlb-info',
    component: () => import( /* webpackChunkName: "orderedit" */ './info.vue'),
    meta: {
        level: 3,
        title: '详情',
        open: false,
        id: 'jhgl-scddlb'
    }
}, {
    path: '/jhgl-scddlb/inspect',
    name: 'inspect-info',
    component: () => import( /* webpackChunkName: "orderedit" */ './inspectHistory.vue'),
    meta: {
        level: 3,
        title: '质检记录',
        open: false,
        id: 'jhgl-scddlb'
    }
}]