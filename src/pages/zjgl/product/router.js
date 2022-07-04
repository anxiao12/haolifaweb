export default [{
  path: '/inspect-product',
  name: 'product-list',
  component: () => import( /* webpackChunkName: "diliverylist" */ './index.vue'),
  meta: {
    level: 2,
    title: ' 成品报检单列表',
    open: false,
    id: 'cpzjlb'
  }
}, {
  path: '/inspect-product/addList',
  name: 'product-addList',
  component: () => import( /* webpackChunkName: "diliversyedit" */ './addList.vue'),
  meta: {
    level: 3,
    title: '新增成品报检单',
    open: false,
    id: 'xzcpzjjl'
  }
}, {
  path: '/inspect-product/edit',
  name: 'product-edit',
  component: () => import( /* webpackChunkName: "diliversyedit" */ './update.vue'),
  meta: {
    level: 3,
    title: '编辑报检单',
    open: false,
    id: 'cpzjlb'
  }
}, {
  path: '/inspect-product/add',
  name: 'product-add',
  component: () => import( /* webpackChunkName: "diliversyedit" */ './add.vue'),
  meta: {
    level: 3,
    title: '编辑报检单',
    open: false,
    id: 'cpzjlb'
  }
}, {
  path: '/inspect-product/addRecord',
  name: 'product-addRecord',
  component: () => import( /* webpackChunkName: "diliversyedit" */ './update.vue'),
  meta: {
    level: 3,
    title: '质检记录',
    open: false,
    id: 'cpzjlb'
  }
}]