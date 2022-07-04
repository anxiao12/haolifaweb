export default [{
    path: '/orderupdate',
    name: 'orderupdate-list',
    component: () =>
        import ( /* webpackChunkName: "orderupdate" */ './index.vue'),
    meta: { level: 2, title: '更换料表', open: false, id: 'dhlb' }
}, {
    path: '/orderupdate/outMaterial',
    name: 'orderupdate-outMaterial-list',
    component: () => import(/* webpackChunkName: "outMateriallist" */ './outMaterial.vue'),
    meta: { level: 3, title: '更换料出库', open: false, id: 'dhlb' }
}]