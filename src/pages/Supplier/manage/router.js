export default [{
    path: '/supplier/list',
    name: 'supplier-list',
    component: () => import( /* webpackChunkName: "suppliermanage" */ './index.vue'),
    meta: {
        level: 2,
        title: '供应商管理',
        open: false,
        id: 'gysgl'
    }
}, {
    path: '/supplier/addList',
    name: 'supplier-addList',
    component: () => import( /* webpackChunkName: "supplieradd" */ './addList.vue'),
    meta: {
        level: 2,
        title: '新增供应商',
        open: false,
        id: 'xzgys'
    }
}, {
    path: '/supplier/add',
    name: 'supplier-add',
    component: () => import( /* webpackChunkName: "supplieradd" */ './add.vue'),
    meta: {
        level: 2,
        title: '新增供应商',
        open: false,
        id: 'xzgys'
    }
}, {
    path: '/supplier/edit',
    name: 'supplier-edit',
    component: () => import( /* webpackChunkName: "supplieradd" */ './add.vue'),
    meta: {
        level: 2,
        title: '编辑供应商',
        open: false,
        id: 'xzgys'
    }
}, {
    path: '/supplier/accessory-info',
    name: 'supplier-accessory-info',
    component: () => import( /* webpackChunkName: "supplieradd" */ './accessoryInfo.vue'),
    meta: {
        level: 2,
        title: '供应商审批附件',
        open: false,
        id: 'parent-gysgl'
    }
}, {
    path: '/supplier/approveProgress',
    name: 'supplier-approveProgress',
    component: () => import( /* webpackChunkName: "supplieradd" */ './approveProgress.vue'),
    meta: {
        level: 2,
        title: '供应商审批进度',
        open: false,
        id: 'parent-gysgl'
    }
}, {
    path: '/supplier/:id',
    name: 'supplier-info',
    component: () => import( /* webpackChunkName: "supplieradd" */ './info.vue'),
    meta: {
        level: 2,
        title: '供应商详情',
        open: false,
        id: 'parent-gysgl'
    }
}]