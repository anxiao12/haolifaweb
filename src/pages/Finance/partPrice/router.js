export default [{
    path: '/partPrice',
    name: 'part-price-list',
    component: () => import( /* webpackChunkName: "invoice" */ './index.vue'),
    meta: {
        level: 2,
        title: '零件价格管理',
        open: false,
        id: 'ljjggl'
    }
}, {
    path: '/partPrice/addList',
    name: 'part-price-list-add',
    component: () => import( /* webpackChunkName: "invoice" */ './addList.vue'),
    meta: {
        level: 2,
        title: '新增零件价格',
        open: false,
        id: 'xzljjg'
    }
}]