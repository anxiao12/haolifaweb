export default [{
    path: '/contract',
    name: 'contract',
    component: () =>
        import( /* webpackChunkName: "contract" */ './index.vue'),
    meta: {
        level: 2,
        title: '采购合同管理',
        open: false,
        id: 'htgl'
    }
}, {
    path: '/cwContract',
    name: 'cwContract',
    component: () =>
        import( /* webpackChunkName: "contract" */ './zjIndex.vue'),
    meta: {
        level: 2,
        title: '整机采购合同管理',
        open: false,
        id: 'cw-zjcght'
    }
}, {
    path: '/production',
    name: 'production',
    component: () =>
        import( /* webpackChunkName: "contractproduction" */ './production.vue'),
    meta: {
        level: 2,
        title: '生产合同管理',
        open: false,
        id: 'schtgl'
    }
}, {
    path: '/production/info',
    name: 'productioninfo',
    component: () =>
        import( /* webpackChunkName: "productioninfo" */ './prodInfo.vue'),
    meta: {
        level: 2,
        title: '收款记录',
        open: false,
        id: 'schtgl'
    }
}, {
    path: '/contract/info',
    name: 'contractinfo',
    component: () =>
        import( /* webpackChunkName: "contractinfo" */ './info.vue'),
    meta: {
        level: 2,
        title: '合同详情',
        open: false,
        id: 'htgl'
    }
}]