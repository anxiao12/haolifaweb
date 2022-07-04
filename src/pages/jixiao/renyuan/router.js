export default [{
    path: '/jxuser',
    name: 'jxuser-list',
    component: () =>
        import( /* webpackChunkName: "diliverylist" */ './list.vue'),
    meta: {
        level: 2,
        title: '绩效人员列表',
        open: false,
        id: 'rwlb'
    }
}];