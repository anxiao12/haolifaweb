export default [{
    path: '/kaoqin',
    name: 'kaoqin-list',
    component: () =>
        import( /* webpackChunkName: "diliverylist" */ './list.vue'),
    meta: {
        level: 2,
        title: '考勤列表',
        open: false,
        id: 'rwlb'
    }
}];