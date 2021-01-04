export default [{
  path: '/supplierproduct',
  name: 'supplierproduct-list',
  component: () => import( /* webpackChunkName: "supplierproductlist" */ './index.vue'),
  meta: {
    level: 2,
    title: '供应商产品',
    open: false,
    id: 'gyscp'
  }
}, {
  path: '/supplierproduct/addList',
  name: 'supplierproduct-addList',
  component: () => import( /* webpackChunkName: "supplierproductadd" */ './addList.vue'),
  meta: {
    level: 2,
    title: '新增供应商产品',
    open: false,
    id: 'xzgyscp'
  }
}, {
  path: '/supplierproduct/add',
  name: 'supplierproduct-add',
  component: () => import( /* webpackChunkName: "supplierproductadd" */ './add.vue'),
  meta: {
    level: 2,
    title: '新增供应商产品',
    open: false,
    id: 'xzgyscp'
  }
}, {
  path: '/supplierproduct/edit',
  name: 'supplierproduct-edit',
  component: () => import( /* webpackChunkName: "supplierproductedit" */ './edit.vue'),
  meta: {
    level: 2,
    title: '编辑供应商产品',
    open: false,
    id: 'parent-gysgl'
  }
}]