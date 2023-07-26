export default [
    {
        path: '/scrjhList',
        name: 'scrjhList',
        component: () => import(/* webpackChunkName: "orderlist" */ './index.vue'),
        meta: {
            level: 2,
            title: '生产日计划',
            open: false,
            id: 'scrjh'
        }
    },
    {
        path: '/scrjhDetail',
        name: 'scrjhDetail',
        component: () => import(/* webpackChunkName: "orderlist" */ './detail.vue'),
        meta: {
            level: 2,
            title: '生产日计划详情',
            open: false,
            id: 'scrjh'
        }
    }
];
