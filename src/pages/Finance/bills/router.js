export default [{
  path: '/finance-bills',
  name: 'bills-list',
  component: () => import(/* webpackChunkName: "diliverylist" */ './index.vue'),
  meta: { level: 2, title: '发货单申请列表', open: false, id: 'fhsqlb' }
}, {
  path: '/finance-bills/add',
  name: 'bills-add',
  component: () => import(/* webpackChunkName: "diliveryadd" */ './add.vue'),
  meta: { level: 3, title: '新增发货单', open: false, id: 'fhsqlb' }
}, {
  path: '/finance-bills/edit',
  name: 'bills-edit',
  component: () => import(/* webpackChunkName: "diliversyedit" */ './add.vue'),
  meta: { level: 3, title: '编辑申请发货单', open: false, id: 'fhsqlb' }
}]
