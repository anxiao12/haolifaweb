export default [{
    path: '/replacement',
    name: 'replacement-list',
    component: () =>
        import( /* webpackChunkName: "replacement" */ './index.vue'),
    meta: {
        level: 2,
        title: '更换料列表',
        open: false,
        id: 'cjzr-ghllb'
    }
}, {
    path: '/replacement/addList',
    name: 'replacement-addlist',
    component: () =>
        import( /* webpackChunkName: "replacement" */ './addList.vue'),
    meta: {
        level: 2,
        title: '新增更换料',
        open: false,
        id: 'xzghllj'
    }
}, {
    path: '/replacementadd',
    name: 'replacement-add',
    component: () =>
        import( /* webpackChunkName: "replacement" */ './add.vue'),
    meta: {
        level: 2,
        title: '新增更换料',
        open: false,
        id: 'xzghllj'
    }
}, {
    path: '/replacementedit',
    name: 'replacement-edit',
    component: () =>
        import( /* webpackChunkName: "replacement" */ './add.vue'),
    meta: {
        level: 2,
        title: '编辑更换料',
        open: false,
        id: 'cjzr-ghllb'
    }
}]