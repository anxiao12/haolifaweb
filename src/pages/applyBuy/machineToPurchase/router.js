export default [{
  path: '/machineToPurchase-order',
  name: 'order-list',
  component: () => import( /* webpackChunkName: "diliverylist" */ './index.vue'),
  meta: {
    level: 2,
    title: '整机待采购列表',
    open: false,
    id: 'zjdcglb'
  }
}, {
  path: '/machineToPurchase-order/add',
  name: 'order-add',
  component: () => import( /* webpackChunkName: "diliveryadd" */ './add.vue'),
  meta: {
    level: 3,
    title: '新增采购单',
    open: false,
    id: 'zjdcglb'
  }
}, {
  path: '/machineToPurchase-order/edit',
  name: 'order-edit',
  component: () => import( /* webpackChunkName: "diliversyedit" */ './add.vue'),
  meta: {
    level: 3,
    title: '编辑采购单',
    open: false,
    id: 'zjdcglb'
  }
}, {
  path: '/machineToPurchase-order/purchaseAdd',
  name: 'order-purchaseAdd',
  component: () => import( /* webpackChunkName: "diliversyedit" */ './purchaseAdd.vue'),
  meta: {
    level: 3,
    title: '新增合并采购单',
    open: false,
    id: 'zjdcglb'
  }
}]
