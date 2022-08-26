export default [
    {
        path: '/jishuList',
        name: 'jishuList',
        component: () => import(/* webpackChunkName: "orderlist" */ './index.vue'),
        meta: {
            level: 2,
            title: '技术清单',
            open: false,
            id: 'jsqd'
        }
    }
];
