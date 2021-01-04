export default [{
    path: '/message',
    name: 'message-list',
    component: () => import( /* webpackChunkName: "orderlist" */ './index.vue'),
    meta: {
        level: 2,
        title: '站内信',
        open: false,
        id: 'znxlb'
    }
}, {
    path: '/message/add',
    name: 'order-add',
    component: () => import( /* webpackChunkName: "orderadd" */ './add.vue'),
    meta: {
        level: 2,
        title: '新增站内信',
        open: false,
        id: 'xzznx'
    }
}, {
    path: '/message/sent',
    name: 'message-sent',
    component: () => import( /* webpackChunkName: "orderadd" */ './sentIndex.vue'),
    meta: {
        level: 2,
        title: '已发站内信',
        open: false,
        id: 'yfznx'
    }
}]