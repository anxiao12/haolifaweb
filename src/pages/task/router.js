export default [{
    path: '/taskList',
    name: 'task-list',
    component: () =>
        import( /* webpackChunkName: "fileupload" */ './index.vue'),
    meta: {
        level: 2,
        title: '待办事项',
        open: false,
        id: 'rwlb'
    }
}, {
    path: '/taskfinishlist',
    name: 'taskfinish-list',
    component: () =>
        import( /* webpackChunkName: "fileupload" */ './taskfinish.vue'),
    meta: {
        level: 2,
        title: '已办事项',
        open: false,
        id: 'rwlb'
    }
}]