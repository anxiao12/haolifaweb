export default [{
  path: '/applyBuy-order',
  name: 'order-list',
  component: () => import( /* webpackChunkName: "diliverylist" */ './index.vue'),
  meta: {
    level: 2,
    title: '待采购列表',
    open: false,
    id: 'scdcglb'
  }
}, {
  path: '/applyBuy-order/add',
  name: 'order-add',
  component: () => import( /* webpackChunkName: "diliveryadd" */ './add.vue'),
  meta: {
    level: 3,
    title: '新增采购单',
    open: false,
    id: 'scdcglb'
  }
}, {
  path: '/applyBuy-order/edit',
  name: 'order-edit',
  component: () => import( /* webpackChunkName: "diliversyedit" */ './add.vue'),
  meta: {
    level: 3,
    title: '编辑采购单',
    open: false,
    id: 'scdcglb'
  }
}, {
  path: '/applyBuy-order/purchaseAdd',
  name: 'order-purchaseAdd',
  component: () => import( /* webpackChunkName: "diliversyedit" */ './purchaseAdd.vue'),
  meta: {
    level: 3,
    title: '新增合并采购单',
    open: false,
    id: 'scdcglb'
  }
}]
