export default [{
    path: '/workcar',
    name: 'workcar-list',
    component: () =>
        import ( /* webpackChunkName: "workcar" */ './index.vue'),
    meta: { level: 2, title: '零件加工车间管理', open: false, id: 'jhjjglb' }
},{
    path: '/workcar/edit',
    name: 'workcar-edit',
    component: () =>
        import ( /* webpackChunkName: "workcar" */ './add.vue'),
    meta: { level: 2, title: '零件加工车间编辑', open: false, id: 'jhjjglb' }
}]