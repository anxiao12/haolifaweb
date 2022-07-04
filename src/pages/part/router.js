export default [{
    path: '/part/list',
    name: 'part-list',
    component: () => import( /* webpackChunkName: "orderlist" */ './index.vue'),
    meta: {
        level: 2,
        title: '零件待出库',
        open: false,
        id: 'ljdck'
    }
}]