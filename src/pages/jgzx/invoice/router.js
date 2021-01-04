export default [{
  path: '/jgzx-invoice',
  name: 'invoice-list',
  component: () => import( /* webpackChunkName: "diliverylist" */ './index.vue'),
  meta: {
    level: 2,
    title: '发票列表',
    open: false,
    id: 'kfpgl'
  }
}, {
  path: '/jgzx-invoice/addList',
  name: 'invoice-add',
  component: () => import( /* webpackChunkName: "diliveryadd" */ './addList.vue'),
  meta: {
    level: 2,
    title: '新增发票',
    open: false,
    id: 'xzfp'
  }
}, {
  path: '/jgzx-invoice/add',
  name: 'invoice-add',
  component: () => import( /* webpackChunkName: "diliveryadd" */ './add.vue'),
  meta: {
    level: 3,
    title: '新增发票',
    open: false,
    id: 'xzfp'
  }
}, {
  path: '/jgzx-invoice/edit',
  name: 'invoice-edit',
  component: () => import( /* webpackChunkName: "diliversyedit" */ './add.vue'),
  meta: {
    level: 3,
    title: '编辑发票',
    open: false,
    id: 'xzfp'
  }
}]