export default [{
    path: '/finishedPrice',
    name: 'finished-price-list',
    component: () => import( /* webpackChunkName: "invoice" */ './index.vue'),
    meta: {
        level: 2,
        title: '成品价格管理',
        open: false,
        id: 'cpjggl'
    }
}, {
    path: '/finishedPrice/addList',
    name: 'finished-price-list-add',
    component: () => import( /* webpackChunkName: "invoice" */ './addList.vue'),
    meta: {
        level: 2,
        title: '成品价格管理',
        open: false,
        id: 'xzcpjg'
    }
}]