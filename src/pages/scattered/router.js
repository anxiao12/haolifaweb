export default [{
    path: '/scattered/list',
    name: 'scattered-list',
    component: () => import( /* webpackChunkName: "earlywarning" */ './index.vue'),
    meta: {
        level: 2,
        title: '零星物资管理',
        open: false,
        id: 'lxwzgl'
    }
}, {
    path: '/scattered/add',
    name: 'scattered-add',
    component: () => import( /* webpackChunkName: "earlywarning" */ './add.vue'),
    meta: {
        level: 2,
        title: '零星物资添加',
        open: false,
        id: 'lxwzgl'
    }
}, {
    path: '/scattered/out',
    name: 'scattered-out',
    component: () => import( /* webpackChunkName: "earlywarning" */ './outScattered.vue'),
    meta: {
        level: 2,
        title: '零星物资出库记录',
        open: false,
        id: 'lxwzgl'
    }
}, {
    path: '/scattered/entry',
    name: 'scattered-entry',
    component: () => import( /* webpackChunkName: "earlywarning" */ './entryScattered.vue'),
    meta: {
        level: 2,
        title: '零星物资入库记录',
        open: false,
        id: 'lxwzgl'
    }
}]