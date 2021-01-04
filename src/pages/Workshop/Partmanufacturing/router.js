export default [{
    path: '/partmanufacturing',
    name: 'partmanufacturing-list',
    component: () =>
        import ( /* webpackChunkName: "partmanufacturing" */ './index.vue'),
    meta: { level: 2, title: '零件加工管理', open: false, id: 'cjjjglb' }
}]