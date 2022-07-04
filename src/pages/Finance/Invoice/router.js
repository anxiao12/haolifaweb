export default [{
  path: '/jx-invoice',
  name: 'jx-invoice',
  component: () => import( /* webpackChunkName: "xxInvoice" */ './jxInvoice.vue'),
  meta: {
    level: 2,
    title: '进项发票管理',
    open: false,
    id: 'jxfp'
  }
}, {
  path: '/xx-invoice',
  name: 'xx-invoice',
  component: () => import( /* webpackChunkName: "xxInvoice" */ './xxInvoice.vue'),
  meta: {
    level: 2,
    title: '销项发票管理',
    open: false,
    id: 'xxfp'
  }
}, {
  path: '/invoice-out',
  name: 'invoiceOut',
  component: () => import( /* webpackChunkName: "xxInvoice" */ './outInfo.vue'),
  meta: {
    level: 2,
    title: '出库详情',
    open: false,
    id: 'fpgl'
  }
}]