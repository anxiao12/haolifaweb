export default [{
    path: '/ordermaterial',
    name: 'ordermaterial-list',
    component: () =>
        import ( /* webpackChunkName: "ordermaterial" */ './index.vue'),
    meta: { level: 2, title: '订单领料表', open: false, id: 'ddllb' }
}, {
    path: '/ordermaterial/info',
    name: 'ordermaterial-info',
    component: () =>
        import ( /* webpackChunkName: "ordermaterial-info" */ './info.vue'),
    meta: { level: 2, title: '领料详情', open: false, id: 'ddllb' }
}]