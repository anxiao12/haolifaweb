export default [{
    path: '/fileupload',
    name: 'fileupload-list',
    component: () =>
        import( /* webpackChunkName: "fileupload" */ './index.vue'),
    meta: {
        level: 2,
        title: '文件图纸管理',
        open: false,
        id: 'wjtzgl'
    }
}, {
    path: '/fileupload/addList',
    name: 'fileupload-addlist',
    component: () =>
        import( /* webpackChunkName: "fileupload" */ './addList.vue'),
    meta: {
        level: 2,
        title: '新增文件图纸',
        open: false,
        id: 'xzwjtz'
    }
}, {
    path: '/fileupload/add',
    name: 'fileupload-add',
    component: () =>
        import( /* webpackChunkName: "fileupload" */ './add.vue'),
    meta: {
        level: 2,
        title: '新增文件图纸',
        open: false,
        id: 'xzwjtz'
    }
}, {
    path: '/fileupload/edit',
    name: 'fileupload-edit',
    component: () =>
        import( /* webpackChunkName: "fileupload" */ './add.vue'),
    meta: {
        level: 2,
        title: '编辑文件图纸',
        open: false,
        id: 'xzwjtz'
    }
}]