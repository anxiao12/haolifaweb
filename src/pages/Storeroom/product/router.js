export default [{
  path: '/storeproduct',
  name: 'storeproduct-list',
  component: () => import( /* webpackChunkName: "storeproductlist" */ './index.vue'),
  meta: {
    level: 2,
    title: '成品管理',
    open: false,
    id: 'cpgl'
  }
}, {
  path: '/storeproduct/add',
  name: 'storeproduct-add',
  component: () => import( /* webpackChunkName: "storeproductadd" */ './add.vue'),
  meta: {
    level: 3,
    title: '新增成品',
    open: false,
    id: 'cpgl'
  }
}, {
  path: '/storeproduct/edit',
  name: 'storeproduct-edit',
  component: () => import( /* webpackChunkName: "storeproductedit" */ './add.vue'),
  meta: {
    level: 3,
    title: '编辑成品',
    open: false,
    id: 'cpgl'
  }
}, {
  path: '/storeproduct/entryProduct',
  name: 'entryProduct',
  component: () => import( /* webpackChunkName: "entryProduct" */ './entryProduct.vue'),
  meta: {
    level: 3,
    title: '成品入库',
    open: false,
    id: 'cpgl'
  }
}, {
  path: '/storeproduct/outProduct',
  name: 'outProduct',
  component: () => import( /* webpackChunkName: "outProduct" */ './outProduct.vue'),
  meta: {
    level: 3,
    title: '成品出库',
    open: false,
    id: 'cpgl'
  }
}, {
  path: '/storeproduct/entryList',
  name: 'entryList-list',
  component: () => import( /* webpackChunkName: "entryListlist" */ './entryList.vue'),
  meta: {
    level: 3,
    title: '成品入库详情',
    open: false,
    id: 'cpgl'
  }
}, {
  path: '/storeproduct/outList',
  name: 'outList-list',
  component: () => import( /* webpackChunkName: "infolist" */ './outList.vue'),
  meta: {
    level: 3,
    title: '成品出库详情',
    open: false,
    id: 'cpgl'
  }
}, {
  path: '/productList',
  name: 'product-list',
  component: () => import( /* webpackChunkName: "infolist" */ './productList.vue'),
  meta: {
    level: 3,
    title: '成品库存列表',
    open: false,
    id: 'cpkclb'
  }
}]