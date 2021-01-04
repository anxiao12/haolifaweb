export default [{
    path: '/purchsemanage-purchase/list',
    name: 'purchsemanage-purchase',
    component: () => import( /* webpackChunkName: "suppliermanage" */ './index.vue'),
    meta: {
        level: 2,
        title: '采购列表',
        open: false,
        id: 'cglb'
    }
}, {
    path: '/purchsemanage-purchase/addList',
    name: 'purchsemanage-purchaseaddlist',
    component: () => import( /* webpackChunkName: "suppliermanage" */ './addList.vue'),
    meta: {
        level: 2,
        title: '采购列表',
        open: false,
        id: 'xzcght'
    }
}, {
    path: '/purchsemanage-purchase/add',
    name: 'purchsemanage-purchaseadd',
    component: () => import( /* webpackChunkName: "suppliermanage" */ './add.vue'),
    meta: {
        level: 2,
        title: '新增采购',
        open: false,
        id: 'xzcght'
    }
}, {
    path: '/purchsemanage-purchase/info',
    name: 'purchsemanage-purchaseinfo',
    component: () => import( /* webpackChunkName: "suppliermanage" */ './info.vue'),
    meta: {
        level: 2,
        title: '详情',
        open: false,
        id: 'cglb'
    }
}, {
    path: '/purchsemanage-purchase/approveProgress',
    name: 'purchsemanage-purchaseapproveProgress',
    component: () => import( /* webpackChunkName: "suppliermanage" */ './approveProgress.vue'),
    meta: {
        level: 2,
        title: '审批进度',
        open: false,
        id: 'parent-cggl'
    }
}]